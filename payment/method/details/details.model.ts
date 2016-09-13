module PaymentMethod {
    'use strict';
    declare var toastr: any;


    export class CompleteProccessTask  {
        Id: string;
        CompletionProcessType: number;
        IsEnabled: boolean;
        IsLocked: boolean;
        Order: number;

        constructor(object) {
            this.Id = object.Id;
            this.IsEnabled = object.IsEnabled;
            this.IsLocked = object.IsLocked;
            this.CompletionProcessType = object.CompletionProcessType;
            this.Order = object.Order;
        }
    }

    export class PaymentRequestModel {
        companyAcraRegNumber: string;
        numberDeliveries: string;
        reason: string;

        constructor(object?) {
            if (object) {
                this.companyAcraRegNumber = object.companyAcraRegNumber;
                this.numberDeliveries = object.numberDeliveries;
                this.reason = object.reason;
            } else {
                this.companyAcraRegNumber = "";
                this.numberDeliveries = "";
                this.reason = "";
            }
        }
    }

    export interface IPaymentMethodDetailModel {
        bankCard: any;
        invoiceSetting: any;
        completeProcessTasks: any;
        getPostPaidBankCard(methodId: string): any;
        getClientToken(gatewayId: string): any;
        associateCard(accountId: string, gatewayId: string, nonce: string): any;
        removeCard(accountId: string): any;
        toggleCard(accountId: string, enable: boolean): any;
        inviteToPostpaidAccount(accountId: string, name: string, email: string, role: number): any;
        getPostpaidInvoiceSetting(methodId: string): any;
        getCompleteProcessTask(methodId: string): any;
        editCompleteProcessTask(accountId: string, completeProcessTasks: any): any;
        removeMember(accountId: string, memberId: string): any;
        cancelInvitation(invitationId: string): any;
        resendInvitation(accountId: string, invitationId: string): any;
        cancelInvoice(accountId: string): any;
        setInvoicePayment(accountId: string, paymentRequestModel: PaymentRequestModel): any;
    }

    export class PaymentMethodDetailModel implements IPaymentMethodDetailModel {
        $q: any;
        service: IPaymentMethodDetailService;
        completeProcessTasks: any;

        bankCard: any;
        invoiceSetting: any;

        static $inject = ["$q", "PaymentMethodDetailService"];

        constructor($q, service) {
            this.$q = $q;
            this.service = service;
        }

        public getPostPaidBankCard(methodId: string) {
            var defer = this.$q.defer();

            this.service.getPostPaidBankCard(methodId)
                .success((data) => {
                    this.bankCard = data.Data;
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public getClientToken(gatewayId: string) {
            var defer = this.$q.defer();

            this.service.getClientToken(gatewayId)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public inviteToPostpaidAccount(accountId: string, name: string, email: string, role: number) {
            var defer = this.$q.defer();

            this.service.inviteToPostpaidAccount(accountId, name, email, role)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
            //return this.$http.post(this.apiAddresses.INVITE_TO_POSTPAID_ACCOUNT, { accountId: accountId, name: name, email: email, role: role });
        }

        public associateCard(accountId: string, gatewayId: string, nonce: string) {
            var defer = this.$q.defer();

            this.service.associateCard(accountId, gatewayId, nonce)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }
        public removeCard(accountId: string) {
            var defer = this.$q.defer();
            this.service.removeCard(accountId).success((data) => { defer.resolve(data); });

            return defer.promise;
        }
        public toggleCard(accountId: string, enable: boolean) {
            var defer = this.$q.defer();
            this.service.toggleCard(accountId, enable).success((data) => { defer.resolve(data); });

            return defer.promise;
        }
        public getPostpaidInvoiceSetting(methodId: string) {
            var defer = this.$q.defer();

            this.service.getPostpaidInvoiceSetting(methodId)
                .success((data) => {
                    this.invoiceSetting = data.Data;
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public getCompleteProcessTask(methodId: string) {
            var defer = this.$q.defer();

            this.service.getCompleteProcessTask(methodId)
                .success((data) => {
                    this.completeProcessTasks = data;
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public editCompleteProcessTask(accountId: string, completeProcessTasks: any) {
            var defer = this.$q.defer();

            this.service.editCompleteProcessTask(accountId, completeProcessTasks)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }
        public removeMember(accountId: string, memberId: string) {
            var defer = this.$q.defer();

            this.service.removeMember(accountId, memberId)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }
        public cancelInvitation(invitationId: string) {
            var defer = this.$q.defer();

            this.service.cancelInvitation(invitationId)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }
        public resendInvitation(accountId: string, invitationId: string) {
            var defer = this.$q.defer();

            this.service.resendInvitation(accountId, invitationId)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }
        public cancelInvoice(accountId:string) {
            var defer = this.$q.defer();

            this.service.cancelInvoice(accountId)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public setInvoicePayment(accountId: string, paymentRequestModel: PaymentRequestModel) {
            var defer = this.$q.defer();

            this.service.setInvoicePayment(accountId, paymentRequestModel.companyAcraRegNumber, paymentRequestModel.numberDeliveries, paymentRequestModel.reason)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }
    }
}