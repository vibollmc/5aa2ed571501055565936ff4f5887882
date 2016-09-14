module PaymentMethod {
    'use strict';

    //declare var toastr: any;

    export interface IMethodModel {
        paymentMethods: any;
        networkDefaultGatewayId: string;
        getNetworkDefaultGatewayId(): any;
        getPaymentMethods(): any;
        getClientToken(gatewayId: string): any;
        addDirectMethod(gatewayId: string, nonce: string): any;
        savePostPaidAccount(postpaidAccount: PostpaidAccountModel): any;
        getPostpaidMethod(companyId: string): any;
        deletePostpaidAccount(accountId: string): any;
        deleteDirectAccount(accountId: string): any;
    }

    export class MethodModel implements IMethodModel {
        networkDefaultGatewayId: string;
        paymentMethods: any;
        $q: any;
        service: IMethodService;

        static $inject = ["$q", "MethodService"];

        constructor($q, service) {
            this.$q = $q;
            this.service = service;
        }

        public getNetworkDefaultGatewayId() {
            var defer = this.$q.defer();

            this.service.getNetworkDefaultGatewayId()
                .success((data) => {
                    this.networkDefaultGatewayId = data.Data;
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public getPostpaidMethod(companyId: string) {
            var defer = this.$q.defer();

            this.service.getPostpaidMethod(companyId)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public getPaymentMethods() {
            var defer = this.$q.defer();

            this.service.getPaymentMethods()
                .success((data) => {
                    this.paymentMethods = data.Data;
                    defer.resolve(data.Data);
                });

            return defer.promise;
        }

        public deleteDirectAccount(accountId: string) {
            var defer = this.$q.defer();

            this.service.deleteDirectAccount(accountId)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public deletePostpaidAccount(companyId: string) {
            var defer = this.$q.defer();

            this.service.deletePostpaidAccount(companyId)
                .success((data) => {
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

        public savePostPaidAccount(postpaidAccount: PostpaidAccountModel) {
            var defer = this.$q.defer();

            this.service.savePostPaidAccount(postpaidAccount)
                .success((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public addDirectMethod(gatewayId: string, nonce: string) {
            var defer = this.$q.defer();

            this.service.addDirectMethod(gatewayId, nonce)
                .then((data) => {
                    defer.resolve(data);
                });

            return defer.promise;
        }
    }

    export class PostpaidAccountModel {
        Id: string;
        CompanyId: string;
        Name: string;
        EmailAddress: string;
        ContactName: string;
        ContactNumber: string;
        Address1: string;
        Address2: string;
        City: string;
        Country: string;
        PostalCode: string;
        InvoiceAttentionTo: string;
        CompanyAcraRegNumber: string;
        NumberDeliveries: string;
        Reason: string;
        CreatedAt: string;
        Users: any;
        ApproveStatus: number;

        constructor();
        constructor(objectModel: any);
        constructor(objectModel?: any) {
            if (objectModel) {
                this.Id = objectModel.Id;
                this.Name = objectModel.Name;
                this.EmailAddress = objectModel.EmailAddress;
                this.ContactName = objectModel.ContactName;
                this.ContactNumber = objectModel.ContactNumber;
                this.Address1 = objectModel.Address1;
                this.Address2 = objectModel.Address2;
                this.City = objectModel.City;
                this.Country = objectModel.Country;
                this.PostalCode = objectModel.PostalCode;
                this.InvoiceAttentionTo = objectModel.InvoiceAttentionTo;
                if (objectModel.PaymentMethod) {
                    this.CompanyAcraRegNumber = objectModel.PaymentMethod.CompanyRegistrationNumber;
                    this.NumberDeliveries = objectModel.PaymentMethod.DeliveriesMonth;
                    this.Reason = objectModel.PaymentMethod.Reason;
                    this.ApproveStatus = objectModel.PaymentMethod.ApproveStatus;
                } else {
                    this.CompanyAcraRegNumber = "";
                    this.NumberDeliveries = "";
                    this.Reason = "";
                    this.ApproveStatus = 0;
                }
                
                this.CreatedAt = objectModel.CreatedAt;
                this.Users = objectModel.Users;
            }
            else {
                this.Id = "";
                this.Name = "";
                this.EmailAddress = "";
                this.ContactName = "";
                this.ContactNumber = "";
                this.Address1 = "";
                this.Address2 = "";
                this.City = "";
                this.Country = "";
                this.PostalCode = "";
                this.InvoiceAttentionTo = "";
                this.CompanyAcraRegNumber = "";
                this.NumberDeliveries = "";
                this.Reason = "";
                this.CreatedAt = "";
                this.Users = [];
                this.ApproveStatus = 0;
            }
        }
    }
}