module NewWizard {
    "use strict";
    declare var moment: any;
    declare var angular: any; 

    export class WizardDeliveryController extends StepBaseController {

        parcelSelectIndex: number;
        parcelSelect: any[];
        quantityParcelSelect: any[];
        IsProcessing: boolean;
        IsProcessingAdress: boolean;

        $scope: any;
        $window: any;
        vm: IWizardModel;

        WzDeliveryModel: WzDeliveryModel;

        contactTypeMapping: any = [
            { Type: ContactPropertyType.FirstName, Func: (contact: ContactModel, property) => { contact.contactName = property.Value; } },
            { Type: ContactPropertyType.LastName, Func: (contact: ContactModel, property) => { contact.contactName += ' ' + property.Value; } },
            { Type: ContactPropertyType.Company, Func: (contact: ContactModel, property) => { contact.companyName = property.Value; } },
            { Type: ContactPropertyType.Phone, Func: (contact: ContactModel, property) => { contact.contactPhone = property.Value; } }
        ];

        model: any = {
            $scope: Object,
            hasPickupTime: false,
            format: 'dd/MM/yyyy',
            minDateDelivery: new Date().setDate((new Date()).getDate()),
            maxDateDelivery: new Date().setDate((new Date()).getDate() + 30),
            minDatePickup: new Date().setDate((new Date()).getDate()),
            maxDatePickup: new Date().setDate((new Date()).getDate() + 30),
            fromMinPickupTime: 0,
            toMaxPickupTime: 24,
            interval: 0.5,
            pickerStatus: {
                openedDelivery: false,
                openedPickup: false
            },
            type: {
                delivery: 0,
                pickup: 1
            },
            openPicker: ($event, t) => {
                if (t === this.model.type.delivery) {
                    this.model.pickerStatus.openedDelivery = true;
                }
                else if (t === this.model.type.pickup) {
                    this.model.pickerStatus.openedPickup = true;
                }
            },
            disabledDate: (date, mode) => {
                return false;
            },
            disabledDatePickUp: (date, mode) => {
                var deliDate = new Date().setDate((new Date()).getDate() + 30);

                //TODO: temporary disabled delivery date
                //if (this.vm.deliveryDate !== '') {
                //    deliDate = this.vm.deliveryDate;
                //}

                if (date > deliDate) {
                    return true;
                }
                return false;
                // return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            },
            getTimeDelivery: (data) => {
                this.vm.deliveryTimeFrom = data.from;
                this.vm.deliveryTimeTo = data.to;
                this.model.calTimePickup();
                this.model.$scope.$apply('toMax');
                this.model.$scope.$apply('fromMin');
            },
            getTimePickup: (data) => {
                var hasChangePickupTimeFrom: boolean = this.vm.pickupTimeFrom != data.from;
                var hasChangePickupTimeTo: boolean = this.vm.pickupTimeTo != data.to;

                this.vm.pickupTimeFrom = data.from;
                this.vm.pickupTimeTo = data.to;
                this.model.calTimePickup();
                this.model.$scope.$apply('toMax');
                this.model.$scope.$apply('fromMin');
                if (hasChangePickupTimeFrom) this.getAvailableServices();
                if (hasChangePickupTimeTo) this.filterServicesByPickupTimeEnd();
            },
            selectDeliveryDate: () => {
                if (this.model.hasPickupTime && this.vm.pickupDate !== '' && (this.vm.pickupDate > this.vm.deliveryDate)) {
                    this.vm.pickupDate = this.vm.deliveryDate;
                }
                this.model.calTimePickup();
                this.getAvailableServices();
            },
            selectPickupDate: () => {
                this.model.calTimePickup();
                if (moment(this.vm.pickupDate).format('DD/MM/YYYY') !== moment(new Date()).format('DD/MM/YYYY')) {
                    this.vm.pickupTimeFrom = 0;
                    this.vm.pickupTimeTo = 24;
                }
                this.getAvailableServices();
            },
            calTimePickup: () => {
                //if (this.model.hasPickupTime && this.vm.deliveryDate !== '' && moment(this.vm.deliveryDate).format('DD/MM/YYYY') === moment(this.vm.pickupDate).format('DD/MM/YYYY')) {
                //    this.model.toMaxPickupTime = this.vm.deliveryTimeFrom;
                //} else {
                //    this.model.toMaxPickupTime = 24;
                //} 

                //TODO: temporary disabled delivery dateselectParcel
                if (moment(this.vm.pickupDate).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY')) {
                    this.model.fromMinPickupTime = moment(new Date()).hours() + (moment(new Date()).minutes() > 30 ? 1 : 0.5);
                } else {
                    this.model.fromMinPickupTime = 0;
                } 
                //*end temporary*//
            },
            init: ($scope) => {
                this.model.$scope = $scope;
                if (this.vm.deliveryDate === '') {
                    this.vm.deliveryDate = new Date().setDate((new Date()).getDate() + 1);
                }
                if (this.vm.pickupDate !== '') {
                    this.model.hasPickupTime = true;
                }
                this.vm.deliveryTimeFrom = this.vm.deliveryTimeFrom === '' ? 0 : this.vm.deliveryTimeFrom;
                this.vm.deliveryTimeTo = this.vm.deliveryTimeTo === '' ? 24 : this.vm.deliveryTimeTo;
                this.vm.pickupTimeFrom = this.vm.pickupTimeFrom === '' ? 0 : this.vm.pickupTimeFrom;
                this.vm.pickupTimeTo = this.vm.pickupTimeTo === '' ? 24 : this.vm.pickupTimeTo; 
                
                //TODO: temporary disabled delivery date
                this.model.hasPickupTime = true;
                if (this.vm.pickupDate === '') {
                    this.vm.pickupDate = new Date();
                    this.model.fromMinPickupTime = moment(new Date()).hours() + (moment(new Date()).minutes() > 30 ? 1 : 0.5);
                    this.vm.pickupTimeFrom = this.model.fromMinPickupTime;
                }
                this.model.calTimePickup();
            }
        };

        timeSlider: any = {
            ceil: 24,
            floor: 0,
            translate: (value) => {
                if (value === 24) {
                    return "23:59";
                }
                if (parseFloat(value) % 1 > 0) {
                    var h = Math.floor(value);
                    var m = (parseFloat(value) % 1) * 60;
                    return h + ":" + m;
                } else {
                    return value + ":00";

                }
            }
        };

        static $inject = ["$rootScope", "$scope", "$uibModal", "$state", "$log", "$window", "WizardModel", "WizardDeliveryModel"];

        constructor($rootScope: any
            , $scope: any
            , private $uibModal: any
            , $state: any
            , $log: any
            , $window: any
            , wizardModel: IWizardModel
            , WzDeliveryModel: WzDeliveryModel) {

            super($scope, $state, wizardModel, StepType.ChooseDelivery);
            wizardModel.ctrlIns = this;

            this.$log = $log;
            this.$window = $window;

            this.IsProcessing = false;
            wizardModel.stepTitle = "Choose Delivery Option";
            this.vm = wizardModel;
            $scope.model = this.model;
            $scope.timeSlider = this.timeSlider;
            $scope.vm = this.vm;

            this.model.init($scope);
            this.parcelSelect = [0];
            this.quantityParcelSelect = [1];
            this.$scope = $scope;

            this.WzDeliveryModel = WzDeliveryModel;

            this.loadParcelSelected();
            this.calMenuParcel();
            this.WzDeliveryModel.sortBy = "0";
            this.WzDeliveryModel.createParcelBlank(this.vm.contextId);
        }

        public selectService(service: any, index: number): void {
            if (this.WzDeliveryModel.SelectedService == null || this.WzDeliveryModel.SelectedService.ServiceId !== service.ServiceId || this.WzDeliveryModel.SelectedService.DeliveryWindow.Id !== service.DeliveryWindow.Id) {
                this.WzDeliveryModel.DisplayAvailableServices.forEach((item) => {
                    item.IsCoDCollection = false;
                    item.CoDAmount = null;
                });
            }
            this.WzDeliveryModel.setSelectedService(service, index);
        }

        public getNetworkNameByNetworkInfo(networkInfo: NetWorkInfo): string {
            var networkName = this.vm.netWorkName;
            if (networkInfo) {
                networkName = networkInfo.Name;
            }
            return networkName;
        }

        public getNetworkImage(networkInfo: NetWorkInfo): string {
            var imagePath = "";
            if (networkInfo) {
                imagePath = networkInfo.TlnLogoUrl;
            }
            return imagePath;
        }

        public getAvailableServices(): void {

            this.WzDeliveryModel.resetServiceList();
            this.vm.SelectedServiceInfo = null;

            if ((typeof this.vm.deliveryContact.address !== "undefined" && this.vm.deliveryContact.address !== "") 
                && (typeof this.vm.pickupContact.address !== "undefined" && this.vm.pickupContact.address !== "") 
                && this.vm.pickupDate !== "" && this.vm.parcelSelect.length > 0) {

                this.WzDeliveryModel.getAvailableServices(this.vm, (responseType) => {
                    MessageBox.Message(responseType, this.WzDeliveryModel.WzDeliveryErrorModel.Message); 
                });

                this.$window.fixFullHeight();
            }
        }

        public filterServicesByPickupTimeEnd(): void {
            this.$scope.$apply(() => {
                this.WzDeliveryModel.filteringServiceByCollectionTimeEnd(this.vm.pickupDate, this.vm.pickupTimeFrom, this.vm.pickupTimeTo);
                this.WzDeliveryModel.sortingServicesList();
            });
        }

        public sortingServicesList(): void {
            this.WzDeliveryModel.sortingServicesList();
        }

        public goToNextStep(): void {
            this.IsProcessing = true;
            this.vm.SelectedServiceInfo = this.WzDeliveryModel.SelectedService;

            this.WzDeliveryModel.selectService(this.vm
                , (response: ResponseModel) => {
                    this.go("wizard.shipping");
                }
                , (responseType: ResponseType) => {
                    MessageBox.Message(responseType, this.WzDeliveryModel.WzDeliveryErrorModel.Message);   
                });
        }

        public validate(): boolean {
            return this.vm.SelectedServiceInfo != null;
        }

        public addParcel(): void {
            this.parcelSelect.push(0);
            this.quantityParcelSelect.push(1);
            this.calMenuParcel();

        }

        public addCustomParcel(): void {
            if (!this.$scope.formAddParcel.$valid) {
                return;
            }
            this.vm.addParcel(this.WzDeliveryModel.customParcel, () => {
                var custom = this.WzDeliveryModel.customParcel;
                var parcels = this.vm.parcels.filter(x => x.name == custom.name
                    && x.dimension.height == custom.height
                    && x.dimension.width == custom.width
                    && x.dimension.length == custom.length
                    && x.dimension.units == custom.units);
                if (parcels != null && parcels.length > 0) {
                    var index = this.parcelSelectIndex;
                    index = index == null ? this.parcelSelect.length - 1 : index;
                    var id = parcels[0].id;
                    this.parcelSelect[index] = id;
                    this.quantityParcelSelect[index] = custom.quantity;
                }
                this.WzDeliveryModel.customParcel = new CustomParcelModel();
                this.selectParcel(); 
                MessageBox.Message(ResponseType.Success, "Added new parcel");
            }, (responseType: ResponseType, message) => { 
                MessageBox.Message(responseType, message);
            });

            angular.element('#modal-custom-parcel').modal('hide');
        }

        public removeParcel(index: any): void {
            var value = this.parcelSelect[index];
            var quantity = this.quantityParcelSelect[index];
            this.parcelSelect.splice(index, 1);
            this.quantityParcelSelect.splice(index, 1);
            if (value != '0' && quantity != '0' && value != undefined && quantity != undefined) {
                this.selectParcel();
            }
            if (!this.$scope.formParcelTemplate.$valid) {
                this.selectParcel(true);
            }
            this.calMenuParcel();
        }

        public selectParcel(reset = false): void {
            if (!this.$scope.formParcelTemplate.$valid && !reset) {
                this.WzDeliveryModel.resetServiceList();
                this.vm.SelectedServiceInfo = null;
                return;
            }
            var oldList = this.vm.parcelSelect;
            this.vm.parcelSelect = new Array<ParcelSelectModel>();
            if (this.parcelSelect != null && this.parcelSelect.length > 0) {
                for (var i = 0; i < this.parcelSelect.length; i++) {
                    if (this.parcelSelect[i] != undefined && this.quantityParcelSelect[i] != undefined && this.parcelSelect[i] != 0 && this.quantityParcelSelect[i] != 0) {
                        var parcel = this.vm.findParcelsById(this.parcelSelect[i]);
                        if (parcel != null) {
                            var parcelSelect = new ParcelSelectModel();
                            parcelSelect.parcel = parcel;
                            parcelSelect.quantity = this.quantityParcelSelect[i];
                            this.vm.parcelSelect.push(parcelSelect);
                        }
                    }
                }

                if (reset || (this.vm.parcelSelect.length > 0 && this.isParcelChange(oldList, this.vm.parcelSelect))) {
                    this.getAvailableServices();
                }
            }
            this.calMenuParcel();
        }

        private isParcelChange(oldList: Array<ParcelSelectModel>, newlist: Array<ParcelSelectModel>): boolean {
            if (oldList.length !== newlist.length) {
                return true;
            }
            for (var i = 0; i < oldList.length; i++) {
                var parcels = newlist.filter(x => x.parcel.id === oldList[i].parcel.id && x.quantity === oldList[i].quantity);
                if (parcels === null || parcels.length === 0) {
                    return true;
                }
            }
            return false;
        }

        public loadParcelSelected() {
            if (this.vm.parcelSelect != null && this.vm.parcelSelect.length > 0) {
                var pcs = [];
                var qpsl = [];
                for (var i = 0; i < this.vm.parcelSelect.length; i++) {
                    pcs.push(this.vm.parcelSelect[i].parcel.id);
                    qpsl.push(this.vm.parcelSelect[i].quantity);
                }
                this.parcelSelect = pcs;
                this.quantityParcelSelect = qpsl;
            }

        }

        public addressPickupChanged(googleDataRaw) {
            this.vm.pickupContact = this.getCode(googleDataRaw);
            this.updatePickeupAddress();
        }

        public addressDeliveryChanged(googleDataRaw) {
            this.vm.deliveryContact = this.getCode(googleDataRaw);
            this.updateDeliveryAddress();
        }

        public notAvailableAddressPickup(value) {
            this.vm.pickupContact = new ContactModel();
            this.vm.pickupContact.address = value;
            this.updatePickeupAddress();
        }

        public notAvailableAddressDelivery(value) {
            this.vm.deliveryContact = new ContactModel();
            this.vm.deliveryContact.address = value;
            this.updateDeliveryAddress();
        }

        public disabledCod(service) {
            if (!this.WzDeliveryModel.SelectedService.IsCoDCollection && this.WzDeliveryModel.SelectedService.CoDAmount == undefined) {
                this.WzDeliveryModel.SelectedService.CoDAmount = null;
            }
        }

        public showAddressBook(addressType: string): void {

            this.$uibModal.open({
                templateUrl: 'address-book.tpl.html',
                controller: ($scope, $modalInstance) => {
                    $scope.indexElement = -1;
                    $scope.contactSelect = null;
                    $scope.selectedElment = (index, contact) => {
                        $scope.indexElement = index;
                        $scope.contactSelect = contact;
                    }
                    $scope.init = () => {
                        $scope.searchText = '';

                        var handleResponseFunc = (response: ResponseModel) => {
                            $scope.contacts = this.transformToContactModels(response.Data);
                        };

                        this.vm.getContacts(handleResponseFunc);
                    };
                    $scope.selectedContact = () => {
                        if ($scope.contactSelect !== undefined && $scope.contactSelect !== null) {
                            $modalInstance.close($scope.contactSelect);
                        } else { 
                            MessageBox.Message(ResponseType.Warning, "Please select address");
                        }
                    };
                    $scope.close = () => {
                        $modalInstance.dismiss('cancel');
                    };
                },
            }).result.then((selectedContact) => {
                if (AddressType.Pickup == AddressType[addressType]) {
                    this.WzDeliveryModel.WzDeliveryErrorModel.removeErrorsForComponent(ComponentsHasError.PickupAddress);
                    this.vm.pickupContact = selectedContact;
                    this.updatePickeupAddress();
                }
                else if (AddressType.Delivery == AddressType[addressType]) {
                    this.WzDeliveryModel.WzDeliveryErrorModel.removeErrorsForComponent(ComponentsHasError.DeliveryAddress);
                    this.vm.deliveryContact = selectedContact;
                    this.updateDeliveryAddress();
                }
            });
        }

        private transformToContactModels = (contacts) => {
            var contactModels = new Array<ContactModel>();

            for (var i in contacts) {
                var contact = contacts[i];
                var contactModel = new ContactModel();

                if (!contact.Properties || contact.Properties.length == 0) {
                    return;
                }

                for (var index in contact.Properties) {
                    var property = contact.Properties[index];

                    for (var j in this.contactTypeMapping) {
                        if (this.contactTypeMapping[j].Type == property.PropertyType) {
                            this.contactTypeMapping[j].Func(contactModel, property);
                        }
                    }
                }

                if (contact.Places) {
                    for (var i in contact.Places) {
                        contactModel.address = contact.Places[i].Address;
                        contactModel.address2 = contact.Places[i].Address2;
                        contactModel.postalCode = contact.Places[i].PostalCode;
                        contactModel.countryCode = contact.Places[i].CountryCode;
                        contactModel.geoLocation.lat = contact.Places[i].GeoPosition.Latitude;
                        contactModel.geoLocation.lng = contact.Places[i].GeoPosition.Longitude;
                    }
                }
                contactModels.push(contactModel);
            }
            return contactModels;
        }

        public updatePickeupAddress(): void {
            this.WzDeliveryModel.WzDeliveryErrorModel.removeErrorsForComponent(ComponentsHasError.PickupAddress);
            this.WzDeliveryModel.resetServiceList();
            this.vm.SelectedServiceInfo = null;
            this.WzDeliveryModel.updatePickupAddress(this.vm, (responseType: ResponseType) => {
                //On-Error
                MessageBox.Message(responseType, this.WzDeliveryModel.WzDeliveryErrorModel.Message);    
                this.vm.staticMapUrl = "";
            }, () => {
                //On-Success
                var handleResponseFunc = (response: ResponseModel) => {
                    if (response.Code === ResponseType.Success) {
                        this.vm.staticMapUrl = response.Data;
                        this.getAvailableServices();
                    } else {
                        this.vm.staticMapUrl = "";
                    }
                };

                this.WzDeliveryModel.getStaticMapUrl(this.vm, 510, 300, handleResponseFunc);
            });
        }

        public updateDeliveryAddress(): void {
            this.WzDeliveryModel.WzDeliveryErrorModel.removeErrorsForComponent(ComponentsHasError.DeliveryAddress);
            this.WzDeliveryModel.resetServiceList();
            this.vm.SelectedServiceInfo = null;
            this.WzDeliveryModel.updateDeliveryAddress(this.vm
                , (responseType: ResponseType) => {
                    //On-Error 
                    MessageBox.Message(responseType, this.WzDeliveryModel.WzDeliveryErrorModel.Message);    
                    this.vm.staticMapUrl = "";
                }
                , () => {
                    var handleResponseFunc = (response: ResponseModel) => {
                        if (response.Code === ResponseType.Success) {
                            this.vm.staticMapUrl = response.Data;
                            this.getAvailableServices();
                        } else {
                            this.vm.staticMapUrl = "";
                        }
                    };

                    this.WzDeliveryModel.getStaticMapUrl(this.vm, 510, 300, handleResponseFunc);
                });
        }

        private calMenuParcel() {
            if (this.vm.parcels != undefined && this.vm.parcels != null) {
                for (var i = 0; i < this.vm.parcels.length; i++) {
                    if (this.parcelSelect.indexOf(this.vm.parcels[i].id) === -1) {
                        this.vm.parcels.splice(0, 0, this.vm.parcels.splice(i, 1)[0]);
                        break;
                    }
                }
            }
        }

        public onSubmitSelectService(): void {

            if (!this.WzDeliveryModel.SelectedService.IsCoDCollection || (this.WzDeliveryModel.SelectedService.IsCoDCollection && this.WzDeliveryModel.SelectedService.CoDAmount != undefined)) {
                this.goToNextStep();
            }
            return;
        }

        private getCode(place) {
            if (place === null || place === undefined) {
                return null;
            }

            var returnValue: any = {};
            if (place.address_components && place.address_components.length > 0) {
                place.address_components.forEach(function (entry) {
                    if (entry.types.indexOf("postal_code") >= 0) {
                        returnValue.postalCode = entry.short_name;
                    }

                    if (entry.types.indexOf("country") >= 0) {
                        returnValue.countryCode = entry.short_name;
                    }
                });
            }

            if (place.formatted_address) {
                returnValue.address = place.formatted_address;
            }

            if (place.geometry && place.geometry.location) {
                returnValue.geoLocation = {};
                returnValue.geoLocation.lat = place.geometry.location.lat();
                returnValue.geoLocation.lng = place.geometry.location.lng();
            }

            return returnValue;
        }
    }
} 
