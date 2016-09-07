module NewWizard {
    "use strict";

    declare var angular: any;
    export class WizardShippingController extends StepBaseController {
        vm: IWizardModel;

        isFormValid: boolean = false;

        name: string;

        static $inject = ["$rootScope", "$scope", "$state", "$log", "WizardModel"];

        constructor($rootScope: any, $scope: any, $state: any, $log: any, wizardModel: IWizardModel) {
            super($scope, $state, wizardModel, StepType.ShipInformation);
            wizardModel.ctrlIns = this;

            this.$log = $log;
            wizardModel.stepTitle = "Shipping Information";
            this.vm = wizardModel;
        }

        public onSubmit(form): void {
            this.isFormValid = form.$valid;
            if (this.isFormValid) {
                this.WizardErrorModel.reset();
                //do something if its valid   
                // update to service                

                this.vm.updateShippingDetails((response: ResponseModel) => {
                    if (response.Code == ResponseType.Error || response.Code == ResponseType.Warning) {

                        this.WizardErrorModel.HasError = true;
                        this.WizardErrorModel.Message = response.Message;

                        if (angular.isDefined(response.Data) && response.Data !== null) {
                            if (angular.isDefined(response.Data.pickupAddress) && response.Data.pickupAddress !== null) {
                                angular.forEach(response.Data.pickupAddress, (mess: string, key: string) => {
                                    var errorComponent = new ComponentErrorModel();
                                    if (key.indexOf("ContactPhone") >= 0) {
                                        errorComponent.ComponentHasError = ComponentsHasError.PickupMobilePhone;
                                    }
                                    errorComponent.Details.push(mess);
                                    this.WizardErrorModel.ErrorComponents.push(errorComponent);
                                });
                            }

                            if (angular.isDefined(response.Data.deliveryAddress) && response.Data.deliveryAddress !== null) {
                                angular.forEach(response.Data.deliveryAddress, (mess: string, key: string) => {
                                    var errorComponent = new ComponentErrorModel();
                                    if (key.indexOf("ContactPhone") >= 0) {
                                        errorComponent.ComponentHasError = ComponentsHasError.DeliveryMobilePhone;
                                    }
                                    errorComponent.Details.push(mess);
                                    this.WizardErrorModel.ErrorComponents.push(errorComponent);
                                });
                            }
                        }
                        MessageBox.Message(response.Code, response.Message);  
                    }
                    else {
                        // route to another step  
                        this.go("wizard.payment");
                    }
                });
            }
        }

        public pickupMobilePhoneHasError(): boolean {
            return this.WizardErrorModel.checkComponentHasError(ComponentsHasError.PickupMobilePhone);
        }

        public errorsForPickupMobilePhone(): Array<string> {
            return this.WizardErrorModel.getErrorsForComponent(ComponentsHasError.PickupMobilePhone);
        }

        public deliveryMobilePhoneHasError(): boolean {
            return this.WizardErrorModel.checkComponentHasError(ComponentsHasError.DeliveryMobilePhone);
        }

        public errorsForDeliveryMobilePhone(): Array<string> {
            return this.WizardErrorModel.getErrorsForComponent(ComponentsHasError.DeliveryMobilePhone);
        }

        public validate(): boolean {
            return this.isFormValid;
        }

        public createCustomView(type: string) {
            return "scripts/app/modules/wizard/shipping/" + type + ".view.html";
        }
    }
}