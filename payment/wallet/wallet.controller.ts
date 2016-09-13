module Wallet {
    'use strict';

    declare var toastr: any;

    export class WalletController {
        $rootScope: any;
        $scope: any;
        $state: any;

        suffixDay: string;

        vm: IWalletModel;

        static $inject = ["$rootScope", "$scope", "$state", "WalletModel"];

        constructor($rootScope: any, $scope: any, $state: any, walletModel: IWalletModel) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.vm = walletModel;

            this.getWalletSetting();
        }

        public getWalletSetting() {
            var _me = this;
            return this.vm.getWalletSetting();
                //.then(() => {
                //    _me.$scope.$watch(() => _me.vm.wallet.PostpaidAccountSettings.SettlementDay,
                //        () => { _me.getDaySuffix(_me.vm.wallet.PostpaidAccountSettings.SettlementDay); });
                //});
        }

        public saveWalletSetting(isValid: boolean) {
            
            if (isValid) {
                return this.vm.saveWalletSetting();
            } else {
                toastr.error("Setting is not valid", "Error");
            }
        }

        private getDaySuffix(day) {
            var suffix = (day % 10 === 1 && day !== 11) ? "st" :
                (day % 10 === 2 && day !== 12) ? "nd" :
                    (day % 10 === 3 && day !== 13) ? "rd" : "th";

            this.suffixDay = suffix + ' day of the month';
        }
    }
}