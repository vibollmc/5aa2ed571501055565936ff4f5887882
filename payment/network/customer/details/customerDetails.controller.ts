
module NetworkCustomer {
    'use strict';

    declare var angular: any;

    export interface ICustomerDetailsController {
        //getUserPaymentMethods(userId: string): any;
    }
    
    export class CustomerDetailsController implements ICustomerDetailsController {
        daySuffix: string;
        isPostPaidMethod: boolean;
        customerDetailsModel: ICustomerDetailsModel;
        customerInfo: any;
        openPayment: any;
        directPaymentMethod: IDirectPaymentModel;
        directPaymentMethodCopy: IDirectPaymentModel;
        postpaidPayment: IPostpaidPaymentModel;
        postpaidPaymentCopy: IPostpaidPaymentModel;
        toggleDefaultSetting: boolean;
        $scope: any;
        //$state: any;
        $stateParams: any;

        isLoadingData: boolean;

        static $inject = ["$scope", "$stateParams", "CustomerDetailsModel"];

        constructor($scope: any, $stateParams: any, model: ICustomerDetailsModel) {
            this.$scope = $scope;
            //this.$state = $state;
            this.isPostPaidMethod = true;
            this.customerDetailsModel = model;
            this.$stateParams = $stateParams;
            this.customerInfo = $stateParams.customerObj;
            
            this.initPage();

            this.customerDetailsModel.getUserPaymentMethods(this.customerInfo.Id);//.then((data) => { console.log(data) });

            this.isLoadingData = false;
            this.customerDetailsModel.getWalletSetting();
        }

        public toggleDirectSetting() {
            if (this.directPaymentMethod.IsUseDefaultSettings) {
                this.resetDirectPaymentToDefaulSetting();
            } else {
                this.directPaymentMethod.updateFrom(this.directPaymentMethodCopy);
            }
        }

        public togglePostpaidSetting() {
            if (this.postpaidPayment.IsUseDefaultSettings) {
                this.resetPostpaidToDefaulSetting();
            } else {
                this.postpaidPayment.updateFrom(this.postpaidPaymentCopy);
            }
        }

        public savePaymentMethod(isValid: boolean) {
            if (isValid) {
                if (this.isPostPaidMethod) {
                    this.savePostpaidMethod();
                } else {
                    this.saveDirectPaymentMethod();
                }
            }
        }

        public savePostpaidMethod() {
            this.customerDetailsModel.changePostpaidSettingForCustomer(this.customerInfo.Id, this.postpaidPayment)
                .then((response: any) => {
                    this.applyPaymentToClient();
                    this.closeModal();
                });
        }

        public saveDirectPaymentMethod() {
            this.customerDetailsModel.changeDirectSettingForCustomer(this.customerInfo.Id, this.directPaymentMethod)
                .then((response: any) => {
                    this.applyPaymentToClient();
                    this.closeModal();
                });
        }

        public openPaymentMethod(paymentMethod) {
            this.isLoadingData = true;
            this.toggleDefaultSetting = false;
            this.openPayment = angular.copy(paymentMethod);
            if (paymentMethod.Type == PaymentMethodType.CREDIT_CARD) {
                this.customerDetailsModel.getDirectSettingForCustomer(this.customerInfo.Id, paymentMethod.Id)
                    .then((response) => {
                        var result = response.data.Data;
                        this.directPaymentMethod = new DirectPaymentModel(result);
                        this.isPostPaidMethod = false;
                        this.isLoadingData = false;
                        this.directPaymentMethodCopy = angular.copy(this.directPaymentMethod);
                        this.toggleDirectSetting();
                    });
            } else {
                this.customerDetailsModel.getPostpaidSettingsForCustomer(this.customerInfo.Id, paymentMethod.Id)
                    .then((response: any) => {
                        var result = response.data.Data;
                        this.postpaidPayment = new PostpaidPaymentModel(result);
                        this.isPostPaidMethod = true;
                        this.isLoadingData = false;
                        this.postpaidPaymentCopy = angular.copy(this.postpaidPayment);
                        this.togglePostpaidSetting();
                    });
            }
        }

        public resetPostpaidToDefaulSetting() {
            this.postpaidPayment.updateFrom(this.customerDetailsModel.defaultPostpaidSettings);
        }

        public resetDirectPaymentToDefaulSetting() {
            this.directPaymentMethod.updateFrom(this.customerDetailsModel.defaultDirectPaymentSettings);
        }

        private initPage() {
            this.postpaidPayment = new PostpaidPaymentModel();
            this.directPaymentMethod = new DirectPaymentModel();
            //this.openPayment.PostpaidPaymentModel = new PostpaidPaymentModel();
            this.$scope.$watch(() => this.postpaidPayment.SettlementDay, () => {
                this.getDaySuffix(this.postpaidPayment.SettlementDay);
            });
        }

        private getDaySuffix(day) {
            var suffix = (day % 10 === 1 && day !== 11) ? "st" :
                (day % 10 === 2 && day !== 12) ? "nd" :
                    (day % 10 === 3 && day !== 13) ? "rd" : "th";

            this.daySuffix = suffix;
        }

        private closeModal() {
            angular.element("#modal-payment-method-settings").modal("hide");
        }

        private applyPaymentToClient() {
            angular.forEach(this.customerDetailsModel.paymentMethods, (obj, index) => {
                if (obj.Id === this.openPayment.Id) {
                    if (this.isPostPaidMethod) {
                        this.customerDetailsModel.paymentMethods[index].PostpaidPaymentModel = this.postpaidPayment;
                    } else {
                        this.customerDetailsModel.paymentMethods[index].DirectPaymentModel = this.directPaymentMethod;
                    }
                    //DirectPaymentSetting
                    return;
                }
            });
        }
    }
}