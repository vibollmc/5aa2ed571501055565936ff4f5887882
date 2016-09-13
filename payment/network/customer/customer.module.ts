module NetworkCustomer {
    'use strict';

    declare var define: any;
    declare var angular: any;
    declare var Main: any;
    //declare var jsonDate: any;

    export class Module {
        //public static Filters = angular.module("networkCustomer.filters", []);

        constructor() {
            var modules: string[] = [
                "ui.router"
            ];

            angular.module("networkCustomer", modules)
                .value("ApiAddresses", {
                    GET_SEARCH_CRITERIA_DATA: "/Network/Customer/GetSearchCriteriaData",
                    GET_NETWORK_USERS: "/Network/Customer/GetNetworkUsers",
                    EXPORT_CSV: "/Network/Customer/ExportCSV",
                    GET_PAYMENT_METHODS: "/Network/Customer/GetUserPaymentMethods",
                    GET_WALLET_SETTING: "/Wallet/GetWalletSetting",
                    CUSTOMER_POSTPAID_SETTING: "/Wallet/GetPostpaidSettingsForCustomer",
                    CHANGE_CUSTOMER_POSTPAID_SETTING: "/Wallet/ChangePostpaidSettingsForCustomer",
                    CUSTOMER_DITECT_SETTING: "/Wallet/GetDirectSettingsForCustomer",
                    CHANGE_CUSTOMER_DIRECT_SETTING: "/Wallet/ChangeDirectSettingsForCustomer"
                })
                .filter("jsonDate", ['$filter', Main.jsonDate.Factory])
                .directive('slimscroll', ["$timeout", Main.DirectivePerfectscroll])
                .directive('icheck', ["$timeout", Main.DirectiveIcheck])
                .directive('decimal',['$parse', Main.Decimal])
                .service("CustomerService", CustomerService)
                .service("CustomerModel", CustomerModel)
                .service("CustomerDetailsService", CustomerDetailsService)
                .service("CustomerDetailsModel", CustomerDetailsModel)                
                .controller("CustomerDetailsController", CustomerDetailsController)
                .controller("CustomerController", CustomerController)
                .config(["$stateProvider", ($stateProvider: any) => {
                    $stateProvider
                        .state("networkCustomer", {
                            url: "/customerList",
                            templateUrl: "/scripts/app/modules/payment/network/customer/customer.view.html",
                            controller: "CustomerController",
                            controllerAs: "customerCtrl"
                        })
                        .state("customerDetails", {
                            url: "/customerDetails",
                            templateUrl: "/scripts/app/modules/payment/network/customer/details/customerDetails.view.html",
                            params: { customerObj: null },
                            controller: "CustomerDetailsController",
                            controllerAs: "customerDetailsCtrl"
                        });
                }]);
        }
    }

    define([
        "angular",
        //"angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        "/Scripts/app/shared/filters/jsonDate.filter.js",
        "modules/payment/network/customer/customer.controller",
        "modules/payment/network/customer/customer.model",
        "modules/payment/network/customer/customer.service",
        "modules/payment/network/customer/details/customerDetails.controller",
        "modules/payment/network/customer/details/customerDetails.model",
        "modules/payment/network/customer/details/customerDetails.service",
        "modules/payment/network/customer/details/paymentMethod.model"
        //"shared/filters/jsondate"
    ], () => {
        return new Module();
    });

}