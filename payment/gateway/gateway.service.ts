module Gateway {
    'use strict';

    export interface IGatewayService {
        getOwnerGateways(): any;
        getNetworkDefaultGateway(): any;
        getGateway(id: string): any;
        addMerchantAccount(gatewayId: string, networkPrivateKey: string, merchantAccountId: string): any;
        removeMerchantAccount(gatewayId: string, networkPrivateKey: string): any;
        setDefaultGateway(gatewayId: string): any;
        addPaymentGateway(gatewayInfo: BraintreeGatewayData): any;
        validateNetwork(gatewayId: string, merchantAccountId: string): any;
    }

    export class GatewayService implements IGatewayService {
        $timeout: any;
        $q: any;
        $http: any;
        apiService: Main.IApiService;
        apiAddresses: any;

        static $inject = ["$http", "$timeout", "$q", "ApiService", "ApiAddresses"];

        constructor($http: any, $timeout: any, $q: any, apiService: Main.IApiService, apiAddresses: any) {
            this.$http = $http;
            this.$timeout = $timeout;
            this.$q = $q;
            this.apiService = apiService;
            this.apiAddresses = apiAddresses;
        }

        public getOwnerGateways() {
            return this.$http.get(this.apiAddresses.GET_OWNER_GATEWAYS);
        }

        public getNetworkDefaultGateway() {
            return this.$http.get(this.apiAddresses.GET_DEFAULT_GATEWAY);
        }

        public getGateway(id: string) {
            var param = {
                gatewayId: id
            };
            return this.$http.get(this.apiAddresses.GET_GATEWAY, { params: param });
        }

        public addMerchantAccount(gatewayId: string, networkPrivateKey: string, merchantAccountId: string) {
            var defer = this.$q.defer();
            this.$http.post(this.apiAddresses.ADD_MERCHANT_ACCOUNT, { gatewayId: gatewayId, networkPrivateKey: networkPrivateKey, merchantAccountId: merchantAccountId })
            .success((data) => {
                defer.resolve(data);
            })
            .catch((data) => {
                defer.resolve(null);
            });

            return defer.promise;
        }

        public removeMerchantAccount(gatewayId: string, networkPrivateKey: string) {
            var defer = this.$q.defer();
            this.$http.post(this.apiAddresses.REMOVE_MERCHANT_ACCOUNT, { gatewayId: gatewayId, networkPrivateKey: networkPrivateKey })
                .success((data) => {
                    defer.resolve(data);
                })
                .catch((data) => {
                    defer.resolve(null);
                });

            return defer.promise;
        }

        public setDefaultGateway(gatewayId: string) {
            return this.$http.post(this.apiAddresses.SET_DEFAULT_GATEWAY, { gatewayId: gatewayId });  
        }

        public addPaymentGateway(gatewayData: BraintreeGatewayData) {
            var defer = this.$q.defer();
            this.$http.post(this.apiAddresses.ADD_GATEWAY, { gatewayData: gatewayData })
                .success((data) => {
                    defer.resolve(data);
                })
                .catch((data) => {
                    defer.resolve(null);
                });

            return defer.promise;
        }

        public validateNetwork(gatewayId: string, merchantAccountId: string) {
            var defer = this.$q.defer();
            this.$http.post(this.apiAddresses.VALIDATE_NETWORK, { gatewayId: gatewayId, merchantAccountId: merchantAccountId })
                .success((data) => {
                    defer.resolve(data);
                })
                .catch((data) => {
                    defer.resolve(null);
                });

            return defer.promise;
        }
    }
}