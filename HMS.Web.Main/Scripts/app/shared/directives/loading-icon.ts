﻿module Main {
    'use strict';
    declare var $: any;

    export function display_loading_icon() {
        $("body .fh-breadcrumb").append('<div class="loading-icon-wrapper"><i class="fa fa-spinner fa-spin"></i></div>');
    }

    export function remove_loading_icon() {
        $("body .fh-breadcrumb > .loading-icon-wrapper").remove();
    }
}