/// <reference path="../../../../rocketuncle.frontend.main/app/shared/directives/modal/modal.controller.ts" />

module PaymentMethod {
    'use strict';

    declare var define: any;
    declare var angular: any;
    declare var Main: any;

    export class Module {
        //public static Directives = angular.module("paymentMethod.directives", []); 
        //public static Filters = angular.module("paymentMethod.filters", []);

        constructor() {
            var modules: string[] = [
                "ui.router"
            ];

            angular.module("paymentMethod", modules)
                .value("ApiAddresses", {
                    GET_NETWORK_DEFAULT_GATEWAY_ID: "/PaymentMethods/GetNetworkDefaultGatewayId",
                    GET_SETTING_PAYMENT_METHODS: "/PaymentMethods/GetAllPaymentMethods",
                    GET_POSTPAID_METHOD: "/PaymentMethods/GetPostpaidMethod",
                    GET_CLIENT_TOKEN: "/PaymentMethods/GetClientToken",
                    ADD_DIRECT_METHOD: "/PaymentMethods/AddDirectMethod",
                    SAVE_POSTPAID_ACCOUNT: "/PaymentMethods/SavePostPaidAccount",
                    DELETE_DIRECT_ACCOUNT: "/PaymentMethods/DeleteDirectMethod",
                    GET_POSTPAID_BANKCARD: "/PaymentMethods/GetPostPaidBankCard",
                    ASSOCIATE_BANKCARD: "/PaymentMethods/AssociateBankCard",
                    REMOVE_BANKCARD: "/PaymentMethods/RemoveBankCard",
                    TOGGLE_BANKCARD: "/PaymentMethods/ToggleBankCard",
                    DELETE_POSTPAID_ACCOUNT: "/PaymentMethods/DeletePostpaidAccount",
                    GET_POSTPAID_INVOICE_SETTING: "/PaymentMethods/GetPostpaidInvoiceSetting",
                    INVITE_TO_POSTPAID_ACCOUNT: "/PaymentMethods/InviteToPostpaidAccount",
                    GET_COMPLETE_PROCESS_TASK: "/PaymentMethods/GetCompleteProcessTask",
                    EDIT_COMPLETE_PROCESS_TASK: "/PaymentMethods/EditCompletionProcess",
                    REMOVE_MEMBER: "/PaymentMethods/RemoveMember",
                    CANCEL_INVITATION: "/PaymentMethods/CancelInvitation",
                    RESEND_INVITATION: "/PaymentMethods/ResendInvitation",
                    CANCEL_INVOICE: "/PaymentMethods/CancelInvoice",
                    SET_INVOICE_PAYMENT: "/PaymentMethods/SetInvoice"

                    //GET_COMPLETE_PROCESS_TASK: "/PaymentMethods/GetPostpaidInvoiceSetting"
                })
                .filter("jsonDate", ['$filter', Main.jsonDate.Factory])//inject $filter service to function
                ////filter("labelCase", [LabelCase.Factory]);//no injection
                .directive("modal", ModalDirective.ModalPopup)
                .directive('slimscroll', ["$timeout", Main.DirectivePerfectscroll])
                .service("MethodModel", MethodModel)
                .service("PaymentMethodDetailModel", PaymentMethodDetailModel)
                .service("MethodService", MethodService)
                .service("PaymentMethodDetailService", PaymentMethodDetailService)
                .controller("MethodController", MethodController)
                .controller("PaymentMethodDetailController", PaymentMethodDetailController)
                .config(["$stateProvider", ($stateProvider: any) => {
                    $stateProvider
                        .state("paymentMethod", {
                            url: "/index",
                            templateUrl: "/scripts/app/modules/payment/method/method.view.html",
                            controller: "MethodController",
                            controllerAs: "methodCtrl"
                        })
                        .state("paymentMethodDetails", {
                            url: "/details",
                            params: { methodObj: null, gatewayId: null },
                            templateUrl: "/scripts/app/modules/payment/method/details/details.view.html",
                            controller: "PaymentMethodDetailController",
                            controllerAs: "methodDetailsCtrl"
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
        "/Scripts/app/shared/directives/modal/modal.model.js",
        "/Scripts/app/shared/directives/modal/modal.controller.js",
        "modules/payment/method/method.controller",
        "modules/payment/method/method.model",
        "modules/payment/method/method.service",
        "modules/payment/method/details/details.controller",
        "modules/payment/method/details/details.model",
        "modules/payment/method/details/details.service"
    ], () => {
        return new Module();
    });
}
