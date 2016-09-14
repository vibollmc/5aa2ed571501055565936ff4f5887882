module NetworkTransaction {
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
                    GET_NETWORK_TRANSACTIONS: "/Network/Transaction/GetTransactions",
                    GET_CRITERIA_DATA: "/Network/Transaction/GetSearchCriteriaData",
                    GET_INVOICE_BY_ID: "/Network/Transaction/GetInvoiceById",
                    GET_EXPORT_DATA: "/Network/Transaction/ExportCSV",
                    GET_PAYMENT_METHOD_ID: "/Network/Transaction/GetPaymentMethodById"
                })
                .service("TransactionModel", TransactionViewModel)
                .service("TransactionService", TransactionService)
                .directive('slimscroll', ["$timeout", Main.DirectiveSlimscroll])
                .controller("TransactionController", TransactionController)
                .config(["$stateProvider", ($stateProvider: any) => {
                    $stateProvider
                        .state("networktransactions", {
                            url: "/?action&invoiceref&status&userid&username&methodid&methodname",
                            templateUrl: "/scripts/app/modules/payment/network/transactions/transactions.view.html",
                            controller: "TransactionController",
                            controllerAs: "transactionCtrl"
                        });
                }]);
        }
    }

    define([
        "angular",
        "angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        "modules/payment/network/transactions/transactions.controller",
        "modules/payment/network/transactions/transactions.model",
        "modules/payment/network/transactions/transactions.service"
    ], () => {
        return new Module();
    });

}

