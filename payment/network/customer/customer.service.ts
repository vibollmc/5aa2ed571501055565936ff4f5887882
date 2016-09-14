module NetworkCustomer {
    'use strict';

    export interface ICustomerService {
        getNetworkUsers(userSearchCriteria: any): any;
        exportCSV(userSearchCriteria: any, exportAllField: boolean): any;
        getSearchCriteriaData(): any;
        //getUserPaymentMethods(userId: string): any;
    }

    export class CustomerService implements ICustomerService {
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

        public getSearchCriteriaData() {
            var defer = this.$q.defer();

            this.$http.get(this.apiAddresses.GET_SEARCH_CRITERIA_DATA, { })
                .success((data) => {
                    defer.resolve(data);
                })
                .catch((data) => {
                    defer.resolve(null);
                });

            return defer.promise;
        }

        public getNetworkUsers(userSearchCriteria: any) {
            var defer = this.$q.defer();

            this.$http.get(this.apiAddresses.GET_NETWORK_USERS, { params: userSearchCriteria })
                .success((data) => {
                    defer.resolve(data.searchResult);
                })
                .catch((data) => {
                    defer.resolve(null);
                });

            return defer.promise;
            //return this.$http.get(this.apiAddresses.GET_NETWORK_USERS, { params: { criteria: userSearchCriteria } });
        }

        public exportCSV(userSearchCriteria: any, exportAllField: boolean) {
            var defer = this.$q.defer();
            this.$http.post(this.apiAddresses.EXPORT_CSV, { criteria: userSearchCriteria, exportAllField: exportAllField })
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