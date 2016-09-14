module Gateway {
    'use strict';
    declare var angular: any;
    declare var toastr: any;
    export class GatewayViewController {
        $rootScope: any;
        $scope: any;
        $state: any;

        vm: IGatewayViewModel;

        static $inject = ["$rootScope", "$scope", "$state", "$stateParams", "GatewayViewModel"];
        constructor($rootScope: any, $scope: any, $state: any, $stateParams: any, model: IGatewayViewModel, gatewayId: any) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;

            this.vm = model;
            this.vm.selectedGatewayId = $stateParams.gatewayId;
            this.vm.getNetworkDefaultGateway();
            this.getGateway();
        }

        public getGateway() {
            return this.vm.getGateway(this.vm.selectedGatewayId);
        }

        public addMerchantAccount() {
            this.vm.addMerchantAccount()
                .then((data) => {
                    if (data.Data) {
                        this.getGateway();
                    } else {
                        toastr.error(data.Message, "Error");
                    }
                    angular.element("#add-merchant-account-cancel").trigger('click');
                });
        }

        public removeMerchantAccount(networkPrivatekey: string) {
            this.vm.removeMerchantAccount(networkPrivatekey);
        }

        public validateNetwork(merchantAccountId: string) {
            this.vm.validateNetwork(merchantAccountId)
                .then((data) => {
                    if (data.Data) {
                        toastr.success('Network reference is valid', 'Success');
                    } else {
                        toastr.error('Network reference is invalid', 'Error');
                    }
                });
        }

        public backToList() {
            this.$state.go("gateway");
        }
    }
}