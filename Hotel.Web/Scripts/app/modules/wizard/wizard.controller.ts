module NewWizard {
    'use strict';

    declare var $: any;

    declare var moment: any;

    declare var angular: any;

    export interface IStepController {
        WizardErrorModel: WizardErrorModel;

        $scope: any;

        validate(): boolean;

        init(): void;
    }

    export class StepBaseController implements IStepController {
        WizardErrorModel: WizardErrorModel;

        $scope: any;

        $log: any;

        $state: any;

        wizardModel: IWizardModel;

        validate(): boolean {
            return true;
        }

        private reachedStep(step: number): void {
            if (step != undefined) {
                this.wizardModel.reachedStep = step > this.wizardModel.CurrentStep ? step : this.wizardModel.reachedStep;
                this.wizardModel.CurrentStep = step;
            }
        }

        public go(stateName: string, isCheckValid?: boolean): void {
            if (isCheckValid == false) {
                this.$state.go(stateName, { "contextid": this.wizardModel.contextId });
            } else {
                if (this.validate()) {
                    this.$state.go(stateName, { "contextid": this.wizardModel.contextId });
                }
            }
        }


        init(): void {
        }

        constructor($scope: any, $state: any, wizardModel: IWizardModel, step?: number) {
            this.$scope = $scope;
            this.$state = $state;
            this.wizardModel = wizardModel;
            this.WizardErrorModel = new WizardErrorModel();
            //set reached step
            this.reachedStep(step);
        }
    }

    export class WizardController {

        $rootScope: any;

        $state: any;

        $scope: any;

        vm: IWizardModel;

        static $inject = ["$rootScope", "$scope", "$state", "WizardModel", "$uibModal"];

        constructor($rootScope: any, $scope: any, $state: any, wizardModel: IWizardModel, private $uibModal) {
            wizardModel.stepTitle = "Choose Delivery Option";
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.vm = wizardModel;
            if (this.vm.contextId == "") {
                this.vm.getContextId((response: ResponseModel) => {
                    if (response.Code != ResponseType.Success) {
                        MessageBox.Message(response.Code, response.Message);
                    }
                    else {
                        this.vm.getNetWorkName();
                        this.vm.loadParcels(() => { }, false);
                        this.vm.loadUnits();
                        this.navigate(StepType.ChooseDelivery, "wizard.delivery");
                    }
                });
            }

            $rootScope.$on("$stateChangeStart", function (event, to, toParams, from, fromParams) {
                if (wizardModel.CurrentStep == NewWizard.StepType.Complete) {
                    event.preventDefault(); // This prevents the navigation from happening                                        
                }
            });
        }

        public loadData(): void {
            this.vm.loadData();
        }

        public getDatePlainText(date) {
            if (date != undefined && date !== '') { 
                return moment(date).format(this.vm.setting.formatDate);
            }
            return date;
        }

        public navigate(step: number, stateName: string): void {
            //debugger;
            // Have To check validate before move to another step IF it backs to step less than reached step.            
            var ctrlIns = this.vm.ctrlIns;
            if (ctrlIns) {
                // Have to call valid() function in corresponding step Controller
                // If its invalid, do nothing
                if (!ctrlIns.validate()) {
                    return;
                }
            }
            // Cannot navigate anymore IF wizard is completed AND the incomming step is greater than readched step.
            if (!this.isCompleteWizard() && step <= this.vm.reachedStep) {
                this.$state.go(stateName, { "contextid": this.vm.contextId });
            }
        }

        public isCompleteWizard(): boolean {
            if (this.vm.reachedStep == StepType.Complete) {
                return true;
            }
            return false;
        }

        public getCssClass(step): string {
            if (step == this.vm.CurrentStep) {
                return 'active';
            }
            if (step < this.vm.CurrentStep) {
                return 'finished';
            }
            return '';
        }

        public getTimePlainText(time) {
            if (time != undefined) {
                var h = time;
                var m = 0;
                if (parseFloat(time) % 1 > 0) {
                    h = Math.floor(time);
                    m = (parseFloat(time) % 1) * 60;

                }
                if (h >= 12) {
                    return ((h === 12) ? h : (h - 12)) + ":" + (m === 0 ? "00" : m.toString()) + " PM";
                }
                return h + ":" + (m === 0 ? "00" : m.toString()) + " AM";
            }
            return time;
        }
        public removeCoupon(couponid: string): void {
            this.vm.removeCoupon({ contextId: this.vm.contextId, cid: couponid, moneySymbol: this.vm.SelectedServiceInfo.MoneySymbol }, (response: ResponseModel) => {
                if (response.Code == ResponseType.Success) {
                    if (response.Message === null || response.Message.length == 0) {
                        this.vm.coupon = <CouponModel>response.Data;
                        this.updateTotalPrice();
                        MessageBox.Message(ResponseType.Success, "Remove coupon " + couponid + " successfully.");
                    } else {
                        MessageBox.Message(ResponseType.Error, response.Message);
                    } 
                }
                else {
                    MessageBox.Message(response.Code, response.Message);
                    this.vm.coupon = null;
                }
            });
        }

        public showCouponPopup(): void {
            this.$uibModal.open({
                templateUrl: 'coupon.popup.tpl.html',
                windowClass: 'modal-ru modal-ru-form',
                controller: ($scope, $modalInstance) => {
                    $scope.couponid = '';
                    $scope.coupon = new CouponModel();
                    $scope.couponMessage = '';
                    $scope.inprogress = false;

                    $scope.onChange = () => {
                        $scope.couponMessage = '';
                    }
                    $scope.applyCoupon = () => {

                        if ($scope.couponid.length == 0) {
                            $scope.couponMessage = "Please enter your coupon";
                            return;
                        }
                        $scope.inprogress = true;
                        this.vm.applyCoupon({ contextId: this.vm.contextId, cid: $scope.couponid, moneySymbol: this.vm.SelectedServiceInfo.MoneySymbol }, (response: ResponseModel) => {
                            $scope.inprogress = false; 
                            if (response.Code == ResponseType.Success) {
                                if (response.Message === null || response.Message.length == 0) {
                                    $scope.couponValid = true;
                                    this.vm.coupon = <CouponModel>response.Data;
                                    this.updateTotalPrice();
                                    $modalInstance.dismiss('cancel');
                                    MessageBox.Message(ResponseType.Success, "Apply coupon " + $scope.couponid + " successfully.");

                                } else {
                                    $scope.couponMessage = response.Message;
                                }
                            }
                            else {
                                MessageBox.Message(response.Code, response.Message);
                            }

                        });
                    };

                    $scope.close = () => {
                        $modalInstance.dismiss('cancel');
                    };
                }
            }).result.then(() => {

            });
        }

        private updateTotalPrice() {
            this.vm.SelectedServiceInfo.CustomerPrice = this.vm.coupon.TotalDue.Value;
            ////this.vm.isValidSelectedMethod = this.vm.SelectedServiceInfo.CustomerPrice > 0;
        }
    }
}