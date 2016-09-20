﻿module Main {
    'use strict';
    declare var $: any;
    export function DirectiveSlimscroll($timeout) {

        return {
            restrict: 'A',
            link: (scope, element, attrs) => {
                $timeout(() => {
                    var h = $(".page-headings").outerHeight();
                    $(".fh-breadcrumb").css("height", "calc(100% - " + h + "px)");

                    element.slimscroll(JSON.parse(attrs.slimscroll));
                });
            }
        }

    }
}
