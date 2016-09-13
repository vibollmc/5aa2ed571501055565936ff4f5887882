module NetworkCustomer {
    'use strict';

    export interface ICustomerDetailsService {
        
        getUserPaymentMethods(userId: string): any;
        getWalletSetting(): any;
        getPostpaidSettingsForCustomer(data: any): any;
        changePostpaidSettingsForCustomer(data: any): any;
        getDirectSettingForCustomer(data: any): any;
        changeDirectSettingsForCustomer(data: any): any;
    }

    export class CustomerDetailsService implements ICustomerDetailsService {
        $q: any;
        $http: any;
        apiService: Main.IApiService;
        apiAddresses: any;

        static $inject = ["$http", "$q", "ApiService", "ApiAddresses"];

        constructor($http: any, $q: any, apiService: Main.IApiService, apiAddresses: any) {
            this.$q = $q;
            this.$http = $http;
            this.apiService = apiService;
            this.apiAddresses = apiAddresses;
        }

        public getUserPaymentMethods(userId: string) {
            var defer = this.$q.defer();

            this.$http.get(this.apiAddresses.GET_PAYMENT_METHODS, { params: { userId: userId } })
                .success((data) => {
                    defer.resolve(data.paymentMethods);
                })
                .catch((data) => {
                    defer.resolve(null);
                });

            return defer.promise;
        }

        public getWalletSetting() {
            return this.$http.get(this.apiAddresses.GET_WALLET_SETTING);
        }

        public getPostpaidSettingsForCustomer(data: any) : any {
            return this.$http.post(this.apiAddresses.CUSTOMER_POSTPAID_SETTING, data);
        }

        public changePostpaidSettingsForCustomer(data: any): any {
            return this.$http.post(this.apiAddresses.CHANGE_CUSTOMER_POSTPAID_SETTING, { vm: data });
        }

        public getDirectSettingForCustomer(data: any): any {
            return this.$http.post(this.apiAddresses.CUSTOMER_DITECT_SETTING, data);
        }

        public changeDirectSettingsForCustomer(data: any): any {
            return this.$http.post(this.apiAddresses.CHANGE_CUSTOMER_DIRECT_SETTING, { vm: data });
        }
    }
}