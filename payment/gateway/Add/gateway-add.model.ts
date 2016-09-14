module Gateway {
    'use strict';
    declare var toastr: any;
    export interface IGatewayAddModel {
        addGateway: BraintreeGatewayData;
        addPaymentGateway();
    }
    export class GatewayAddModel implements IGatewayAddModel {
        addGateway: BraintreeGatewayData;

        $q: any;
        service: IGatewayService;
        static $inject = ["$q", "GatewayService"];
        constructor($q, service) {
            this.$q = $q;
            this.service = service;
            this.addGateway = new BraintreeGatewayData();
        }
        public addPaymentGateway() {
            var defer = this.$q.defer();
            this.service.addPaymentGateway(this.addGateway)
                .then((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }
    }
}