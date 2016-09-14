module Wallet {
    'use strict';

    declare var toastr: any;

    export interface IWalletModel {
        wallet: any;    // The wallet setting info
        getWalletSetting(): any;
        saveWalletSetting(): void;   // Return wallet setting id
    }

    export class WalletModel implements IWalletModel {
        $q: any;
        service: IWalletService;
        wallet: any;

        static $inject = ["$q", "WalletService"];

        constructor($q, service) {
            this.$q = $q;
            this.service = service;
        }

        public getWalletSetting() {
            var defer = this.$q.defer();
            this.service.getWalletSetting()
                .success((data) => {
                    this.wallet = data.Data;
                    defer.resolve(data);
                });
            return defer.promise;
        }

        public saveWalletSetting() {
            this.service.saveWalletSetting(this.wallet)
                        .success((data) => {
                            this.wallet.Id = data.Data;
                            toastr.success("Save successful", "Success");
                        });
        }
    }
}