module PaymentMethod {
    'use strict';

    export interface IPaymentMethodDetailService {
        getPostPaidBankCard(methodId: string): any;
        getClientToken(gatewayId: string): any;
        associateCard(accountId: string, gatewayId: string, nonce: string): any;
        removeCard(accountId: string): any;
        toggleCard(accountId: string, enable: boolean):any;
        inviteToPostpaidAccount(accountId: string, name:string, email: string, role:number): any;        
        getPostpaidInvoiceSetting(methodId: string): any;
        getCompleteProcessTask(methodId: string): any;
        editCompleteProcessTask(accountId: string, completeProcessTaks: any): any;
        removeMember(accountId: string, memberId: string): any;
        cancelInvitation(invitationId: string): any;
        resendInvitation(accountId: string, invitationId: string): any;
        cancelInvoice(accountId: string): any;
        setInvoicePayment(accountId:string, companyAcraRegNumber:string, numberDeliveries:string, reason:string): any;
    }

    export class PaymentMethodDetailService implements IPaymentMethodDetailService {
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

        public getPostPaidBankCard(methodId: string) {
            var param = {
                methodId: methodId
            };
            return this.$http.get(this.apiAddresses.GET_POSTPAID_BANKCARD, { params: param });
        }

        public getClientToken(gatewayId: string) {
            var param = {
                gatewayId: gatewayId
            };

            return this.$http.get(this.apiAddresses.GET_CLIENT_TOKEN, { params: param });
        }

        public inviteToPostpaidAccount(accountId: string, name: string, email: string, role: number) {
            return this.$http.post(this.apiAddresses.INVITE_TO_POSTPAID_ACCOUNT, { accountId: accountId, name: name, email: email, role: role} );
        }

        public associateCard(accountId: string, gatewayId: string, nonce: string) {
            return this.$http.post(this.apiAddresses.ASSOCIATE_BANKCARD, { companyId: accountId, gatewayId: gatewayId, nonce: nonce });
        }

        public removeCard(accountId: string) {
            return this.$http.post(this.apiAddresses.REMOVE_BANKCARD, { accountId: accountId });
        }
        public toggleCard(accountId: string, enable : boolean) {
            return this.$http.post(this.apiAddresses.TOGGLE_BANKCARD, { accountId: accountId, enable: enable });
        }

        public getPostpaidInvoiceSetting(methodId: string) {
            var param = {
                postpaidMethodId: methodId
            };
            return this.$http.get(this.apiAddresses.GET_POSTPAID_INVOICE_SETTING, { params: param });
        }

        public getCompleteProcessTask(methodId: string) {
            return this.$http.get(this.apiAddresses.GET_COMPLETE_PROCESS_TASK, { params: { methodId: methodId} });
        }

        public editCompleteProcessTask(accountId: string, completeProcessTaks: any) {
            return this.$http.post(this.apiAddresses.EDIT_COMPLETE_PROCESS_TASK, { accountId: accountId, completeProcessTaks: completeProcessTaks });
        }

        public removeMember(accountId: string, memberId: string) {
            return this.$http.post(this.apiAddresses.REMOVE_MEMBER, { accountId: accountId, memberId: memberId });
        }
        public cancelInvitation(invitationId: string) {
            return this.$http.post(this.apiAddresses.CANCEL_INVITATION, { invitationId: invitationId });
        }
        public resendInvitation(accountId: string, invitationId: string) {
            return this.$http.post(this.apiAddresses.RESEND_INVITATION, { accountId: accountId, invitationId: invitationId });
        }
        public cancelInvoice(accountId:string) {
            return this.$http.post(this.apiAddresses.CANCEL_INVOICE, {  accountId: accountId });
        }
        public setInvoicePayment(accountId: string, companyAcraRegNumber: string, numberDeliveries: string, reason: string) {
            return this.$http.post(this.apiAddresses.SET_INVOICE_PAYMENT, { accountId: accountId, companyAcraRegNumber: companyAcraRegNumber, numberDeliveries: numberDeliveries, reason: reason });
        }
    }
}