module Transactions {
    'use strict';
    declare var moment: any;
    declare var angular: any;
    declare var toastr: any;

    export enum TransactionStatus {
        All = 0,
        Pending = 1,
        Completed = 3
    }

    export enum TransactionType {
        Charge = 1,
        Surcharge = 3,
        Refund = 2
    }


    export interface ITransactionViewModel {

        transactions: any;
        invoice: Invoice;
        filter: TransactionSearchCriteria;
        userEvent: UserEvent;
        getTransactions(): any;
        getCriteriaData(): any;
        exportData(all: boolean): any;
        getFailedPaymentMethods(): any;
        confirmCorrect(failedId: string, fixedId: string, type: any): any;
        getGatewayClientToken(): any;
        addPaymentMethod(failedMethodId: string, gatewayId: string, payment_method_nonce: string): any;
        changePaymentMethod(failedMethodId: string, gatewayId: string, payment_method_nonce: string): any;
        showInvoice(invoiceId: string): any;
    }
    export class PaymentMethodModel {
        Id: string;
        NetworkId: string;
        UserId: string;
        Name: string;
        ImageUrl: string;
        IsLocked: any;
        IsDeleted: boolean;
        Type: any;
        TypeName: string;
        TotalBuffered: any;

        constructor(id: string, networkId: string, userId: string, name: string, imgUrl: string, locked: any, deleted: boolean, type: any, typename: string, buffer: any) {
            this.Id = id;
            this.NetworkId = networkId;
            this.UserId = userId;
            this.Name = name;
            this.ImageUrl = imgUrl;
            this.IsLocked = locked;
            this.IsDeleted = deleted;
            this.Type = type;
            this.TypeName = typename;
            this.TotalBuffered = buffer;
        }

        static fromJson(data) {
            if (data) {
                return new PaymentMethodModel(data.Id, data.NetworkId, data.UserId, data.Name, data.ImageUrl, data.IsLocked, data.IsDeleted, data.Type, data.TypeName, data.TotalBuffered);
            }
            return null;
        }

        static listFromJson(data) {
            var list = Array<PaymentMethodModel>();
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    list.push(PaymentMethodModel.fromJson(data[i]));
                }
            }

