﻿module Main {
    'use strict';
    declare var $: any;
    export function DirectivePerfectscroll($timeout) {

        return {
            link: function (scope, element, attrs) {
                return $timeout(function () {
                    return $(element).perfectScrollbar({useSelectionScroll: true});
                });
            }
        };

    }
}
