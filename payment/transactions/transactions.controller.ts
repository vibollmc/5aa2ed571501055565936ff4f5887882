module Transactions {
    'use strict';
    declare var $: any;
    declare var window: any;
    declare var braintree: any;
    declare var angular: any;
    declare var toastr: any;

    export enum PaymentMethodStatus {
        Undefined = 0,
        Valid = 1,
        SoftLocked = 2,
        HardLocked = 3
    }

    export enum PaymentMethodType {
        Undefined = 0,
        Direct = 1,
        Postpaid = 2
    }

    export class TransactionController {
        _checkout: any;
        $rootScope: any;
        $scope: any;
        $state: any;
        $filter: any;
        $location: any;
        $stateParams: any;

        _clientToken: string;
        _defaultGatewayId: string;

        vm: ITransactionViewModel;
        static $inject = ["$rootScope", "$scope", "$state", "$stateParams", "$filter", "$location", "TransactionModel"];

        constructor($rootScope: any, $scope: any, $state: any, $stateParams: any, $filter: any, $location: any, transactionModel: ITransactionViewModel) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.$location = $location;
            this.vm = transactionModel;
            this.vm.userEvent = new UserEvent($stateParams);
            this.getFailedPaymentMethods();
            this.getCriteriaData();
            this.init();
            this._checkout = null;
        }

        public statusChanged(status) {
            this.vm.userEvent.selectedStatus = status;
            this.getTransactions();
        }

        public getTransactions() {
            return this.vm.getTransactions()
                .then((data) => {

                });
        }

        public getCriteriaData() {
            return this.vm.getCriteriaData()
                .then((data) => {
                    this.getTransactions();
                });
        }

        public getStatusClass(status: string) {
            return UserEvent.getStatusClass(status);
        }

        public getTypeClass(type: string, text: string) {
            switch (type.toLowerCase()) {
                case "charge":
                    return text + " " + text + "-danger";
                case "surcharge":
                    return text + " " + text + "-warning";
                case "refund":
                    return text + " " + text + "-success";
                default:
                    return "";
            }
        }

        public keyPress(event) {
            if (event.which === 13) {
                this.getTransactions();
            }
        }

        public activeIfStatus(status) {
            if (this.vm.filter.Status === status) {
                return "active";
            }
            return "";
        }

        public clearSpecificFilter() {
            this.vm.userEvent.selectedMethodId = null;
            this.vm.userEvent.selectedMethodName = null;
            this.$location.search({});
            this.getCriteriaData();
        }

        public exportData(all: boolean) {
            this.vm.exportData(all)
                .then((data) => { });
        }

        public isShowColumn(columnId) {
            if (!columnId) {
                return;
            }
            if (this.vm.userEvent.selectedColumns.indexOf(columnId) == -1) {
                return columnId + ' invisible_column';
            }
            return columnId;
        }

        public getFailedPaymentMethods() {
            return this.vm.getFailedPaymentMethods()
                .then((data) => {
                });
        }

        public showFailedTransactions(id: string) {
            this.vm.userEvent.justFailed = true;
            this.vm.userEvent.selectedStatus = "pending";
            this.vm.userEvent.selectedMethodId = id;
            this.getTransactions();
            setTimeout(() => {
                $("#sel-payment-method").selectpicker('refresh');
            }, 20);
        }

        public isHardLock(status: PaymentMethodStatus) {
            return status === PaymentMethodStatus.HardLocked;
        }

        public isPostpaid(type: PaymentMethodType) {
            return type === PaymentMethodType.Postpaid;
        }

        public isDirect(type: PaymentMethodType) {
            return type === PaymentMethodType.Direct;
        }

        public confirmCorrect(id: string, selectId: string, type: PaymentMethodType) {
            var fixedId = $("#" + selectId).val();
            if (fixedId === "CHANGE_PAYMENT_METHOD") { // Change card for post paid
                this.openChangePaymentMethodForm(id);
            }
            else if (fixedId === "ADD_PAYMENT_METHOD") { // Add direct methods
                this.openAddPaymentMethodForm(id);
            }
            else {
                this.vm.confirmCorrect(id, fixedId, type)
                    .then((data) => {
                        if (data.Success) {
                            window.location.reload(true);
                        }
                        else {
                            toastr.error("Something went wrong when try to correct failed payment. " + data.Exception);
                        }
                    }, (error) => {
                        toastr.error("Something went wrong when try to charge.");
                    });
            }
        }

        public init() {
            setTimeout(() => {
                window.preparePluginControls();
                window.prepareDateRangeControl();
                $('#sel-transaction-columns').multiselect({
                    enableCaseInsensitiveFiltering: true,
                    numberDisplayed: 1,
                    onChange: (element, checked) => {
                        if (checked === true) {
                            $('.' + $(element).val()).removeClass('invisible_column');
                        } else {
                            $('.' + $(element).val()).addClass('invisible_column');
                        }
                    }
                });
            }, 1000);
        }

        public openAddPaymentMethodForm(failedMethodId: string): void {
            this.vm.getGatewayClientToken()
                .then((data) => {
                    if (data.ClientToken === "") {
                        toastr.error("The system is missing some settings. Please contact us.", "Error");
                        return;
                    }
                    this._clientToken = data.ClientToken;
                    this._defaultGatewayId = data.GatewayId;
                    var _that = this;
                    angular.element('#form-add-payment-method').html("");
                    braintree.setup(this._clientToken, "dropin", {
                        container: "form-add-payment-method",
                        onPaymentMethodReceived: (obj: any) => {
                            _that.addPaymentMethodAndCharge(failedMethodId, obj);
                        },
                        onReady: (integration) => {
                            _that._checkout = integration;
                        }
                    });
                    angular.element('#modal-add-payment-form').modal();
                });
        }

        public openChangePaymentMethodForm(failedMethodId: string): void {
            this.vm.getGatewayClientToken()
                .then((data) => {
                    if (data.ClientToken === "") {
                        toastr.error("The system is missing some settings. Please contact us.", "Error");
                        return;
                    }
                    this._clientToken = data.ClientToken;
                    this._defaultGatewayId = data.GatewayId;
                    var _that = this;
                    angular.element('#form-add-payment-method').html("");
                    braintree.setup(this._clientToken, "dropin", {
                        container: "form-add-payment-method",
                        onPaymentMethodReceived: (obj: any) => {
                            _that.changePaymentMethodAndCharge(failedMethodId, obj);
                        },
                        onReady: (integration) => {
                            _that._checkout = integration;
                        }
                    });
                    angular.element('#modal-add-payment-form').modal();
                });
        }

        public addPaymentMethodAndCharge(failedMethodId: string, obj: any): void {
            this.vm.addPaymentMethod(failedMethodId, this._defaultGatewayId, obj.nonce)
                .then((data) => {

                    if (data.Success) {
                        window.location.reload(true);
                    }
                    else {
                        toastr.error("Something went wrong when try to add payment method and charge. " + data.Exception);
                    }

                });
            angular.element('#modal-add-payment-form').modal('hide');
            if (this._checkout) {
                this._checkout.teardown(() => {
                    this._checkout = null;
                });
            }
        }

        public changePaymentMethodAndCharge(failedMethodId: string, obj: any): void {
            this.vm.changePaymentMethod(failedMethodId, this._defaultGatewayId, obj.nonce)
                .then((data) => {
                    if (data.Success) {
                        window.location.reload(true);
                    }
                    else {
                        toastr.error("Something went wrong when try to change payment method and charge. " + data.Exception);
                    }

                }, (error) => {
                    toastr.error("Something went wrong when try to charge.");
                });
            angular.element('#modal-add-payment-form').modal('hide');
            if (this._checkout) {
                this._checkout.teardown(() => {
                    this._checkout = null;
                });
            }
        }

        public showInvoice(invoiceId: string) {
            return this.vm.showInvoice(invoiceId);
        }
    }
}