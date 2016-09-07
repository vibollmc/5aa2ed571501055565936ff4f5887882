module Main
{
    'use strict';

    export interface IApiService
    {
        login(): void;
    }

    export class ApiService implements IApiService
    {
        $timeout: any;
        $q: any;
        $http: any;

        static $inject = ["$http", "$timeout", "$q"];

        constructor($http:any, $timeout:any, $q:any)
        {
        }

        public login(): void
        {
            alert('login');
        }
    }
}
