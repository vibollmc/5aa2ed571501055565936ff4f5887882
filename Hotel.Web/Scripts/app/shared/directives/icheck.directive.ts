﻿module Main {
    'use strict';
    declare var $: any;
    export function DirectiveIcheck($timeout) {

        return {
            link: function (scope, element, attrs) {
                return $timeout(function () {
                    if (attrs.ngClick) {
                        $(element).on('ifToggled', function (event) {
                            $(element).click();
                        });
                    }

                    return $(element).iCheck(JSON.parse(attrs.icheck));
                });
            }
        };

    }
}
