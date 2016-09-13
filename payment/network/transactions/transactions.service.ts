module NetworkTransaction {
    'use strict';

    export interface ITransactionService {
        getTransactions(filter: any): any;
        getCriteriaData(userId: string): any;
        getExportData(filter: any, all: boolean): any;
        showInvoice(invoiceId: string): any;
    }

    export class TransactionService implements ITransactionService {
        $timeout: any;
        $q: any;
        $http: any;
        apiService: Main.IApiService;
        apiAddresses: any;

        static $inject = ["$http", "$timeout", "$q", "ApiService", "ApiAddresses"];

        constructor($http: any, $timeout: any, $q: any, apiService: Main.IApiService, apiAddresses: any) {
            this.$http = $http;
            this.apiService = apiService;
            this.apiAddresses = apiAddresses;
        }

        public getTransactions(filter: any) {
            return this.$http({
                url: this.apiAddresses.GET_NETWORK_TRANSACTIONS,
                method: "POST",
                data: { criteria: filter }
            });
        }

        public getCriteriaData(userId: string) {
            return this.$http.get(this.apiAddresses.GET_CRITERIA_DATA, { params: { userId: userId } });
        }
        
        public getExportData(filter: any, all: boolean) {
            return this.$http({
                url: this.apiAddresses.GET_EXPORT_DATA,
                method: "POST",
                data: { criteria: filter, exportAllField: all }
            });
        }
        public showInvoice(invoiceId: string) {
            var param = {
                invoiceId: invoiceId
            };
            return this.$http.get(this.apiAddresses.GET_INVOICE_BY_ID, { params: param });
        }
    }
}