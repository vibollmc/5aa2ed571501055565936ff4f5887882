module NetworkCustomer {
    'use strict';
    declare var moment: any;
    declare var toastr: any;

    export interface ICustomerModel {
        networkUsers: any;
        paymentMethods: any;
        searchCriteria: any;
        getNetworkUsers(searchCriteria: any): void;
        getSearchCriteriaData(): any;
        exportCSV(userSearchCriteria: any, exportAllField: boolean): any;
    }

    export interface HTMLAnchorElement {
        download: string;
    }


    export class CustomerInformation {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        imageUrl: string;
        mobile: string;
        registerAt: Date;
    }

    export class Paging {
        pageSize: string;
        currentPage: number;
        totalRecord: number;

        constructor() {
            this.pageSize = "10";
            this.currentPage = 1;
            this.totalRecord = 0;
        }
    }

    export class CustomerModel implements ICustomerModel {
        $q: any;
        service: ICustomerService;
        searchCriteria: any;
        networkUsers: any;
        paymentMethods: any;
        paging: Paging;

        static $inject = ["$q", "CustomerService"];

        constructor($q, service) {
            this.$q = $q;
            this.service = service;
            this.paging = new Paging();
        }

        public getNetworkUsers(searchCriteria: any) {
            searchCriteria.PageSize = parseInt(this.paging.pageSize, 10);
            searchCriteria.PageIndex = this.paging.currentPage;
            this.service.getNetworkUsers(searchCriteria)
                .then((data) => {
                    this.networkUsers = data.Result;
                    this.paging.totalRecord = data.TotalRecords;
                });
        }

        public getSearchCriteriaData() {
            var defer = this.$q.defer();

            this.service.getSearchCriteriaData()
                .then((data) => {
                    this.searchCriteria = data;
                    this.searchCriteria.SelectedColumns = this.getDefaultSelectedColumns(this.searchCriteria.Columns);
                    defer.resolve(this.searchCriteria);
                });

            return defer.promise;
        }

        public exportCSV(userSearchCriteria: any, exportAllField: boolean) {
            var defer = this.$q.defer();

            this.service.exportCSV(userSearchCriteria, exportAllField)
                .then((data) => {
                    if (data.TotalRow <= 0) {
                        toastr.warning("No data to export.");
                        return false;
                    }
                    var blob = new Blob([data.FileContent], { type: 'text/csv' });

                    if (window.navigator.msSaveOrOpenBlob) { // For IE
                        navigator.msSaveBlob(blob, data.FileName);
                    } else {
                        var url = window.URL.createObjectURL(blob);

                        var hiddenElement = document.createElement('a');
                        hiddenElement.href = url;
                        hiddenElement.target = '_blank';
                        hiddenElement.setAttribute("download", data.FileName);
                        hiddenElement.click();
                    }

                    defer.resolve(data);
                });

            return defer.promise;
        }

        private getDefaultSelectedColumns(allColumns: any) {
            var selectedColumns = [];
            if (!allColumns) {
                return selectedColumns;
            }

            for (var i = 0; i < allColumns.length; i++) {
                var column = allColumns[i];
                if (column) {
                    if (column.DefaultSelected && column.DefaultSelected == true) {
                        selectedColumns.push(column.PropertyId);
                    }
                }
            }
            return selectedColumns;
        }
    }
}