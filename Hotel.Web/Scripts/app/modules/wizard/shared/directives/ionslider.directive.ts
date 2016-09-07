module NewWizard {
    "use strict";

    declare var define: any;

    declare var angular: any;

    declare var requirejs: any;

    class IonDirective {
        constructor() { 
            return this.createDirective();
        }

        private createDirective(): any {
            return {
                restrict: 'E',
                scope: {
                    min: '=',
                    max: '=',
                    fromMin: '=',
                    toMax: '=',
                    type: '@',
                    prefix: '@',
                    maxPostfix: '@',
                    prettify: '=',
                    grid: '@',
                    gridMargin: '@',
                    postfix: '@',
                    step: '@',
                    hideMinMax: '@',
                    hideFromTo: '@',
                    from: '=',
                    to: '=',
                    disable: '=',
                    onChange: '=',
                    onFinish: '=',
                    values: '='

                },
                template: '<div></div>',
                replace: true,
                link: ($scope, $element, attrs: any) => { 

                    $element.ionRangeSlider({
                        min: $scope.min,
                        max: $scope.max,
                        from_min: $scope.fromMin,
                        to_max: $scope.toMax,
                        type: $scope.type,
                        prefix: $scope.prefix,
                        maxPostfix: $scope.maxPostfix,
                        prettify: $scope.prettify,
                        grid: $scope.grid,
                        gridMargin: $scope.gridMargin,
                        postfix: $scope.postfix,
                        step: $scope.step,
                        hideMinMax: $scope.hideMinMax,
                        hideFromTo: $scope.hideFromTo,
                        from: $scope.from,
                        to: $scope.to,
                        disable: $scope.disable,
                        onChange: $scope.onChange,
                        onFinish: $scope.onFinish,
                        values: $scope.values
                    }); 

                    $scope.$watch('fromMin', value => {
                        $element.data("ionRangeSlider").update({ from_min: value });
                        $element.data("ionRangeSlider").reset();
                    });
                    $scope.$watch('toMax', value => {
                        $element.data("ionRangeSlider").update({ to_max: value });
                        $element.data("ionRangeSlider").reset();
                    });
                    $scope.$watch('from', value => {
                        $element.data("ionRangeSlider").update({ from: value });
                        $element.data("ionRangeSlider").reset();
                    });
                    $scope.$watch('to', value => {
                        $element.data("ionRangeSlider").update({ to: value });
                        $element.data("ionRangeSlider").reset();
                    });

                    $scope.$watch('disable', value => {
                        setTimeout(() => { $element.data("ionRangeSlider").update({ disable: value }); });
                    });

                }

            };
        }

    } 

    define([
        "rangeSlider"
    ], () => {
        var app = angular.module('ionslider.directives', []);
        app.directive('ionslider', () => new IonDirective());
    });


}

  