            return list;
        }
    }

    export class TransactionColumn {
        PropertyId: string;
        HeaderTitle: string;
        Optional: Boolean;
        Index: number;
        DefaultSelected: string;
        FieldName: string;
        ColumnDataType: string;
        EmbedField: string;
        DataField: string;

        constructor(id: string, title: string, optional: Boolean, index: number, defaultSelected: string, fieldName: string, dataType: string, embed: string, dataField: string) {
            this.PropertyId = id;
            this.HeaderTitle = title;
            this.Optional = optional;
            this.Index = index;
            this.DefaultSelected = defaultSelected;
            this.FieldName = fieldName;
            this.ColumnDataType = dataType;
            this.EmbedField = embed;
            this.DataField = dataField;
        }
        static fromJson(data) {
            var list = new Array<TransactionColumn>();
            for (var i = 0; i < data.length; i++) {
                list.push(new TransactionColumn(data[i].PropertyId, data[i].HeaderTitle, data[i].Optional, data[i].Index, data[i].DefaultSelected, data[i].FieldName, data[i].ColumnDataType, data[i].EmbedField, data[i].DataField));
            }
            return list;
        }
    }

    export class TransactionSearchCriteria {
        PageSize: number;
        PageIndex: number;
        NetworkId: string;
        UserId: string;
        InvoiceRef: string;
        PaymentMethodId: string;
        SearchText: string;
        Status: number;
        From: any;
        To: any;
        SortBy: any;
        IsPaging: boolean;
        TimeRange: string;
        SelectedColumns: any;
        JustFailed: boolean;

        constructor() {
            this.PageSize = 10;
            this.PageIndex = 1;
            this.NetworkId = "";
            this.UserId = "";
            this.InvoiceRef = "";
            this.PaymentMethodId = "";
            this.SearchText = "";
            this.Status = 0;
            this.From = "";
            this.To = "";
            //this.SortBy = "";
            this.IsPaging = true;
            this.TimeRange = "";
            this.JustFailed = false;
            this.SelectedColumns = [];
        }
    }

    export class UserEvent {
        selectedMethodId: string;
        selectedMethodName: string;
        selectedStatus: string;
        justFailed: boolean;
        userAction: string;
        failedPaymentMethods: Array<PaymentMethodModel>;
        fixedMethodId: string;
        selectedColumns: Array<string>;
        invoiceRef: string;

        static getStatusCode(status: string): number {
            switch (status) {
                case "pending":
                    return TransactionStatus.Pending;
                case "completed":
                    return TransactionStatus.Completed;
                default:
                    return TransactionStatus.All;
            }
        }

        static getStatusClass(status: string): string {
            switch (status) {
                case "pending":
                    return "btn btn-warning";
                case "failed":
                    return "btn btn-danger";
                case "completed":
                    return "btn btn-primary";
                default:
                    return "btn btn-default";
            }
        }

        constructor(queryString) {
            this.selectedMethodId = queryString.methodid;
            this.fixedMethodId = queryString.methodid;
            this.selectedMethodName = queryString.methodname;
            this.selectedStatus = queryString.status;
            this.userAction = queryString.action;
            this.justFailed = false;
            this.invoiceRef = queryString.invoiceref;
            this.failedPaymentMethods = new Array<PaymentMethodModel>();
            this.selectedColumns = ["P_TRANSACTION_TIME", "P_ODDERED_BY", "P_PAYMENT_METHOD", "P_INVOICE_REF", "P_EXT_INVOICE_NO", "P_INVOICE_STATUS", "P_DELIVERY_REF", "P_QUICK_REF", "P_AMOUNT", "P_TYPE"];
        }
    }

    export class Paging {
        pageSize: string;
        currentPage: number;
        totalRecord: number;

        constructor() {
            this.pageSize = "10";
            this.currentPage = 1;
            this.totalRecord = 0;
        }
    }

    export class TransactionModel {
        Id: string;
        NetworkId: string;
        UserId: string;
        UserName: string;
        Date: Date;
        From: any;
        To: any;
        DeliveryId: string;
        DeliveryRef: string;
        PaymentMethod: any;
        Amount: any;
        Status: any;
        Type: number;
        TypeName: string;
        InvoiceId: string;
        InvoiceQuickRef: string;
        ExtInvoiceNumber: string;
        DeliveryTrackingNumber: string;

        constructor(id: string, networkId: string, userId: string, userName: string, date: Date, from: any, to: any, deliveryId: string, deliveryRef: string, deliveryTrackingNumber: string,
            paymentMethod: any, amount: any, status: any, type: number, typeName: string, invoiceId: string, invoiceRef: string, extInvoiceRef:string) {
            this.Id = id;
            this.NetworkId = networkId;
            this.UserId = userId;
            this.UserName = userName;
            this.Date = date;
            this.From = from;
            this.To = to;
            this.DeliveryId = deliveryId;
            this.DeliveryRef = deliveryRef;
            this.DeliveryTrackingNumber = deliveryTrackingNumber;
            this.PaymentMethod = paymentMethod;
            this.Amount = amount;
            this.Status = status;
            this.Type = type;
            this.TypeName = typeName;
            this.InvoiceId = invoiceId;
            this.InvoiceQuickRef = invoiceRef;
            this.ExtInvoiceNumber = extInvoiceRef;
        }
        static fromJson(data) {
            if (data) {
                var date = moment(data.Date).valueOf();
                return new TransactionModel(data.Id, data.NetworkId, data.UserId, data.UserName, date, data.From, data.To, data.DeliveryId, data.DeliveryRef, data.DeliveryTrackingNumber,
                    data.PaymentMethod, data.Amount, data.Status, data.Type, data.TypeName, data.InvoiceId, data.InvoiceQuickRef, data.ExtInvoiceNumber);
            }
        }

        static listFromJson(data) {
            var list = new Array<TransactionModel>();
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    list.push(TransactionModel.fromJson(data[i]));
                }
            }
            return list;
        }

    }

    export class Invoice {
        Network: string;
        NetworkCurrency: string;
        Number: string;
        PaymentMethod: PaymentMethodModel;
        Transactions: Array<TransactionMeta>;
        SubTotal: number;
        Vat: number;
        TaxAmount: number;
        Total: number;

        static fromJson(data) {
            if (data) {
                var invoice = new Invoice();
                invoice.Network = data.NetworkName;
                invoice.NetworkCurrency = data.NetworkCurrency;
                invoice.Number = data.InvoiceNumber;
                invoice.PaymentMethod = PaymentMethodModel.fromJson(data.PaymentMethod);

                invoice.Transactions = new Array<TransactionMeta>();
                for (var i = 0; i < data.Transactions.length; i++) {
                    invoice.Transactions.push(TransactionMeta.fromJson(data.Transactions[i]));
                }

                invoice.SubTotal = data.SubTotal;
                // Need get invoice setting
                invoice.Vat = data.VATRate;
                invoice.TaxAmount = data.TaxAmount;
                invoice.Total = data.TotalAmount;

                return invoice;
            }
            return null;
        }
    }

    export class TransactionMeta {
        DeliveryTrackingNumber: string;
        UserName: string;
        Type: TransactionType;
        TypeString: string;
        Amount: number;

        static fromJson(data) {
            if (data) {
                var tran = new TransactionMeta();
                tran.DeliveryTrackingNumber = data.DeliveryTrackingNumber;
                tran.UserName = data.UserName;
                tran.Type = data.Type;
                tran.TypeString = TransactionType[tran.Type];
                tran.Amount = data.Amount.Value;
                return tran;
            }
            return null;
        }
    }
    export class TransactionViewModel implements ITransactionViewModel {
        $q: any;
        service: ITransactionService;
        transactions: any;
        invoice: Invoice;
        filter: TransactionSearchCriteria;
        userPaymentMethods: Array<PaymentMethodModel>;
        userCorrectPaymentMethods: Array<PaymentMethodModel>;
        transactionColumns: Array<TransactionColumn>;
        userEvent: UserEvent;
        paging: Paging;
        static $inject = ["$q", "TransactionService"];

        constructor($q, service) {
            this.$q = $q;
            this.service = service;
            this.filter = new TransactionSearchCriteria();
            this.paging = new Paging();
        }

        public getTransactions() {
            var defer = this.$q.defer();
            this.processFilter();
            this.service.getTransactions(this.filter)
                .success((data) => {
                    this.transactions = TransactionModel.listFromJson(data.result.Transactions);
                    this.paging.totalRecord = data.result.TotalRecord;
                    this.userEvent.justFailed = false;
                    defer.resolve(data);
                });

            return defer.promise;
        }

        private processFilter() {
            this.filter.TimeRange = angular.element("#txt-filter-time-range").val();
            this.filter.PaymentMethodId = this.userEvent.selectedMethodId ? this.userEvent.selectedMethodId : "";
            this.filter.JustFailed = this.userEvent.justFailed;
            this.filter.Status = this.userEvent.selectedStatus ? UserEvent.getStatusCode(this.userEvent.selectedStatus) : 0;
            this.filter.SelectedColumns = this.userEvent.selectedColumns;
            this.filter.PageSize = parseInt(this.paging.pageSize, 10);
            this.filter.PageIndex = this.paging.currentPage;
            this.filter.InvoiceRef = this.userEvent.invoiceRef ? this.userEvent.invoiceRef : "";
        }

        public getCriteriaData() {
            var defer = this.$q.defer();
            this.service.getCriteriaData()
                .success((data) => {
                    this.transactionColumns = TransactionColumn.fromJson(data.TransactionColumns);
                    this.userPaymentMethods = PaymentMethodModel.listFromJson(data.PaymentMethods);
                    this.userCorrectPaymentMethods = PaymentMethodModel.listFromJson(data.PaymentMethodsValid);
                    this.filter.NetworkId = data.NetworkId;
                    this.filter.UserId = data.UserId;
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public exportData(all: boolean) {
            var defer = this.$q.defer();
            this.processFilter();
            this.service.getExportData(this.filter, all)
                .success((data) => {
                    if (data.TotalRow <= 0) {
                        toastr.warning("No data to export.");
                        return false;
                    }
                    var blob = new Blob([data.FileContent], { type: 'text/csv' });

                    if (window.navigator.msSaveOrOpenBlob) { // For IE
                        navigator.msSaveBlob(blob, data.FileName);
                    } else {
                        var link = document.createElement('a');
                        var url = window.URL.createObjectURL(blob);
                        link.href = url;
                        link.setAttribute("download", data.FileName);
                        document.body.appendChild(link);
                        link.click();
                        setTimeout(function () {
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(url);
                        }, 500);
                    }
                    defer.resolve(data);
                });

            return defer.promise;
        }

        public getFailedPaymentMethods() {
            var defer = this.$q.defer();
            this.service.getFailedPaymentMethods()
                .success((data) => {
                    this.userEvent.failedPaymentMethods = PaymentMethodModel.listFromJson(data.Data);
                    defer.resolve(data.Data);
                });
            return defer.promise;
        }

        public confirmCorrect(failedId: string, fixedId: string, type: any) {
            var defer = this.$q.defer();
            this.service.confirmCorrect(failedId, fixedId, type)
                .success((data) => {
                    defer.resolve(data);
                });
            return defer.promise;
        }

        public getGatewayClientToken() {
            var defer = this.$q.defer();
            this.service.getGatewayClientToken()
                .success((data) => {
                    defer.resolve(data);
                });
            return defer.promise;
        }

        public addPaymentMethod(failedMethodId, gatewayId: string, payment_method_nonce: string): any {
            var defer = this.$q.defer();
            this.service.addPaymentMethod(failedMethodId, gatewayId, payment_method_nonce)
                .success((data) => {
                    defer.resolve(data);
                });
            return defer.promise;
        }
        public changePaymentMethod(failedMethodId, gatewayId: string, payment_method_nonce: string): any {
            var defer = this.$q.defer();
            this.service.changePaymentMethod(failedMethodId, gatewayId, payment_method_nonce)
                .success((data) => {
                    defer.resolve(data);
                });
            return defer.promise;
        }

        public showInvoice(invoiceId: string) {
            var defer = this.$q.defer();
            this.service.showInvoice(invoiceId)
                .success((data) => {
                    this.invoice = Invoice.fromJson(data.Data);
                    defer.resolve(data);
                });
        }
    }
}