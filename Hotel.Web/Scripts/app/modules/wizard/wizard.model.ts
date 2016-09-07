module NewWizard {
    'use strict';

    declare var angular;
    declare var _: any;
    declare var toastr: any;
    export enum StepType { ChooseDelivery, ShipInformation, Account, Payment, Complete };
    export enum ResponseType { Success = 1, Warning, Error }
    export enum AddressType { Pickup, Delivery };
    export enum ContactPropertyType { Unknow, FirstName, LastName, Company, Phone, Email };
    export enum ComponentsHasError {
        None = 0,
        PickupAddress = 1,
        DeliveryAddress = 2,
        PickupMobilePhone = 3,
        DeliveryMobilePhone = 4
    }

    enum CompletionProcessType {
        PhotoId = 0,
        CashOnDelivery = 1,
        Signature = 2,
        SignatureWithPhoto = 3,
        DeliveryOrder = 4
    }

    export class Setting {
        formatDate: string = "DD/MM/YYYY";
        formatTime: string = "HH:mm";
    }

    export class ResponseModel {
        Code: ResponseType;
        Data: any;
        Message: string;
    }

    export class MessageBox {
        private static messatype = [{ rt: ResponseType.Success, mf: (mess, title = "Success") => { toastr.success(mess, title); } },
            { rt: ResponseType.Error, mf: (mess, title = "Error") => { toastr.error(mess, title); } },
            { rt: ResponseType.Warning, mf: (mess, title = "Warning") => { toastr.warning(mess, title); } }];

        static Message(responseType: ResponseType, message: string, title: string = "") {
            var mts = this.messatype.filter(x => x.rt === responseType);
            if (mts != null && mts.length > 0) {
                title === "" ? mts[0].mf(message) : mts[0].mf(message, title);
                return;
            }
            title === "" ? this.messatype[ResponseType.Error].mf(message) : this.messatype[ResponseType.Error].mf(message, title);
        }
    }

    export class AddressOptions {
        types: string[];
        bounds: string[];
        country: string;
        constructor(types: string[] = ['address'], country: string = 'sg', bounds: string[] = []) {
            this.types = types;
            this.bounds = bounds;
            this.country = country;
        }
    }

    export class GeoPosition {
        lat: string;
        lng: string;
        isValid(): boolean {
            return true;
        }
    }

    export class ContactModel {
        constructor() {
            this.geoLocation = new GeoPosition();
        }
        contactName: string;
        companyName: string;
        contactPhone: string;
        address: string;
        address2: string; //home, unit
        postalCode: string;
        countryCode: string;
        fullAddress: string;
        geoLocation: GeoPosition;
    }

    export class Dimension {
        length: number;
        width: number;
        height: number;
        units: any;
    }

    export class StaticContainerInformation {
        blob: string;
        key: string;
        uri: string;
    }

    export class ParcelModel {
        constructor(id: string, name: string, dimension: any, icon: any, weight: any) {
            this.id = id;
            this.name = name;
            if (dimension != undefined && dimension != null) {
                this.dimension = new Dimension();
                this.dimension.height = dimension.Height;
                this.dimension.length = dimension.Length;
                this.dimension.width = dimension.Width;
                this.dimension.units = dimension.Units;
            }
            if (icon != undefined && icon != null) {
                this.icon = new StaticContainerInformation();
                this.icon.blob = icon.Blob;
                this.icon.key = icon.Key;
                this.icon.uri = icon.Uri;
            }

            if (weight != undefined && weight != null) {

                this.weight = weight.Value;
            }
        }
        id: string;
        name: string;
        weight: any;
        dimension: Dimension;
        icon: StaticContainerInformation;
        static fromJson(jsonData: any): any {
            var result = new Array<ParcelModel>();
            if (jsonData !== undefined && jsonData != null) {
                for (var i = 0; i < jsonData.length; i++) {
                    var parcel = new ParcelModel(jsonData[i].Id, jsonData[i].Name, jsonData[i].Dimension, jsonData[i].Icon, jsonData[i].PWeight);
                    result.push(parcel);
                }
            }
            return result;
        }

    }

    export class CustomParcelModel {
        constructor() {
            this.units = "1";
            this.height = 1;
            this.width = 1;
            this.length = 1;
            this.quantity = 1;
            this.weight = 1;
            this.depth = 1;
        }

        units: any;
        name: string;
        width: number;
        height: number;
        length: number;
        quantity: number;
        weight: number;
        depth: number;
    }

    export class Currency {
        Culture: string;
        Name: string;
        Symbol: string;

        constructor(culture: string, name: string, symbol: string) {
            this.Culture = culture;
            this.Name = name;
            this.Symbol = symbol;
        }
    }

    export class Amount {
        Initilized: boolean;
        Symbol: string;
        ToDecimal: number;
        Value: number;
        Currency: Currency;

        constructor(initilized: boolean, symbol: string, toDecimal: number, value: number, currency: Currency) {
            this.Initilized = initilized;
            this.Symbol = symbol;
            this.ToDecimal = toDecimal;
            this.Value = value;
            this.Currency = currency;
        }
    }

    export class CustomPropertyModel {
        Title: string;
        PropertyId: string;
        Value: number;
        CodeName: string;
        PropertyMeta: PropertyMetaModel;
        Type: string;
        Text: string;
        SelectedOption: string;
        Amount: Amount;

        constructor(propertyId: string, title: string, value: number, codeName: string, propertyMeta: PropertyMetaModel, type: string, text: string, selectedOption: string, amount: Amount) {
            this.PropertyId = propertyId;
            this.Title = title;
            this.Value = value;
            this.PropertyMeta = propertyMeta;
            this.CodeName = codeName;
            this.Type = type;
            this.Text = text;
            this.SelectedOption = selectedOption;
            this.Amount = amount;
        }
    }

    export class PropertyMetaModel {
        Code: string;
        DashboardColumn: number;
        Description: string;
        Id: string;
        PropertyLevel: number;
        PropertyType: number;
        ReferenceId: string;
        Title: string;
        Type: string;
        Options: Array<string>;
        CurrencySymbol: string;

        constructor(code: string, dashboardColumn: number, description: string, id: string, propertyLevel: number, propertyType: number, referenceId: string, title: string, type: string, options: Array<string>, currencySymbol: string) {
            this.Code = code;
            this.Title = title;
            this.DashboardColumn = dashboardColumn;
            this.Description = description;
            this.Id = id;
            this.PropertyLevel = propertyLevel;
            this.PropertyType = propertyType;
            this.ReferenceId = referenceId;
            this.Type = type;
            this.Options = options;
            this.CurrencySymbol = currencySymbol;
        }
    }

    export class Unit {
        constructor(id: any, name: string) {
            this.id = id;
            this.name = name;
        }
        id: any;
        name: string;
        static fromJson(jsonData: any): any {
            var result = new Array<Unit>();
            if (jsonData !== undefined && jsonData != null) {
                for (var i = 0; i < jsonData.length; i++) {
                    var parcel = new Unit(jsonData[i].Id, jsonData[i].Name);
                    result.push(parcel);
                }
            }
            return result;
        }
    }

    export class NetWorkInfo {
        Address: string;
        Id: string;
        Name: string;
        Phone: string;
        TlnLogo: any;
        TlnLogoUrl: string;
    }

    export class LocationParam {
        CountryCode: string;
        Latitude: number;
        Longitude: number;

        constructor(countryCode: string, latitide: number, longitude: number) {
            this.CountryCode = countryCode;
            this.Latitude = latitide;
            this.Longitude = longitude;
        }
    }

    export class ParcelSelectModel {
        parcel: ParcelModel;
        quantity: number;
    }

    export class CouponModel {
        DisplaySubTotal: boolean;
        Subtotal: MoneyModel;
        Discounts: Array<DiscountComponentModel>;
        TotalDue: MoneyModel;
    }

    export class DiscountComponentModel {
        CouponId: string;
        Description: string;
        GlobalPromotion: boolean;
        Value: MoneyModel;
    }

    export class MoneyModel {
        Value: number;
        Symbol: string;
    }

    export class WindowModel {
        Id: string;
        Date: any;
        FromTime: any;
        ToTime: any;
    }

    export class DeliveryOption {
        DeliveryWindow: WindowModel;
        CollectionWindow: WindowModel;
        ServiceId: string;
        ServiceName: string;
        Description: string;
        GroupId: string;
        GroupName: string;
        CustomerPrice: number;
        CourierPrice: number;
        MoneySymbol: string;
        MoneyCulture: string;
        IsCoDCollection: boolean;
        CoDAmount: number;
        DisplayName: string;
        IsResellingService: boolean;
        NetWorkInfo: NetWorkInfo;
    }

    export class Delivery {
        Id: string;
        OrderedByUserId: string;
        TransactionId: string;
        TrackingNumber: string;
        QuickReferenceNumber: string;
        Status: any;
        CreatedAt: string;
        CompletedAt: string;
        Comments: string;
    }

    export class KeyValue<T> {
        [k: string]: T;
    }

    export class CompletionProcessTask {
        completionName = [
            { t: CompletionProcessType.PhotoId, n: "Collect Photo of Recipient's ID" },
            { t: CompletionProcessType.CashOnDelivery, n: "Collect Cash on Delivery" },
            { t: CompletionProcessType.Signature, n: "Collect Signature" },
            { t: CompletionProcessType.SignatureWithPhoto, n: "Use PhotoSign Method" },
            { t: CompletionProcessType.DeliveryOrder, n: "Collect Photo of Delivery Order" }
        ];
        Id: string;
        CompletionProcessType: CompletionProcessType;
        IsEnabled: boolean;
        IsLocked: boolean;
        Order: number;
        SettingEnabled: boolean;
        constructor(id: string = '', completionType: CompletionProcessType = CompletionProcessType.PhotoId, isEnabled: boolean = false, isLocked: boolean = false, order: number = 0) {
            this.Id = id;
            this.CompletionProcessType = completionType;
            this.IsEnabled = isEnabled;
            this.IsLocked = isLocked;
            this.Order = order;
            this.SettingEnabled = this.IsEnabled;

        }

        static fromJson(jsonData: any): any {
            var result = new Array<CompletionProcessTask>();
            if (jsonData !== undefined && jsonData != null) {
                for (var i = 0; i < jsonData.length; i++) {
                    var completionType = new CompletionProcessTask(jsonData[i].Id, jsonData[i].CompletionProcessType, jsonData[i].IsEnabled, jsonData[i].IsLocked, jsonData[i].Order);
                    result.push(completionType);
                }
            }
            return result;
        }

        public CompletionProcessTypeName(): string {
            var result = this.completionName.filter(x=> x.t === this.CompletionProcessType);
            return result.length > 0 ? result[0].n : '';
        }
    }

    export class ComponentErrorModel {
        ComponentHasError: ComponentsHasError;
        Details: Array<string>;

        constructor() {
            this.ComponentHasError = ComponentsHasError.None;
            this.Details = new Array<string>();
        }
    }

    export class WizardErrorModel {
        HasError: boolean;
        Message: string;
        ErrorComponents: Array<ComponentErrorModel>;

        constructor() {
            this.reset();
        }

        public reset(): void {
            this.HasError = false;
            this.Message = "";
            this.ErrorComponents = new Array<ComponentErrorModel>();
        }

        public checkComponentHasError(component: ComponentsHasError): boolean {
            var existingErrorForComponent = _.some(this.ErrorComponents, (item: ComponentErrorModel) => {
                return item.ComponentHasError == component;
            });
            return this.HasError && existingErrorForComponent;
        }

        public getErrorsForComponent(component: ComponentsHasError): Array<string> {
            var componentHasError: ComponentErrorModel = _.find(this.ErrorComponents, (item: ComponentErrorModel) => {
                return item.ComponentHasError == component;
            });

            if (component !== null) {
                return componentHasError.Details;
            }
            return new Array<string>();
        }

        public removeErrorsForComponent(component: ComponentsHasError): void {
            if (this.checkComponentHasError(component)) {
                this.ErrorComponents = _.filter(this.ErrorComponents, (errorComponent: ComponentErrorModel) => {
                    return errorComponent.ComponentHasError !== component;
                });

                if (this.ErrorComponents.length == 0) {
                    this.reset();
                }
            }
        }
    }

    export interface IWizardModel {
        network: any;
        user: any;
        contextId: string;
        deliveryDate: any;
        pickupDate: any;
        deliveryTimeFrom: any;
        deliveryTimeTo: any;
        pickupTimeFrom: any;
        pickupTimeTo: any;
        name: string;
        stepTitle: string;
        delivery: Delivery;
        //step information
        reachedStep: StepType;
        CurrentStep: StepType;

        loadData(): string[];
        parcelSelect: Array<ParcelSelectModel>;

        addressDelivery: string;

        deliveryContact: ContactModel;
        pickupContact: ContactModel;
        message: string;
        getContacts(handleResponseFunc: (response: ResponseModel) => void): void;
        addressOptions: AddressOptions;
        selectedPaymentMethod: string;
        selectedPaymentMethodType: number;
        coupon: CouponModel;
        staticMapUrl: string; // Summary view - Map
        netWorkName: string;
        setting: Setting;

        SelectedServiceInfo: DeliveryOption;
        parcels: Array<ParcelModel>;
        loadParcels(callback: any, reset: boolean): void;
        addParcel(customParcel: CustomParcelModel, callback: any, callbackError: any): void;
        findParcelsById(id: string): ParcelModel;

        units: Array<Unit>;
        loadUnits(): void;
        getInterval(): any;

        getNetWorkName(): void;

        getContextId(handlingResponseFn: (response: ResponseModel) => void): void;

        updateShippingDetails(handlingResponseFn: (response: ResponseModel) => void): void;
        isValidSelectedMethod: boolean;

        ctrlIns: any;

        CustomProperties: Array<CustomPropertyModel>;

        CompletionProcessList: Array<CompletionProcessTask>;

        applyCoupon(data: any, handlingResponseFn: (response: ResponseModel) => void): void;

        removeCoupon(data: any, handlingResponseFn: (response: ResponseModel) => void): void;

        getDiscount(contextId: string, errorCallBack: any): void;
    }

    export class WizardModel implements IWizardModel {
        contextId: string;
        network: any;
        user: any;
        deliveryDate: any;
        pickupDate: any;
        deliveryTimeFrom: any;
        deliveryTimeTo: any;
        pickupTimeFrom: any;
        pickupTimeTo: any;
        name: string;
        stepTitle: string = "Choose Delivery Option";
        wizardService: IWizardService;

        delivery: Delivery;
        //step information
        StepType: any;
        reachedStep: StepType = StepType.ChooseDelivery;//as default step
        CurrentStep: StepType = StepType.ChooseDelivery;//as default step        
        selectedPaymentMethod: string;
        selectedPaymentMethodType: number;
        coupon: CouponModel;
        couponLoading: boolean;
        parcelSelect: Array<ParcelSelectModel>;
        addressDelivery: string;
        addressOptions: AddressOptions;

        deliveryContact: ContactModel;
        pickupContact: ContactModel;
        message: string;
        SelectedServiceInfo: DeliveryOption;
        parcels: Array<ParcelModel>;

        staticMapUrl: string;
        netWorkName: string;
        setting: Setting;
        isValidSelectedMethod: boolean = false;
        units: Array<Unit>;
        ctrlIns: any;

        CustomProperties: Array<CustomPropertyModel>;

        CompletionProcessList: Array<CompletionProcessTask>;

        static $inject = ["WizardService"];

        constructor(wizardService: IWizardService) {
            this.name = "i'm wizard model";
            this.wizardService = wizardService;
            this.parcelSelect = new Array<ParcelSelectModel>();
            this.contextId = "";
            this.deliveryDate = "";
            this.pickupDate = "";
            this.deliveryTimeFrom = "";
            this.deliveryTimeTo = "";
            this.pickupTimeFrom = "";
            this.pickupTimeTo = "";
            this.staticMapUrl = "";

            this.deliveryContact = new ContactModel();
            this.pickupContact = new ContactModel();
            this.addressOptions = new AddressOptions();

            this.StepType = StepType;
            this.SelectedServiceInfo = null;
            this.setting = new Setting();

            this.CustomProperties = new Array<CustomPropertyModel>();
            this.CompletionProcessList = new Array<CompletionProcessTask>();
            this.couponLoading = false;
        }

        public loadData(): string[] {
            return this.wizardService.loadData();
        }

        public loadParcels(callback: any, reset: boolean): void {
            var handleResponseFunc = (response: ResponseModel) => {
                if (response.Code === ResponseType.Success) {
                    this.parcels = ParcelModel.fromJson(response.Data);
                    if (callback != undefined && typeof (callback) === 'function') {
                        callback();
                    }
                }
            };
            if (reset || this.parcels == null || this.parcels.length == 0) {
                this.wizardService.getParcelsByContextId(this.contextId, handleResponseFunc);
            } else {
                if (callback != undefined && typeof (callback) === 'function') {
                    callback();
                }
            }
        }

        public addParcel(customParcel: CustomParcelModel, callback: any, callbackError: any): void {
            var handleResponseFunc = (response: ResponseModel) => {
                if (response.Code === 1) {
                    this.loadParcels(callback, true);
                }
                else {
                    callbackError(response.Code, response.Data.Message);
                }
            };

            this.wizardService.addCustomParcel(this.contextId, customParcel, handleResponseFunc);
        }

        public findParcelsById(id: string): ParcelModel {
            if (this.parcels != null && this.parcels.length > 0) {
                var parcels = this.parcels.filter(x=> x.id === id);
                if (parcels != null && parcels.length > 0) {
                    return parcels[0];
                }
            }
            return null;
        }

        public loadUnits(): void {
            if (this.units == null || this.units.length === 0) {

                var handleResponseFunc = (response: ResponseModel) => {
                    if (response.Code === ResponseType.Success) {
                        this.units = Unit.fromJson(response.Data);
                    }
                };

                this.wizardService.getUnits(this.contextId, handleResponseFunc);
            }
        }

        public getContacts(handleResponseFunc: (response: ResponseModel) => void): void {
            return this.wizardService.getContacts(this.contextId, handleResponseFunc);
        }

        public getInterval(): any {
            return this.wizardService.getInterval(this.contextId);
        }

        public getNetWorkName() {
            var handleResponseFunc = (response: ResponseModel) => {
                if (response.Code === ResponseType.Success) {
                    this.netWorkName = response.Data;
                } else {
                    this.netWorkName = "RocketUncle";
                }
            };

            this.wizardService.getNetWorkName(this.contextId, handleResponseFunc);
        }

        public getContextId(handlingResponseFn: (response: ResponseModel) => void): void {
            this.wizardService.getContextId((response: ResponseModel) => {
                if (response.Code == ResponseType.Success) {
                    this.contextId = response.Data.contextId;
                    this.network = response.Data.network;
                    this.user = response.Data.user;
                    
                    // update address option                    
                    this.addressOptions.country = this.network.networkCountryCode;
                }

                handlingResponseFn(response);
            });

        }

        public updateShippingDetails(handlingResponseFn: (response: ResponseModel) => void): void {

            var pickupLocationInfo: LocationParam = null;
            if (angular.isDefined(this.pickupContact.geoLocation) && this.pickupContact.geoLocation != null &&
                angular.isDefined(this.pickupContact.countryCode) &&
                angular.isNumber(this.pickupContact.geoLocation.lat) && angular.isNumber(this.pickupContact.geoLocation.lng)) {

                pickupLocationInfo = new LocationParam(this.pickupContact.countryCode, parseFloat(this.pickupContact.geoLocation.lat), parseFloat(this.pickupContact.geoLocation.lng));
            }

            var deliverLocationInfo: any = null;
            if (angular.isDefined(this.deliveryContact.geoLocation) && this.deliveryContact.geoLocation != null &&
                angular.isDefined(this.deliveryContact.countryCode) &&
                angular.isNumber(this.deliveryContact.geoLocation.lat) && angular.isNumber(this.deliveryContact.geoLocation.lng)) {

                deliverLocationInfo = new LocationParam(this.deliveryContact.countryCode, parseFloat(this.deliveryContact.geoLocation.lat), parseFloat(this.deliveryContact.geoLocation.lng));
            }

            var data: any = {
                contextId: this.contextId,
                pickupJsonModel: {
                    Address: this.pickupContact.address,
                    PostalCode: this.pickupContact.postalCode,
                    CompanyName: this.pickupContact.companyName,
                    ContactName: this.pickupContact.contactName,
                    Address2: this.pickupContact.address2,
                    MobilePhone: this.pickupContact.contactPhone,
                    LocationParam: pickupLocationInfo
                },

                deliveryJsonModel: {
                    Address: this.deliveryContact.address,
                    PostalCode: this.deliveryContact.postalCode,
                    CompanyName: this.deliveryContact.companyName,
                    ContactName: this.deliveryContact.contactName,
                    Address2: this.deliveryContact.address2,
                    MobilePhone: this.deliveryContact.contactPhone,
                    LocationParam: deliverLocationInfo
                }
            };

            this.wizardService.updateShippingDetails(data, (response: ResponseModel) => {
                handlingResponseFn(response);
            });
        }

        public applyCoupon(data: any, handlingResponseFn: (response: ResponseModel) => void): void {

            this.wizardService.applyCoupon(data, (response: ResponseModel) => {
                handlingResponseFn(response);
            });

        }

        public removeCoupon(data: any, handlingResponseFn: (response: ResponseModel) => void): void {

            this.wizardService.removeCoupon(data, (response: ResponseModel) => {
                handlingResponseFn(response);
            });

        }

        public getDiscount(contextId: string, errorCallBack: any): void {

            this.couponLoading = true;
            var handleResponseFunc = (response: ResponseModel) => {
                this.couponLoading = false;
                if (response.Code == ResponseType.Success) {
                    if (response.Message === null || response.Message.length == 0) {
                        this.coupon = <CouponModel>response.Data;
                        this.SelectedServiceInfo.CustomerPrice = this.coupon.TotalDue.Value;
                        this.isValidSelectedMethod = this.SelectedServiceInfo.CustomerPrice > 0;
                    } else {
                        errorCallBack(ResponseType.Error, response.Message);
                    }
                }
                else {
                    errorCallBack(response.Code, response.Message); 
                    this.coupon = null;
                }
            };
            this.wizardService.getDiscount(contextId, handleResponseFunc);

        }
    }
}
