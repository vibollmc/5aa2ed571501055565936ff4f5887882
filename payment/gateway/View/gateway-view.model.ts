module Gateway {
    'use strict';

    export interface IGatewayViewModel {
        defaultGatewayId: string;
        networkPrivatekey: string;
        merchantAccount: NetworkReference;
        selectedGateway: BraintreeGatewayData;
        selectedGatewayId: string;
        addMerchantAccount(): any;
        removeMerchantAccount(networkPrivateKey: string): any;
        setDefaultGateway(gatewayId: string): any;
        getGateway(gatewayId: string): void;
        getNetworkDefaultGateway(): void;
        validateNetwork(merchantAccountId: string): any;
    }
    export class GatewayViewModel implements IGatewayViewModel {
        defaultGatewayId: string;
        networkPrivatekey: string;
        merchantAccount: NetworkReference;
        selectedGateway: BraintreeGatewayData;
        selectedGatewayId: string;
        $q: any;
        service: IGatewayService;
        static $inject = ["$q", "GatewayService"];
        constructor($q, service) {
            this.$q = $q;
            this.service = service;
        }
        
        public addMerchantAccount() {
            var defer = this.$q.defer();

            this.service.addMerchantAccount(this.selectedGatewayId, this.merchantAccount.NetworkPrivateKey, this.merchantAccount.MerchantAccountId)
                .then((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }
        public removeMerchantAccount(networkPrivateKey: string) {
            this.service.removeMerchantAccount(this.selectedGatewayId, networkPrivateKey)
                .then((data) => {
                    this.getGateway(this.selectedGatewayId);
                });
        }

        public setDefaultGateway(gatewayId: string) {
            this.service.setDefaultGateway(gatewayId)
                .success((data) => {
                    this.getNetworkDefaultGateway();
                });
        }
        public getGateway(gatewayId: string) {
            this.service.getGateway(gatewayId)
                .success((data) => {
                    this.selectedGateway = BraintreeGatewayData.transformGateway(data.Data);
                    this.getNetworkDefaultGateway();
                    this.initMerchantAccount();
                });
        }
        public getNetworkDefaultGateway() {
            this.service.getNetworkDefaultGateway()
                .success((data) => {
                    this.defaultGatewayId = data.defaultGatewayId;
                    this.networkPrivatekey = data.networkPrivateKey;
                });
        }

        public validateNetwork(merchantAccountId: string) {
            var defer = this.$q.defer();

            this.service.validateNetwork(this.selectedGatewayId, merchantAccountId)
                .then((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }

        private initMerchantAccount() {
            this.merchantAccount = new NetworkReference("", "", "", NetworkGatewayRefType.OWNER, PaymentGatewayType.BRAINTREE, "", "");
            if (this.selectedGateway && this.networkPrivatekey) {
                this.merchantAccount.NetworkId = this.selectedGateway.OwnerNetworkId;
                this.merchantAccount.NetworkPrivateKey = this.networkPrivatekey;
            }
        }
    }
}