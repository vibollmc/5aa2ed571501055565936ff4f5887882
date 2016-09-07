module NewWizard {
    'use strict';

    declare var define: any;
    declare var angular: any;
    declare var Main: any;

    export class Module {
        constructor() {
            var modules: string[] = [
                "ui.router",
                "ngCookies",
                WizardDeliveryModule.ModuleName,
                WizardShippingModule.ModuleName,
                WizardPaymentModule.ModuleName,
                WizardCompleteModule.ModuleName
            ];

            angular.module("wizard", modules)
                .config(function ($logProvider) {
                    $logProvider.debugEnabled(true);
                })
                .value("ApiAddresses", {
                    NEW_CONTEXT_ID: "/NewWizard/CreateWizardContext",
                    REMOVE_CONTEXT_ID: "/NewWizard/RemoveContext",
                    UPDATE_PICKUP_ADDRESS: "/NewWizard/UpdatePickupAddress",
                    UPDATE_DELIVERY_ADDRESS: "/NewWizard/UpdateDeliveryAddress",
                    GET_STATIC_MAP_URL: "/NewWizard/GetStaticMapPoint",
                    GET_AVAILABLE_SERVICES: "/NewWizard/GetAvailableServicesByPickup",
                    CONFIRM_PAYMENT: "/NewWizard/ConfirmPayment",
                    GET_PAYMENT_INFO: "/NewWizard/GetPaymentInfo",
                    ADD_PAYMENT_METHOD: "/NewWizard/AddPaymentMethod",
                    ADD_POSTPAY_METHOD: "/NewWizard/GetParcelsByContextId",
                    LIST_PARCEL: "/NewWizard/GetParcelsByContextId",
                    ADD_PARCEL: "/NewWizard/AddCustomParcel",
                    LOAD_UNITS: "/NewWizard/GetParcelUnitsByContext",
                    CREATE_PARCEL_BLANK: "/NewWizard/CreateCustomerParcel",
                    GET_CONTACTS: "/NewWizard/GetContactsByContextId",
                    SELECT_SERVICE: "NewWizard/SelectService",
                    GET_INTERVAL_SLIDER: "NewWizard/GetTimetableInterval",
                    GET_CLIENT_TOKEN: "/NewWizard/GetClientToken",
                    NETWORK_NAME: "/NewWizard/GetNetworkName",
                    UPDATE_SHIPPING_DETAILS: "/NewWizard/UpdateShippingInfo",
                    APPLY_COUPON: "/NewWizard/ApplyCoupon",
                    REMOVE_COUPON: "/NewWizard/RemoveCoupon",
                    GET_DISCOUNT: "/NewWizard/GetDiscount"
                })
                .directive('perfectscroll', ["$timeout", Main.DirectivePerfectscroll])
                .service("WizardModel", WizardModel)
                .service("WizardService", WizardService)
                .controller("WizardController", WizardController)
                .config(["$stateProvider", ($stateProvider: any) => {
                    $stateProvider
                        .state("wizard", {
                            url: "/wizard",
                            templateUrl: "scripts/app/modules/wizard/wizard.view.html",
                            controller: "WizardController",
                            controllerAs: "wizardCtrl"
                        });
                }]);
        }
    }

    define([
        "angular",
        "angularCookie",
        "angularUIRouter",
        "angularBootstrap",
        "toastr",
        "perfect-scrollbar",
        "modules/wizard/wizard.controller",
        "modules/wizard/wizard.model",
        "modules/wizard/wizard.service",
        "modules/wizard/delivery/delivery.module",
        "modules/wizard/shipping/shipping.module",
        "modules/wizard/payment/payment.module",
        "modules/wizard/complete/complete.module"
    ], () => {
        return new Module();
    });

}

