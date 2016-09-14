module NetworkCustomer {
    'use strict';

    //export class LabelCase {
    //    public static Factory() {
    //        return function(input) : string {
    //            input = input.replace(/(A-Z)/g, '$1');
    //            return input[0].toUpperCase() + input.slice(1);
    //        }
    //    }
    //}

    //export class jsonDate {
    //    public static Factory($filter: any) {
    //        return function (input, format): string {
    //            return $filter("date")(parseInt(input.substr(6)), format);
    //        }
    //    }
    //}

    //NetworkCustomer.Module.Filters.filter("labelCase", [LabelCase.Factory]);
    //NetworkCustomer.Module.Filters.filter("jsonDate", ['$filter', Main.jsonDate.Factory]);
   
    export class CustomerController {
        $scope: any;
        $state: any;
        customerModel: ICustomerModel;
        selectedUser: any;

        static $inject = ["$scope", "$state", "CustomerModel"];

        constructor($scope: any, $state: any, customerModel: ICustomerModel) {
            this.$scope = $scope;
            this.$state = $state;
            this.customerModel = customerModel;
            this.pageInit();
        }

        public selectUser(selectUser : any) {
            this.selectedUser = selectUser;
        }

        public keyPress(event) {
            if (event.which === 13) {
                this.getNetworksUser();
            }
        }

        public exportAll() {
            this.customerModel.exportCSV(this.customerModel.searchCriteria, true);
        }

        public getNetworksUser() {
            this.customerModel.getNetworkUsers(this.customerModel.searchCriteria);
        }

        public pageInit() {
            this.customerModel.getSearchCriteriaData().then((data) => {
                this.customerModel.searchCriteria.PageSize = "10";
                this.customerModel.searchCriteria.PageIndex = 1;
                this.getNetworksUser();
            });
        }
    }
}