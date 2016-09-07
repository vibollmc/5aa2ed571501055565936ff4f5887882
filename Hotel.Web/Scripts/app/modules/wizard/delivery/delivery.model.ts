module NewWizard {

    declare var angular: any;
    declare var moment: any;
    declare var _: any;
   
    enum BestMatchOptions {
        None = 0,
        Price = 1,
        DeliveryWindow = 2,
        CollectionWindow = 3
    }



    export class WzDeliveryModel {
        private _wzService: IWizardService;
        static $inject: string[] = ["WizardService", "$timeout", "$log"];

        WzDeliveryErrorModel: WizardErrorModel;

        AvailableServices: Array<DeliveryOption>;
        DisplayAvailableServices: Array<DeliveryOption>;
        SelectedService: DeliveryOption;
        SelectedServiceAtPos: number;

        CustomProperties: Array<CustomPropertyModel>;

        ServiceBestMatchOptions: any;
        customParcel: CustomParcelModel;

        private DefaultMessage: string = "There is no service available. Please adjust the pickup time or addresses.";
        MessageOnServiceList: string;
        sortBy: any;
        timeout: any;
        $log: any;

        constructor(wzService: IWizardService, $timeout: any, $log: any) {
            this.WzDeliveryErrorModel = new WizardErrorModel();

            this.MessageOnServiceList = this.DefaultMessage;
            this._wzService = wzService;
            this.AvailableServices = new Array<DeliveryOption>();
            this.DisplayAvailableServices = new Array<DeliveryOption>();

            this.CustomProperties = new Array<CustomPropertyModel>();
            this.SelectedService = null;

            this.resetSelectedService();

            this.ServiceBestMatchOptions = [
                { optionNo: BestMatchOptions.None, optionDesc: "Best Match" },
                { optionNo: BestMatchOptions.Price, optionDesc: "Price - Low to high" },
                { optionNo: BestMatchOptions.DeliveryWindow, optionDesc: "Delivery windows - Early to late" },
                { optionNo: BestMatchOptions.CollectionWindow, optionDesc: "Collection windows - Early to late" }
            ];

            this.sortBy = "0";
            this.timeout = $timeout;
            this.$log = $log;
        }

        public getAvailableServices(wzModel: IWizardModel, onNoSuccess: (responseType: ResponseType) => void): void {
            this.WzDeliveryErrorModel.reset();

            var parcels: any = [];
            for (var i = 0; i < wzModel.parcelSelect.length; i++) {
                var parcel = wzModel.parcelSelect[i];
                parcels.push({
                    ParcelId: parcel.parcel.id,
                    Weight: parcel.parcel.weight,
                    Items: parcel.quantity
                });
            }

            var pickupExtraLocation: LocationParam = new LocationParam(wzModel.pickupContact.countryCode, parseFloat(wzModel.pickupContact.geoLocation.lat), parseFloat(wzModel.pickupContact.geoLocation.lng));
            var deliveryExtraLocation: LocationParam = new LocationParam(wzModel.deliveryContact.countryCode, parseFloat(wzModel.deliveryContact.geoLocation.lat), parseFloat(wzModel.deliveryContact.geoLocation.lat));

            var data: any = {
                contextId: wzModel.contextId,
                pickupAddress: wzModel.pickupContact.address,
                pickupPostalCode: wzModel.pickupContact.postalCode,
                pickupExtraParam: pickupExtraLocation,
                deliveryAddress: wzModel.deliveryContact.address,
                deliverPostalCode: wzModel.deliveryContact.postalCode,
                deliveryExtraParam: deliveryExtraLocation,
                parcelList: parcels,
                pickupTime: this.getDateTime(wzModel.pickupDate, wzModel.pickupTimeFrom)
            };

            this._wzService.getAvailableServices(data, (response: ResponseModel) => {
                this.resetServiceList();
                if (response.Code == ResponseType.Success) {
                    angular.forEach(response.Data, (route, i) => {
                        angular.forEach(route.RouteServices, (routeService, j) => {
                            var serviceInfo: any = routeService.ServiceInfo;
                            var pickupInfo: any = routeService.PickupWindow;

                            angular.forEach(routeService.DeliveryWindows, (delivery, k) => {
                                var deliveryOption: DeliveryOption = new DeliveryOption();
                                //COMMON
                                deliveryOption.ServiceId = serviceInfo.Id;
                                deliveryOption.ServiceName = serviceInfo.DisplayName;
                                // filter desc text limit to 100 chars
                                var desc: string = (serviceInfo.Description == null || angular.isUndefined(serviceInfo.Description)) ? "" : serviceInfo.Description.trim();
                                deliveryOption.Description = desc.length <= 100 ? desc : (desc.substring(0, 100) + "...");
                                deliveryOption.GroupId = serviceInfo.GroupId;
                                deliveryOption.GroupName = serviceInfo.GroupName;
                                deliveryOption.CustomerPrice = serviceInfo.CustomerPrice.Total.ToDecimal;
                                deliveryOption.MoneyCulture = serviceInfo.CustomerPrice.Total.Currency.Culture;
                                deliveryOption.MoneySymbol = serviceInfo.CustomerPrice.Total.Symbol;
                                
                                //Quyen add for QC
                                deliveryOption.DisplayName = serviceInfo.DisplayName;
                                deliveryOption.CourierPrice = serviceInfo.CourierPrice.Total.ToDecimal;
                                
                                //PICKUP
                                var collectionWindow: WindowModel = new WindowModel();
                                collectionWindow.Id = pickupInfo.Id;
                                collectionWindow.Date = moment(pickupInfo.Start).valueOf();
                                collectionWindow.FromTime = moment(pickupInfo.TimeRange.From).valueOf();
                                collectionWindow.ToTime = moment(pickupInfo.TimeRange.To).valueOf();
                                deliveryOption.CollectionWindow = collectionWindow;

                                //DELIVERY
                                var deliveryWindow: WindowModel = new WindowModel();
                                deliveryWindow.Id = delivery.Id;
                                deliveryWindow.Date = moment(delivery.Start).valueOf();
                                deliveryWindow.FromTime = moment(delivery.TimeRange.From).valueOf();
                                deliveryWindow.ToTime = moment(delivery.TimeRange.To).valueOf();
                                deliveryOption.DeliveryWindow = deliveryWindow;
                                
                                //IsResellingService and NetworkInfo
                                var networkInfo: NetWorkInfo = new NetWorkInfo();
                                deliveryOption.IsResellingService = serviceInfo.IsResellingService;
                                deliveryOption.NetWorkInfo = serviceInfo.NetworkInfo;

                                this.AvailableServices.push(deliveryOption);
                            });
                        });
                    });

                    angular.copy(this.AvailableServices, this.DisplayAvailableServices);
                    this.sortingServicesList();
                } else {
                    this.WzDeliveryErrorModel.HasError = true;
                    this.WzDeliveryErrorModel.Message = response.Message;

                    if (angular.isDefined(response.Data) && response.Data !== null) {
                        if (angular.isDefined(response.Data.pickupAddress) && response.Data.pickupAddress !== null) {
                            var collectionAddressError = new ComponentErrorModel();
                            collectionAddressError.ComponentHasError = ComponentsHasError.PickupAddress;
                            angular.forEach(response.Data.pickupAddress, (mess: string, index: number) => {
                                collectionAddressError.Details.push(mess);
                            });

                            this.WzDeliveryErrorModel.ErrorComponents.push(collectionAddressError);
                        }

                        if (angular.isDefined(response.Data.deliveryAddress) && response.Data.deliveryAddress !== null) {
                            var deliveryAddressError = new ComponentErrorModel();
                            deliveryAddressError.ComponentHasError = ComponentsHasError.DeliveryAddress;
                            angular.forEach(response.Data.deliveryAddress, (mess: string, index: number) => {
                                deliveryAddressError.Details.push(mess);
                            });
                            this.WzDeliveryErrorModel.ErrorComponents.push(deliveryAddressError);
                        }
                    }

                    // Display error on screens, this action is being used from the 'delivery.controller'
                    onNoSuccess(response.Code);
                }
            });
        }

        public filteringServiceByCollectionTimeEnd(collectionDate: any, collectionTimeBegin: any, collectionTimeEnd: any): void {
            this.DisplayAvailableServices = new Array<DeliveryOption>();

            this.DisplayAvailableServices = _.filter(this.AvailableServices, (service: DeliveryOption) => {
                var serviceCollectionBegin: any = moment(service.CollectionWindow.FromTime);
                var serviceCollectionEnd: any = moment(service.CollectionWindow.ToTime);
                var collectionBegin: any = moment(this.getDateTime(collectionDate, collectionTimeBegin));
                var collectionEnd: any = moment(this.getDateTime(collectionDate, collectionTimeEnd));

                var beginIsInRange = (serviceCollectionBegin.isSame(collectionEnd) || serviceCollectionBegin.isBefore(collectionEnd)) && (serviceCollectionBegin.isSame(collectionBegin) || serviceCollectionBegin.isAfter(collectionBegin));

                var endIsInRange = (serviceCollectionEnd.isSame(collectionBegin) || serviceCollectionEnd.isAfter(collectionBegin)) && (serviceCollectionEnd.isSame(collectionEnd) || serviceCollectionEnd.isBefore(collectionEnd));

                return beginIsInRange || endIsInRange;
            });
        }

        public setSelectedService(service: DeliveryOption, selectedServiceAtPos: number): void {
            this.SelectedService = service;
            this.SelectedServiceAtPos = selectedServiceAtPos;
        }

        public resetSelectedService(): void {
            this.SelectedService = null;
            this.SelectedServiceAtPos = -1;
        }

        public sortingServicesList(): void {
            var selectedBestMatchOption: number = <BestMatchOptions>parseInt(this.sortBy);

            switch (selectedBestMatchOption) {
                case BestMatchOptions.Price:
                    this.DisplayAvailableServices = _.sortBy(this.DisplayAvailableServices, (service: DeliveryOption) => {
                        return service.CustomerPrice;
                    });
                    break;
                case BestMatchOptions.DeliveryWindow:
                    this.DisplayAvailableServices = _.chain(this.DisplayAvailableServices).sortBy((service: DeliveryOption) => {
                        return moment(service.DeliveryWindow.FromTime).format();
                    }).sortBy((service: DeliveryOption) => {
                        return moment(service.DeliveryWindow.ToTime).format();
                    }).value();
                    break;
                case BestMatchOptions.CollectionWindow:
                    this.DisplayAvailableServices = _.chain(this.DisplayAvailableServices).sortBy((service: DeliveryOption) => {
                        return moment(service.CollectionWindow.FromTime).format();
                    }).sortBy((service: DeliveryOption) => {
                        return moment(service.CollectionWindow.ToTime).format();
                    }).value();
                    break;
                default:
                    break;
            }
        }

        public selectService(wzModel: IWizardModel
            , handlingSuccessResponseFn: (response: ResponseModel) => void
            , handlingErrorResponseFn: (responseType:ResponseType ) => void): void {

            this.WzDeliveryErrorModel.reset();
            var data: any = {
                contextId: wzModel.contextId,
                serviceId: wzModel.SelectedServiceInfo.ServiceId,
                pickupScheduleId: wzModel.SelectedServiceInfo.CollectionWindow.Id,
                dropOffScheduleId: wzModel.SelectedServiceInfo.DeliveryWindow.Id,
                isCoDCollection: wzModel.SelectedServiceInfo.IsCoDCollection,
                CoDAmount: wzModel.SelectedServiceInfo.CoDAmount
            };

            this._wzService.selectService(data, (response: ResponseModel) => {
                if (response.Code == ResponseType.Success) {
                    handlingSuccessResponseFn(response);

                    // clear custom properties
                    wzModel.CustomProperties = new Array<CustomPropertyModel>();

                    // update custom properties
                    var properties: any = response.Data.Properties;
                    angular.forEach(properties, (prop, k) => {
                        var value = prop.Value;
                        var text = prop.Text;
                        var amount: Amount;
                        var selectedOption = prop.SelectedOption;
                        if (prop.Type === "STTextPropertyRuntime") {
                            if (text !== null)
                                text = text.replace(",", "");
                            else
                                text = "";
                        }
                        else if (prop.Type === 'STIdPropertyRuntime') {
                            if (value !== null)
                                value = value.replace(",", "");
                            else
                                value = "";
                        }
                        else if (prop.Type === 'STMoneyPropertyRuntime') {
                            amount = new Amount(prop.Amount.Initilized, prop.Amount.Symbol, prop.Amount.ToDecimal, prop.Amount.Value, new Currency(prop.Amount.Currency.Culture, prop.Amount.Currency.Name, prop.Amount.Currency.Symbol));
                        }
                        else if (prop.Type === 'STOptionPropertyRuntime') {
                            if (selectedOption !== null)
                                selectedOption = selectedOption.replace(",", "");
                            else
                                selectedOption = "";
                        }
                        var propMeta = new PropertyMetaModel(prop.PropertyMeta.Code, prop.PropertyMeta.DashboardColumn, prop.PropertyMeta.Description, prop.PropertyMeta.Id, prop.PropertyMeta.PropertyLevel, prop.PropertyMeta.PropertyType, prop.PropertyMeta.ReferenceId, prop.PropertyMeta.Title, prop.PropertyMeta.Type, prop.PropertyMeta.Options, prop.PropertyMeta.CurrencySymbol);

                        wzModel.CustomProperties.push(new CustomPropertyModel(prop.PropertyId, prop.Title, value, prop.CodeName, propMeta, prop.Type, text, selectedOption, amount));

                    });

                    wzModel.getDiscount(wzModel.contextId, (responseType, mess) => { MessageBox.Message(responseType, mess);});

                } else {
                    this.WzDeliveryErrorModel.HasError = true;
                    this.WzDeliveryErrorModel.Message = response.Message;

                    handlingErrorResponseFn(response.Code);
                }
            });
        }

        public createParcelBlank(contextId: string): void {
            this.timeout(() => {
                this.customParcel = new CustomParcelModel();
                //this._wzService.createParcelBlank(contextId).success((data) => { 
                //    if (data.Code === 1) {
                //        this.customParcel.units = data.Data.Units.toString();
                //    } 
                //});
            }, 1000);

        }

        private getDateTime(dateInput: any, time: any) {
            var h = time;
            var m = 0;
            if (parseFloat(time) % 1 > 0) {
                h = Math.floor(time);
                m = (parseFloat(time) % 1) * 60;
            }
            return moment(dateInput).hours(h).minutes(m).seconds(0).format();
        }

        public updatePickupAddress(wzModel: IWizardModel
            , handlingWhenError: (responseType: ResponseType) => void
            , handlingWhenSuccess: () => void): void {
          
            var locationParam: LocationParam = null;

            if (angular.isDefined(wzModel.pickupContact.geoLocation) && angular.isDefined(wzModel.pickupContact.countryCode) &&
                wzModel.pickupContact.geoLocation != null && angular.isNumber(wzModel.pickupContact.geoLocation.lat) && angular.isNumber(wzModel.pickupContact.geoLocation.lng)) {

                locationParam = new LocationParam(wzModel.pickupContact.countryCode, parseFloat(wzModel.pickupContact.geoLocation.lat), parseFloat(wzModel.pickupContact.geoLocation.lng));
            }

            this._wzService.updatePickupAddress(wzModel.contextId
                , wzModel.pickupContact.address
                , wzModel.pickupContact.postalCode
                , ''
                , locationParam
                , (response: ResponseModel) => {
                    this.handlingResponseFromUpdateAddress(response
                        , ComponentsHasError.PickupAddress
                        , handlingWhenError
                        , handlingWhenSuccess);
                });
        }

        public updateDeliveryAddress(wzModel: IWizardModel
            , handlingWhenError: (responseType: ResponseType) => void
            , handlingWhenSuccess: () => void): void {
            var locationParam: LocationParam = null;

            if (angular.isDefined(wzModel.deliveryContact.geoLocation) && angular.isDefined(wzModel.deliveryContact.countryCode) &&
                wzModel.deliveryContact.geoLocation != null && angular.isNumber(wzModel.deliveryContact.geoLocation.lat) && angular.isNumber(wzModel.deliveryContact.geoLocation.lng)) {
                locationParam = new LocationParam(wzModel.deliveryContact.countryCode, parseFloat(wzModel.deliveryContact.geoLocation.lat), parseFloat(wzModel.deliveryContact.geoLocation.lng));
            }

            this._wzService.updateDeliveryAddress(wzModel.contextId
                , wzModel.deliveryContact.address
                , wzModel.deliveryContact.postalCode
                , ''
                , locationParam
                , (response: ResponseModel) => {
                    this.handlingResponseFromUpdateAddress(response
                        , ComponentsHasError.DeliveryAddress
                        , handlingWhenError
                        , handlingWhenSuccess);
                });
        }

        private handlingResponseFromUpdateAddress(response: ResponseModel
            , component: ComponentsHasError
            , handlingWhenError: (responseType: ResponseType) => void
            , handlingWhenSuccess: () => void): void {
            if (response.Code == ResponseType.Error || response.Code == ResponseType.Warning) {
                this.WzDeliveryErrorModel.HasError = true;
                this.WzDeliveryErrorModel.Message = response.Message;

                if (angular.isDefined(response.Data) && response.Data !== null) {
                    var errorComponent = new ComponentErrorModel();
                    errorComponent.ComponentHasError = component;
                    var errors: any = null;
                    switch (component) {
                        case ComponentsHasError.PickupAddress:
                            if (angular.isDefined(response.Data.pickupAddress) && response.Data.pickupAddress !== null) {
                                errors = response.Data.pickupAddress;
                            }
                            break;
                        case ComponentsHasError.DeliveryAddress:
                            if (angular.isDefined(response.Data.deliveryAddress) && response.Data.deliveryAddress !== null) {
                                errors = response.Data.deliveryAddress;
                            }
                            break;
                    }

                    if (errors !== null) {
                        angular.forEach(errors, (msg: string, key: string) => {
                            errorComponent.Details.push(msg);
                        });
                    }

                    this.WzDeliveryErrorModel.ErrorComponents.push(errorComponent);
                    handlingWhenError(response.Code);
                }
            } else {
                handlingWhenSuccess();
            }
        }

        public getStaticMapUrl(wzModel: IWizardModel, width: number, height: number, handleResponseFunc?: (response: ResponseModel) => void) {
            var pickUpLocationParam = null;
            if (angular.isDefined(wzModel.pickupContact.geoLocation) && angular.isDefined(wzModel.pickupContact.countryCode) &&
                wzModel.pickupContact.geoLocation != null && angular.isNumber(wzModel.pickupContact.geoLocation.lat) && angular.isNumber(wzModel.pickupContact.geoLocation.lng)) {

                pickUpLocationParam = new LocationParam(wzModel.pickupContact.countryCode, parseFloat(wzModel.pickupContact.geoLocation.lat), parseFloat(wzModel.pickupContact.geoLocation.lng));
            }

            var deliveryLocationParam = null;
            if (angular.isDefined(wzModel.deliveryContact.geoLocation) && angular.isDefined(wzModel.deliveryContact.countryCode) &&
                wzModel.deliveryContact.geoLocation != null && angular.isNumber(wzModel.deliveryContact.geoLocation.lat) && angular.isNumber(wzModel.deliveryContact.geoLocation.lng)) {

                deliveryLocationParam = new LocationParam(wzModel.deliveryContact.countryCode, parseFloat(wzModel.deliveryContact.geoLocation.lat), parseFloat(wzModel.deliveryContact.geoLocation.lng));
            }

            var pickupParam = new LocationParam(wzModel.pickupContact.countryCode, parseFloat(wzModel.pickupContact.geoLocation.lat), parseFloat(wzModel.pickupContact.geoLocation.lng));
            var deliveryParam = new LocationParam(wzModel.deliveryContact.countryCode, parseFloat(wzModel.deliveryContact.geoLocation.lat), parseFloat(wzModel.deliveryContact.geoLocation.lng));

            return this._wzService.getStaticMapUrl(wzModel.contextId, pickUpLocationParam, deliveryLocationParam, width, height, handleResponseFunc);
        }

        public collectionAddressHasError(): boolean {
            return this.WzDeliveryErrorModel.checkComponentHasError(ComponentsHasError.PickupAddress);
        }

        public errorsForCollectionAddress(): Array<string> {
            return this.WzDeliveryErrorModel.getErrorsForComponent(ComponentsHasError.PickupAddress);
        }

        public deliveryAddressHasError(): boolean {
            return this.WzDeliveryErrorModel.checkComponentHasError(ComponentsHasError.DeliveryAddress);
        }

        public errorsForDeliveryAddress(): Array<string> {
            return this.WzDeliveryErrorModel.getErrorsForComponent(ComponentsHasError.DeliveryAddress);
        }

        public resetServiceList() {
            this.resetSelectedService();
            this.AvailableServices = new Array<DeliveryOption>();
            this.DisplayAvailableServices = new Array<DeliveryOption>();
        }
    }
}