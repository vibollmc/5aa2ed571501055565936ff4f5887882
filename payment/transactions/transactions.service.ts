module Transactions {
    'use strict';

    export interface ITransactionService {
        getTransactions(filter: any): any;
        getCriteriaData(): any;
        getExportData(filter: any, all: boolean): any;
        getFailedPaymentMethods(): any;
        confirmCorrect(failedId: string, fixedId: string, type: any): any;
        getGatewayClientToken(): any;
        addPaymentMethod(failedMethodId: string, gatewayId: string, payment_method_nonce: string): any;
        changePaymentMethod(failedMethodId: string, gatewayId: string, payment_method_nonce: string): any;
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

        public getCriteriaData() {
            return this.$http.get(this.apiAddresses.GET_CRITERIA_DATA);
        }

        public getGatewayClientToken() {
            return this.$http.get(this.apiAddresses.GET_GATEWAY_TOKEN);
        }


        public getFailedPaymentMethods() {
            return this.$http.get(this.apiAddresses.GET_FAILED_PAYMENT_METHODS);
        }

        public getExportData(filter: any, all: boolean) {
            return this.$http({
                url: this.apiAddresses.GET_EXPORT_DATA,
                method: "POST",
                data: { criteria: filter, exportAllField: all }
            });
        }

        public confirmCorrect(failedId: string, fixedId: string, type: any) {
            return this.$http({
                url: this.apiAddresses.CORRECT_PAYMENT,
                method: "POST",
                data: { failedId: failedId, fixedId: fixedId, type: type }
            });
        }

        public addPaymentMethod(failedMethodId: string, gatewayId: string, payment_method_nonce: string) {
            return this.$http({
                url: this.apiAddresses.ADD_PAYMENT_METHOD,
                method: "POST",
                data: { failedMethodId: failedMethodId, gatewayId: gatewayId, payment_method_nonce: payment_method_nonce }
            });
        }

        public changePaymentMethod(failedMethodId: string, gatewayId: string, payment_method_nonce: string) {
            return this.$http({
                url: this.apiAddresses.CHANGE_POST_PAID_PAYMENT_METHOD,
                method: "POST",
                data: { failedMethodId: failedMethodId, gatewayId: gatewayId, payment_method_nonce: payment_method_nonce }
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