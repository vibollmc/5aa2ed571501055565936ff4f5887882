
module ModalDirective {
    'use strict';

    declare var angular;
    //var app = angular.module('Modal', []);
    
    export function ModalPopup() {
        //PaymentMethod.Module.Directives.directive("modal", ["$rootScope", ($rootScope) => {
        return {
            restrict: "E",
            templateUrl: "/scripts/app/shared/directives/modal/modal.view.html",
            //controller: ModalController,
            //controllerAs: 'modalCtrl',
            scope: {
                modalId: "@",
                title: "@",
                submitLabel: "@",
                closeLabel: "@",
                modalStyle: "=",
                modalData: "=",
                objectModel: "=",
                submitFunc: "&"
            },
            link: (scope: any, element: any, attrs: any) => {
                if (!scope.modalStyle) {
                    scope.modalStyle = new ModalStyle();
                }

                if (!scope.submitLabel) {
                    scope.submitLabel = "Submit";
                }

                if (!scope.closeLabel) {
                    scope.closeLabel = "Close";
                }

                scope.submit = function (isValid) {
                    if (isValid) {
                        scope.submitFunc();
                        element.find("#" + scope.modalId).modal("hide");
                    }
                }
            }
        }
    }

}