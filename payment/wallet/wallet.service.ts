/// <reference path="../../../../RocketUncle.Frontend.Main/app/shared/services/api.service.d.ts" />

module Wallet {
    'use strict';

    export interface IWalletService {
        getWalletSetting(): any;    // Return IWalletSettingInfo object from server
        saveWalletSetting(data: any): any;   // Return wallet setting id
    }

    export class WalletService implements IWalletService {
        $timeout: any;
        $q: any;
        $http: any;
        apiService: Main.IApiService;
        apiAddresses: any;

        static $inject = ["$http", "$timeout", "$q", "ApiService", "ApiAddresses"];

        constructor($http: any, $timeout: any, $q: any, apiService: Main.IApiService, apiAddresses: any) {
            this.$http = $http;
            this.apiService = apiService;
            this.apiAddresses = apiAddresses;
        }

        public getWalletSetting() {
            return this.$http.get(this.apiAddresses.GET_WALLET_SETTING);
        }

        public saveWalletSetting(data: any) {
            return this.$http.post(this.apiAddresses.SAVE_WALLET_SETTING, data);
        }
    }
}