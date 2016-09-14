module Transactions {
    'use strict';

    declare var define: any;
    declare var angular: any;
    declare var Main: any;

    export class Module {
        constructor() {
            var modules: string[] = [
                "ui.router",
                "ngCookies"
            ];

            angular.module("networktransactions", modules)
                .value("ApiAddresses", {
                    GET_NETWORK_TRANSACTIONS: "/Transactions/GetTransactions",
                    GET_CRITERIA_DATA: "/Transactions/GetSearchCriteriaData",
                    GET_INVOICE_BY_ID: "/Network/Transaction/GetInvoiceById",
                    GET_EXPORT_DATA: "/Transactions/ExportCSV",
                    GET_PAYMENT_METHOD_ID: "/Transactions/GetPaymentMethodById",
                    GET_FAILED_PAYMENT_METHODS: "/Transactions/GetFailedPaymentMethods",
                    CORRECT_PAYMENT: "/Transactions/CorrectPayment",
                    GET_GATEWAY_TOKEN: "/Transactions/GetDefaultGatewayClientToken",
                    ADD_PAYMENT_METHOD: "/Transactions/AddPaymentMethodAndCharge",
                    CHANGE_POST_PAID_PAYMENT_METHOD: "/Transactions/ChangePaymentMethodAndCharge"
                })
                .service("TransactionModel", TransactionViewModel)
                .service("TransactionService", TransactionService)
                .directive('slimscroll', ["$timeout", Main.DirectiveSlimscroll])
                .controller("TransactionController", TransactionController)
                .config(["$stateProvider", ($stateProvider: any) => {
                    $stateProvider
                        .state("transactions", {
                            url: "/?action&invoiceref&status&userid&username&methodid&methodname",
                            templateUrl: "/scripts/app/modules/payment/transactions/transactions.view.html",
                            controller: "TransactionController",
                            controllerAs: "transactionCtrl"
                        });
                }]);
        }
    }

    define([
        "angular",
        "momentjs",
        "angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        "modules/payment/transactions/transactions.controller",
        "modules/payment/transactions/transactions.model",
        "modules/payment/transactions/transactions.service"
        
    ], () => {
        return new Module();
    });

}

