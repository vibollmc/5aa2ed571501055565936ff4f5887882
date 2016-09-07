/// <reference path="../../../app/shared/services/api.service.d.ts" />

module NewWizard {
    'use strict';

    declare var angular: any;
    declare var document: any;

    export interface IWizardService {
        loadData(): string[];
        getContextId(handlingSuccessResponseFn: (response: ResponseModel) => void): void;

        getParcelsByContextId(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;

        getAvailableServices(data: any, handlingSuccessResponseFn: (response: ResponseModel) => void): void;
        selectService(data: any, handlingSuccessResponseFn: (response: ResponseModel) => void): void;

        addCustomParcel(contextId: string, customParcel: any, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;

        getStaticMapUrl(contextId: string, pickLocationParam: any, deliveryLocationParam: any, width: number, height: number, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;

        updatePickupAddress(contextId: string
            , pickupAddress: string
            , postalCode: string
            , contactPhoneNumber: string
            , extraParam: LocationParam
            , handlingSuccessResponseFn: (response: ResponseModel) => void): void;

        updateDeliveryAddress(contextId: string
            , deliveryAddress: string
            , postalCode: string
            , contactPhoneNumber: string
            , extraParam: LocationParam
            , handlingSuccessResponseFn: (response: ResponseModel) => void): void;

        getContacts(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;

        getUnits(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;
        createParcelBlank(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;
        getPaymentInfo(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;

        confirmPayment(data: any, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;

        getInterval(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;
        getClientToken(gatewayId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;
        addPaymentMethod(gatewayId: string, payment_method_nonce: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;
        getNetWorkName(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;

        updateShippingDetails(shippingDetails: any, handlingSuccessResponseFn: (response: ResponseModel) => void): void;
        applyCoupon(data: any, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;
        removeCoupon(data: any, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;
        getDiscount(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void;
    }

    export class WizardService implements IWizardService {
        $timeout: any;
        $http: any;
        $log: any;
        apiService: Main.IApiService;
        apiAddresses: any;
        modalDlg: any;

        static $inject = ["$http", "$log", "$timeout", "ApiService", "ApiAddresses"];

        constructor($http: any, $log: any, $timeout: any, apiService: Main.IApiService, apiAddresses: any) {
            this.$http = $http;
            this.$log = $log;
            this.apiService = apiService;
            this.apiAddresses = apiAddresses;

            this.modalDlg = angular.element(document.querySelector("#modal-please-wait"));
        }

        public getContextId(handlingSuccessResponseFn: (response: ResponseModel) => void): void {
            this.$http.get(this.apiAddresses.NEW_CONTEXT_ID)
                .success((response: any) => {
                    handlingSuccessResponseFn(<ResponseModel>response);
                })
                .error((data, status) => {
                    this.logError(data, status);
                });
        }

        public getPaymentInfo(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void {            
            var param = {
                contextId: contextId
            };
            return this.$http.get(this.apiAddresses.GET_PAYMENT_INFO, {
                params: param
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    try {
                        handlingSuccessResponseFn(<ResponseModel>response);
                    }
                    catch (e) { }
                }                
            }).error((data, status) => {                
                this.logError(data, status);
            });
        }

        public removeContextId(contextId: string): void {
            return this.$http.get(this.apiAddresses.REMOVE_CONTEXT_ID, {
                params: { contextId: contextId }
            });
        }

        public confirmPayment(data: any, handlingSuccessResponseFn?: (response: ResponseModel) => void): any {
            this.modalDlg.modal("show");

            return this.$http.post(this.apiAddresses.CONFIRM_PAYMENT, data)
                .success((response: any) => {
                    if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                        try {
                            handlingSuccessResponseFn(<ResponseModel>response);
                        }
                        catch (e) { }
                    }

                    this.modalDlg.modal("hide");
                }).error((data, status) => {
                    this.modalDlg.modal("hide");
                    this.logError(data, status);
                });
        }

        public applyCoupon(data: any, handlingSuccessResponseFn?: (response: ResponseModel) => void): any {
            ////this.modalDlg.modal("show");

            return this.$http.post(this.apiAddresses.APPLY_COUPON, data)
                .success((response: any) => {
                    if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                        try {
                            handlingSuccessResponseFn(<ResponseModel>response);
                        }
                        catch (e) { }
                    }

                    ////this.modalDlg.modal("hide");
                }).error((data, status) => {                    
                    ////this.modalDlg.modal("hide");
                    this.logError(data, status);
                });
        }

        public removeCoupon(data: any, handlingSuccessResponseFn?: (response: ResponseModel) => void): any {
            this.modalDlg.modal("show");

            return this.$http.post(this.apiAddresses.REMOVE_COUPON, data)
                .success((response: any) => {
                    if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                        try {
                            handlingSuccessResponseFn(<ResponseModel>response);
                        }
                        catch (e) { }
                    }

                    this.modalDlg.modal("hide");
                }).error((data, status) => {
                    this.logError(data, status);
                    this.modalDlg.modal("hide");
                });
        }

        public getDiscount(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): any {
            ////this.modalDlg.modal("show");

            return this.$http.post(this.apiAddresses.GET_DISCOUNT, { contextId: contextId })
                .success((response: any) => {
                    if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                        try {
                            handlingSuccessResponseFn(<ResponseModel>response);
                        }
                        catch (e) { }
                    }

                    ////this.modalDlg.modal("hide");
                }).error((data, status) => {
                    ////this.modalDlg.modal("hide");
                    this.logError(data, status);                    
                });
        }

        public loadData(): string[] {
            alert("loading data");
            return ["apple", "orange"];
        }

        public getParcelsByContextId(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void) {
            return this.$http.get(this.apiAddresses.LIST_PARCEL, {
                params: { contextId: contextId }
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });

        }

        public addCustomParcel(contextId: string, customParcel, handlingSuccessResponseFn?: (response: ResponseModel) => void) {
            return this.$http({
                url: this.apiAddresses.ADD_PARCEL,
                method: "POST",
                data: { contextId: contextId, newParcel: customParcel }
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });

        }

        public getUnits(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void) {
            return this.$http.get(this.apiAddresses.LOAD_UNITS, {
                params: { contextId: contextId }
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });
        }

        public createParcelBlank(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void) {
            return this.$http({
                url: this.apiAddresses.CREATE_PARCEL_BLANK,
                method: "POST",
                data: { contextId: contextId }
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });
        }

        public getStaticMapUrl(contextId: string, pickLocationParam: any, deliveryLocationParam: any, width: number, height: number, handlingSuccessResponseFn?: (response: ResponseModel) => void) {
            return this.$http({
                url: this.apiAddresses.GET_STATIC_MAP_URL,
                method: "POST",
                data: { contextId: contextId, pickupLocationParam: pickLocationParam, deliveryLocationParam: deliveryLocationParam, width: width, height: height }
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });
        }

        public updatePickupAddress(contextId: string
            , pickupAddress: string
            , postalCode: string
            , contactPhoneNumber: string
            , extraParam: LocationParam
            , handlingSuccessResponseFn: (response: ResponseModel) => void): void {
            var data: any = {
                contextId: contextId,
                pickupAddress: pickupAddress,
                postalCode: postalCode,
                contactPhoneNumber: contactPhoneNumber,
                extraParam: extraParam
            };

            this.$http.post(this.apiAddresses.UPDATE_PICKUP_ADDRESS, data)
                .success((response: ResponseModel) => {
                    handlingSuccessResponseFn(response);
                })
                .error((data, status) => {
                    this.logError(data, status);
                });
        }

        public updateDeliveryAddress(contextId: string
            , deliveryAddress: string
            , postalCode: string
            , contactPhoneNumber: string
            , extraParam: LocationParam
            , handlingSuccessResponseFn: (response: ResponseModel) => void): void {
            var data: any = {
                contextId: contextId,
                deliveryAddress: deliveryAddress,
                postalCode: postalCode,
                contactPhoneNumber: contactPhoneNumber,
                extraParam: extraParam
            };
            this.$http.post(this.apiAddresses.UPDATE_DELIVERY_ADDRESS, data)
                .success((response: ResponseModel) => {
                    handlingSuccessResponseFn(response);
                })
                .error((data, status) => {
                    this.logError(data, status);
                });
        }

        public getContacts(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void): void {
            return this.$http({
                url: this.apiAddresses.GET_CONTACTS,
                method: "GET",
                params: { contextId: contextId }
            }).success((response: ResponseModel) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });
        }

        public getAvailableServices(data: any, handlingSuccessResponseFn: (response: ResponseModel) => void): void {

            this.modalDlg.modal("show");

            return this.$http.post(this.apiAddresses.GET_AVAILABLE_SERVICES, data)
                .success((response: any) => {

                    try {
                        handlingSuccessResponseFn(<ResponseModel>response);
                        this.modalDlg.modal("hide");
                    }
                    catch (e) {
                        this.modalDlg.modal("hide");
                    }
                })
                .error((data, status) => {
                    this.modalDlg.modal("hide");
                    this.logError(data, status);
                });
        }

        public selectService(data: any, handlingSuccessResponseFn: (response: ResponseModel) => void): void {

            this.modalDlg.modal("show");

            this.$http.post(this.apiAddresses.SELECT_SERVICE, data)
                .success((response: any) => {

                    try {
                        handlingSuccessResponseFn(<ResponseModel>response);
                        this.modalDlg.modal("hide");
                    }
                    catch (e) {
                        this.modalDlg.modal("hide");
                    }
                })
                .error((data, status) => {
                    this.modalDlg.modal("hide");
                    this.logError(data, status);
                });
        }

        public getInterval(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void) {
            return this.$http.get(this.apiAddresses.GET_INTERVAL_SLIDER, {
                params: { contextId: contextId }
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });
        }

        public getClientToken(gatewayId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void) {
            return this.$http.get(this.apiAddresses.GET_CLIENT_TOKEN, {
                params: { gatewayId: gatewayId }
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });
        }

        public addPaymentMethod(gatewayId: string, payment_method_nonce: string, handlingSuccessResponseFn?: (response: ResponseModel) => void) {
            return this.$http({
                url: this.apiAddresses.ADD_PAYMENT_METHOD,
                method: "POST",
                data: { gatewayId: gatewayId, payment_method_nonce: payment_method_nonce }
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });
        }

        public getNetWorkName(contextId: string, handlingSuccessResponseFn?: (response: ResponseModel) => void) {
            return this.$http.get(this.apiAddresses.NETWORK_NAME, {
                params: { contextId: contextId }
            }).success((response: any) => {
                if (typeof handlingSuccessResponseFn !== 'undefined' && handlingSuccessResponseFn !== null) {
                    handlingSuccessResponseFn(<ResponseModel>response);
                }
            }).error((data, status) => {
                this.logError(data, status);
            });
        }

        public updateShippingDetails(shippingDetails: any, handlingSuccessResponseFn: (response: ResponseModel) => void): void {
            this.modalDlg.modal("show");

            this.$http.post(this.apiAddresses.UPDATE_SHIPPING_DETAILS, shippingDetails)
                .success((response: any) => {
                    try {
                        handlingSuccessResponseFn(<ResponseModel>response);
                        this.modalDlg.modal("hide");
                    }
                    catch (e) {
                        this.modalDlg.modal("hide");
                    }                    
                })
                .error((data, status) => {
                    this.modalDlg.modal("hide");
                    this.logError(data, status);
                });
        }

        private logError(data: any, status: any): void {
            this.$log.error(data);
        }
    }
}
