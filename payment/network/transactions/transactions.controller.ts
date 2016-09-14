module NetworkTransaction {
    'use strict';
    declare var $: any;
    declare var window: any;
    declare var angular: any;

    export class TransactionController {
        $rootScope: any;
        $scope: any;
        $state: any;
        $filter: any;
        $location: any;
        $stateParams: any;

        vm: ITransactionViewModel;
        static $inject = ["$rootScope", "$scope", "$state", "$stateParams", "$filter", "$location", "TransactionModel"];

        constructor($rootScope: any, $scope: any, $state: any, $stateParams: any, $filter: any, $location: any, transactionModel: ITransactionViewModel) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.$location = $location;
            this.vm = transactionModel;
            this.vm.userEvent = new UserEvent($stateParams);
            this.getCriteriaData();
            this.init();
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

        public getFilterDisplayText() {
            if (this.vm.userEvent.selectedMethodName) return "Payment method: " + this.vm.userEvent.selectedMethodName;
            if (this.vm.userEvent.selectedUserName) return "Customer: " + this.vm.userEvent.selectedUserName;
            return "";
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
            this.vm.userEvent.selectedUserId = null;
            this.vm.userEvent.selectedUserName = null;
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

        public showInvoice(invoiceId: string) {
            return this.vm.showInvoice(invoiceId);
        }
    }
}