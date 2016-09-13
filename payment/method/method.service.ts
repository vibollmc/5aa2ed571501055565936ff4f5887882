module PaymentMethod {
    'use strict';

    export interface IMethodService {
        getNetworkDefaultGatewayId(): any;
        getPaymentMethods(): any;
        getClientToken(gatewayId: string): any;
        addDirectMethod(gatewayId: string, nonce: string);
        savePostPaidAccount(postpaidAccount: PostpaidAccountModel): any;
        getPostpaidMethod(companyId: string): any;
        deletePostpaidAccount(companyId: string): any;
        deleteDirectAccount(accountId: string): any;
    }

    export class MethodService implements IMethodService {
        $q: any;
        $http: any;
        apiService: Main.IApiService;
        apiAddresses: any;

        static $inject = ["$http", "$q", "ApiService", "ApiAddresses"];

        constructor($http: any, $q: any, apiService: Main.IApiService, apiAddresses: any) {
            this.$http = $http;
            this.$q = $q;
            this.apiService = apiService;
            this.apiAddresses = apiAddresses;
        }

        public getNetworkDefaultGatewayId() {
            return this.$http.get(this.apiAddresses.GET_NETWORK_DEFAULT_GATEWAY_ID, {});
        }

        public getPostpaidMethod(companyId: string) {
            return this.$http.get(this.apiAddresses.GET_POSTPAID_METHOD, { params: { companyId: companyId } });
        }

        public getPaymentMethods() {
            return this.$http.get(this.apiAddresses.GET_SETTING_PAYMENT_METHODS, {});
        }

        public deletePostpaidAccount(companyId: string) {
            return this.$http.post(this.apiAddresses.DELETE_POSTPAID_ACCOUNT, { accountId: companyId });
        }

        public deleteDirectAccount(accountId: string) {
            return this.$http.post(this.apiAddresses.DELETE_DIRECT_ACCOUNT, { methodId: accountId });
        }

        public getClientToken(gatewayId: string) {
            var param = {
                gatewayId: gatewayId
            };

            return this.$http.get(this.apiAddresses.GET_CLIENT_TOKEN, { params: param });
        }

        public savePostPaidAccount(postpaidAccount: PostpaidAccountModel) {
            return this.$http.post(this.apiAddresses.SAVE_POSTPAID_ACCOUNT, { companyInfo: postpaidAccount });
        }

        public addDirectMethod(gatewayId: string, nonce: string) {
            var defer = this.$q.defer();

            this.$http.post(this.apiAddresses.ADD_DIRECT_METHOD, { gatewayId: gatewayId, nonce: nonce })
                .success((data) => {
                    defer.resolve(data);
                })
                .catch((data) => {
                    defer.reject(data);
                });

            return defer.promise;
        }
    }
}