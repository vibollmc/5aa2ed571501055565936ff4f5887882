
module NetworkCustomer {
    'use strict';

    export interface ICustomerDetailsModel {
        //defaultWalletSetting: any;
        defaultPostpaidSettings: any;
        defaultDirectPaymentSettings: any;
        paymentMethods: any;
        getUserPaymentMethods(userId: string): any;
        getWalletSetting(): any;

        getPostpaidSettingsForCustomer(customerId: string, companyId: string): any;
        changePostpaidSettingForCustomer(customerId: string, postpaidPaymentMethod: IPostpaidPaymentModel): any;

        getDirectSettingForCustomer(customerId: string, paymentMethodId: string): any;
        changeDirectSettingForCustomer(customerId: string, directPaymentMethod: IDirectPaymentModel): any;
    }

    export class CustomerDetailsModel implements ICustomerDetailsModel {
        //defaultWalletSetting: any;
        defaultPostpaidSettings: IPostpaidPaymentModel;
        defaultDirectPaymentSettings: IDirectPaymentModel;
        paymentMethods: any;
        service: ICustomerDetailsService;
        $q: any;

        static $inject = ["$q", "CustomerDetailsService" ];

        constructor($q, service) {
            this.$q = $q;
            this.service = service;
        }

        public getUserPaymentMethods(userId: string) {
            var defer = this.$q.defer();

            this.service.getUserPaymentMethods(userId)
                .then((data) => {
                    this.paymentMethods = data;
                    defer.resolve(data);
                })
                .catch((error) => {
                    defer.resolve(null);
                    console.log(error);
                });

            return defer.promise;
        }

        public getWalletSetting() {
            this.service.getWalletSetting()
                .success((data) => {
                    //Convert Properties Threshold to BufferThreshold to match ClientObject
                    data.Data.DirectPaymentSettings.BufferThreshold = new Money(data.Data.DirectPaymentSettings.Threshold.Value, data.Data.DirectPaymentSettings.Threshold.Symbol);
                    this.defaultPostpaidSettings = new PostpaidPaymentModel(data.Data.PostpaidAccountSettings);
                    this.defaultDirectPaymentSettings = new DirectPaymentModel(data.Data.DirectPaymentSettings);
                })
                .catch(() => {
                    
                });
        }

        public getPostpaidSettingsForCustomer(customerId: string, companyId: string) : any {
            var data: any = {
                companyId: companyId
            };
            return this.service.getPostpaidSettingsForCustomer(data);
        }

        public changePostpaidSettingForCustomer(customerId: string, postpaidPaymentMethod: IPostpaidPaymentModel): any {
            //var vm = {
            //    PostpaidAccountId: postpaidPaymentMethod.CompanyId,
            //    CreditLimit: {
            //        Symbol: postpaidPaymentMethod.CreditLimit.Symbol,
            //        Value: postpaidPaymentMethod.CreditLimit.Value
            //    },
            //    SettlementDay: postpaidPaymentMethod.DefaultPaymentSettlementDay
            //};

            //return this.service.changePostpaidSettingsForCustomer(vm);
            return this.service.changePostpaidSettingsForCustomer(postpaidPaymentMethod);
        }

        public getDirectSettingForCustomer(customerId: string, paymentMethodId: string): any {
            var data: any = {
                paymentMethodId: paymentMethodId
            };

            return this.service.getDirectSettingForCustomer(data);
        }

        public changeDirectSettingForCustomer(customerId: string, directPaymentMethod: IDirectPaymentModel): any {
            //var vm = {
            //    PaymentMethodId: directPaymentMethod.PaymentMethodId,
            //    BufferThreshold: {
            //        Symbol: directPaymentMethod.PaymentBufferThreshold.Symbol,
            //        Value: directPaymentMethod.PaymentBufferThreshold.Value
            //    },
            //    SpendLimit: {
            //        Symbol: directPaymentMethod.SpendLimit.Symbol,
            //        Value: directPaymentMethod.SpendLimit.Value
            //    },
            //    IsMaxAgeUsed: directPaymentMethod.HasSettingMaxAgeOfUnsettledPayments,
            //    MaxDays: directPaymentMethod.MaximumAgeOfUnsettledPaymnetsDays,
            //    IsFirstTimeCharged: directPaymentMethod.IsEnablePaymentBufferInFirstCharged
            //};
            //return this.service.changeDirectSettingsForCustomer(vm);
            return this.service.changeDirectSettingsForCustomer(directPaymentMethod);
        }
    }
}