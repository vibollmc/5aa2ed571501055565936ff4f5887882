module Gateway {
    'use strict';

    declare var toastr: any;
    declare var angular: any;

    export class GatewayController {
        $rootScope: any;
        $scope: any;
        $state: any;

        vm: IGatewayModel;

        static $inject = ["$rootScope", "$scope", "$state", "GatewayModel"];

        constructor($rootScope: any, $scope: any, $state: any, model: IGatewayModel, $modalInstance) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;

            this.vm = model;

            this.getDefaultGateway();
            this.getOwnerGateways();
        }

        public getDefaultGateway() {
            return this.vm.getNetworkDefaultGateway();
        }

        public getOwnerGateways() {
            return this.vm.getOwnerGateways();
        }

        public navigate(state: string) {
            switch (state) {
                case "gateway":
                    break;
                case "gateway-add":
                    this.$state.go(state);
                    break;
                default:
                    break;
            }
        }
        
        public goToView(gatewayId: string) {
            this.$state.go("gateway-view", { "gatewayId": gatewayId });
        }
        public setDefaultGateway(gatewayId: string) {
            return this.vm.setDefaultGateway(gatewayId);
        }

        public isOwner(ownerNetworkId: string) {
            return this.vm.isOwner(ownerNetworkId);
        }
    }
}