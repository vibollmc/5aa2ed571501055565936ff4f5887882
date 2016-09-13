
module NetworkCustomer {
    'use strict';

    export enum PaymentMethodType {
        POSTPAID = 2,
        CREDIT_CARD = 1,
        PAYPAL = 30
    }

    export interface IPostpaidPaymentModel {
        CreditLimit: IMoney;
        SettlementDay: number;
        PostpaidAccountId: string;
        IsUseDefaultSettings: boolean;

        updateFrom(defaultSettings: IPostpaidPaymentModel): void;
    }

    export interface IDirectPaymentModel {
        SpendLimit: IMoney;
        BufferThreshold: IMoney;
        MaxDays: number;
        IsMaxAgeUsed: boolean;
        IsFirstTimeCharged: boolean;
        IsUseDefaultSettings: boolean;

        PaymentMethodId: string;
        updateFrom(defaultSettings: IDirectPaymentModel): void;
    }

    export interface IMoney {
        Value: number;
        Symbol: string;
    }

    export class Money {
        Value: number;
        Symbol: string;

        constructor(value: number, symbol: string) {
            this.Value = value;
            this.Symbol = symbol;
        }
    }

    export class DirectPaymentModel implements IDirectPaymentModel {
        SpendLimit: IMoney;
        BufferThreshold: IMoney;
        MaxDays: number;
        IsMaxAgeUsed: boolean;
        IsFirstTimeCharged: boolean;
        IsUseDefaultSettings: boolean;

        PaymentMethodId: string;
        //WalletSettingId: string;

        constructor();
        constructor(setting: any);
        constructor(setting?: any) {
            if (setting) {
                this.SpendLimit = new Money(setting.SpendLimit.Value, setting.SpendLimit.Symbol) ;
                this.BufferThreshold = new Money(setting.BufferThreshold.Value, setting.BufferThreshold.Symbol);
                this.MaxDays = setting.MaxDays;
                this.IsMaxAgeUsed = setting.IsMaxAgeUsed;
                this.IsFirstTimeCharged = setting.IsFirstTimeCharged;
                this.IsUseDefaultSettings = setting.IsUseDefaultSettings == null ? false : setting.IsUseDefaultSettings;
                this.PaymentMethodId = setting.PaymentMethodId;
            } else {
                this.SpendLimit = new Money(0, "SGD");
                this.BufferThreshold = new Money(0, "SGD");
                this.MaxDays = 0;
                this.IsMaxAgeUsed = false;
                this.IsFirstTimeCharged = false;
                this.IsUseDefaultSettings = true;
            }
        }

        public updateFrom(defaultSettings: IDirectPaymentModel): void {
            this.SpendLimit = new Money(defaultSettings.SpendLimit.Value, defaultSettings.SpendLimit.Symbol);
            this.BufferThreshold = new Money(defaultSettings.BufferThreshold.Value, defaultSettings.BufferThreshold.Symbol);
            this.IsMaxAgeUsed = defaultSettings.IsMaxAgeUsed;
            this.IsFirstTimeCharged = defaultSettings.IsFirstTimeCharged;
            this.MaxDays = defaultSettings.MaxDays;
        }
    }

    export class PostpaidPaymentModel implements IPostpaidPaymentModel {
        CustomerId: string;
        CreditLimit: any;
        SettlementDay: number;
        IsUseDefaultSettings: boolean;

        PostpaidAccountId: string;
        //WalletSettingId: string;

        constructor();
        constructor(setting: any);
        constructor(setting?: any) {
            if (setting) {
                this.CreditLimit = new Money(setting.CreditLimit.Value, setting.CreditLimit.Symbol);
                this.SettlementDay = setting.SettlementDay;
                this.IsUseDefaultSettings = setting.IsUseDefaultSettings == null ? false : setting.IsUseDefaultSettings;
                this.PostpaidAccountId = setting.PostpaidAccountId;
            } else {
                this.CreditLimit = new Money(0, "SGD");
                this.SettlementDay = 1;
                this.IsUseDefaultSettings = true;
            }
        }

        public updateFrom(settings: IPostpaidPaymentModel): void {
            this.CreditLimit = new Money(settings.CreditLimit.Value, settings.CreditLimit.Symbol);
            this.SettlementDay = settings.SettlementDay;
        }
    }
}
