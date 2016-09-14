module Gateway {
    'use strict';

    declare var toastr: any;
    declare var angular: any;

    export class GatewayAddController {
        $rootScope: any;
        $scope: any;
        $state: any;

        vm: IGatewayAddModel;

        static $inject = ["$rootScope", "$scope", "$state", "GatewayAddModel"];

        constructor($rootScope: any, $scope: any, $state: any, model: IGatewayAddModel) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;

            this.vm = model;
        }

        public backToList() {
            this.$state.go("gateway");
        }

        public addPaymentGateway() {
            this.vm.addPaymentGateway()
                .then((data) => {
                    if (data.Message.length > 0) {
                        toastr.error(data.Message, "Error");
                    } else {
                        this.$state.go("gateway-view", { "gatewayId": data.Data });
                    }
                });
        }
    }
}