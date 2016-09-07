module Main {
    'use strict';

    export class jsonDate {
        public static Factory($filter: any) {
            return function (input, format): string {
                return $filter("date")(parseInt(input ? input.substr(6) : ''), format);
            }
        }
    }

    //declare var define: any;

    //define(["angular"], function (angular) {

    //    return ["$filter", function ($filter) {
    //        return function (input, format) {
    //            return $filter('date')(parseInt(input.substr(6)), format);
    //        };
    //    }
    //    ];
    //});
}

