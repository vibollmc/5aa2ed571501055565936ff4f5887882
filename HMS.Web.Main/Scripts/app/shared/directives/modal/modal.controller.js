var ModalDirective;
(function (ModalDirective) {
    'use strict';
    //var app = angular.module('Modal', []);
    function ModalPopup() {
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
            link: function (scope, element, attrs) {
                if (!scope.modalStyle) {
                    scope.modalStyle = new ModalDirective.ModalStyle();
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
                };
            }
        };
    }
    ModalDirective.ModalPopup = ModalPopup;
})(ModalDirective || (ModalDirective = {}));
//# sourceMappingURL=modal.controller.js.map