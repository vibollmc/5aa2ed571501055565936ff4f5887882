module NewWizard {
    "use strict";

    declare var define: any;

    declare var angular: any;

    declare var google: any;

    export class GoogleAddressDirective {

        constructor(private $parse: any, private $compile: any, private $timeout: any, private $document: any) {

        }

        restrict: string = 'A';
        require: string = '^ngModel';
        scope: Object = {
            model: '=ngModel',
            options: '=?',
            forceSelection: '=?',
            customPlaces: '=?',
            addressChanged: '&?',
            notAvailablePlace: '&?'
        }; 
        link = ($scope: any, element: any, attrs: any, controller: any) => {
            var keymap = {
                    tab: 9,
                    enter: 13,
                    esc: 27,
                    up: 38,
                    down: 40
                },
                hotkeys = [keymap.tab, keymap.enter, keymap.esc, keymap.up, keymap.down],
                autocompleteService = new google.maps.places.AutocompleteService(),
                placesService = new google.maps.places.PlacesService(element[0]);
            var document = this.$document;
            var compile = this.$compile;
            var timeout = this.$timeout;

            function initAutocompleteDrawer() {
                // Drawer element used to display predictions
                var drawerElement = angular.element('<div g-places-autocomplete-drawer></div>'),
                    body = angular.element(document[0].body),
                    $drawer;

                drawerElement.attr({
                    input: 'input',
                    query: 'query',
                    predictions: 'predictions',
                    active: 'active',
                    selected: 'selected'
                });

                $drawer = compile(drawerElement)($scope);
                body.append($drawer); // Append to DOM

                $scope.$on('$destroy', function() {
                    $drawer.remove();
                });
            }

            function initEvents() {
                element.bind('keydown', onKeydown);
                element.bind('blur', onBlur);
                element.bind('submit', onBlur);

                $scope.$watch('selected', select);
            }

            function initNgModelController() {
                controller.$parsers.push(parse);
                controller.$formatters.push(format);
                controller.$render = render;
            }

            ((() => {
                $scope.query = '';
                $scope.predictions = [];
                $scope.input = element;
                $scope.options = $scope.options || {};

                initAutocompleteDrawer();
                initEvents();
                initNgModelController();
            })());

            function clearPredictions() {
                $scope.active = -1;
                $scope.selected = -1;
                $scope.predictions = [];
            }

            function onKeydown(event) {
                if ($scope.predictions.length === 0 || indexOf(hotkeys, event.which) === -1) {
                    return;
                }

                event.preventDefault();

                if (event.which === keymap.down) {
                    $scope.active = ($scope.active + 1) % $scope.predictions.length;
                    $scope.$digest();
                } else if (event.which === keymap.up) {
                    $scope.active = ($scope.active ? $scope.active : $scope.predictions.length) - 1;
                    $scope.$digest();
                } else if (event.which === 13 || event.which === 9) {
                    if ($scope.forceSelection) {
                        $scope.active = ($scope.active === -1) ? 0 : $scope.active;
                    }

                    $scope.$apply(function() {
                        $scope.selected = $scope.active;

                        if ($scope.selected === -1) {
                            clearPredictions();
                        }
                    });
                } else if (event.which === 27) {
                    $scope.$apply(function() {
                        event.stopPropagation();
                        clearPredictions();
                    });
                }
            }

            function onBlur(event) {
                if ($scope.predictions.length === 0) {
                    return;
                }

                if ($scope.forceSelection) {
                    $scope.selected = ($scope.selected === -1) ? 0 : $scope.selected;
                }

                $scope.$digest();

                $scope.$apply(function() {
                    if ($scope.selected === -1) {
                        clearPredictions();
                    }
                });
            }

            function getAddrress(place) {
                if (place === null || place === undefined) {
                    return ""; 
                } 

                if (place.formatted_address) {
                    return place.formatted_address;
                }
                return ""; 
            }

            function select() {
                var prediction;

                prediction = $scope.predictions[$scope.selected];
                if (!prediction) return;

                if (prediction.is_custom) {
                    $scope.$apply(function () {
                        $scope.model = getAddrress(prediction.place);
                        if ($scope.addressChanged != undefined) {
                            $scope.addressChanged({ place: prediction.place });
                        }

                        $scope.$emit('g-places-autocomplete:select', prediction.place);
                        timeout(function() {
                            controller.$viewChangeListeners.forEach(function(fn) { fn(); });
                        });
                    });
                } else {
                    placesService.getDetails({ placeId: prediction.place_id }, function(place, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            $scope.$apply(function() {
                                $scope.model = getAddrress(place);;
                                if ($scope.addressChanged != undefined) {
                                    $scope.addressChanged({ place: place });
                                }
                                $scope.$emit('g-places-autocomplete:select', place);
                                timeout(function() {
                                    controller.$viewChangeListeners.forEach(function(fn) { fn(); });
                                });
                            });
                        }
                    });
                }

                clearPredictions();
            }

            function parse(viewValue) {
                var request; 
                if (!(viewValue && isString(viewValue))) return viewValue;

                $scope.query = viewValue;

                request = angular.extend({ input: viewValue }, $scope.options);
                autocompleteService.getPlacePredictions(request, function(predictions, status) {
                    $scope.$apply(function() {
                        var customPlacePredictions;

                        clearPredictions();

                        if ($scope.customPlaces) {
                            customPlacePredictions = getCustomPlacePredictions($scope.query);
                            $scope.predictions.push.apply($scope.predictions, customPlacePredictions);
                        }

                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            $scope.predictions.push.apply($scope.predictions, predictions);
                        }

                        if ($scope.predictions.length > 5) {
                            $scope.predictions.length = 5; // trim predictions down to size
                        }

                        if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS && $scope.notAvailablePlace) {
                            $scope.notAvailablePlace({ value: $scope.query});
                        }
                    });
                });

                if ($scope.forceSelection) {
                    return controller.$modelValue;
                } else {
                    return viewValue;
                }
            }

            function format(modelValue) {
                var viewValue = "";

                if (isString(modelValue)) {
                    viewValue = modelValue;
                } else if (isObject(modelValue)) {
                    viewValue = modelValue.formatted_address;
                }

                return viewValue;
            }

            function render() {
                return element.val(controller.$viewValue);
            }

            function getCustomPlacePredictions(query) {
                var predictions = [],
                    place,
                    match,
                    i;

                for (i = 0; i < $scope.customPlaces.length; i++) {
                    place = $scope.customPlaces[i];

                    match = getCustomPlaceMatches(query, place);
                    if (match.matched_substrings.length > 0) {
                        predictions.push({
                            is_custom: true,
                            custom_prediction_label: place.custom_prediction_label || '(Custom Non-Google Result)', // required by https://developers.google.com/maps/terms § 10.1.1 (d)
                            description: place.formatted_address,
                            place: place,
                            matched_substrings: match.matched_substrings,
                            terms: match.terms
                        });
                    }
                }

                return predictions;
            }

            function getCustomPlaceMatches(query, place) {
                var q = query + '', // make a copy so we don't interfere with subsequent matches
                    terms = [],
                    matched_substrings = [],
                    fragment,
                    termFragments,
                    i;

                termFragments = place.formatted_address.split(',');
                for (i = 0; i < termFragments.length; i++) {
                    fragment = termFragments[i].trim();

                    if (q.length > 0) {
                        if (fragment.length >= q.length) {
                            if (startsWith(fragment, q)) {
                                matched_substrings.push({ length: q.length, offset: i });
                            }
                            q = ''; // no more matching to do
                        } else {
                            if (startsWith(q, fragment)) {
                                matched_substrings.push({ length: fragment.length, offset: i });
                                q = q.replace(fragment, '').trim();
                            } else {
                                q = ''; // no more matching to do
                            }
                        }
                    }

                    terms.push({
                        value: fragment,
                        offset: place.formatted_address.indexOf(fragment)
                    });
                }

                return {
                    matched_substrings: matched_substrings,
                    terms: terms
                };
            }

            function isString(val) {
                return Object.prototype.toString.call(val) == '[object String]';
            }

            function isObject(val) {
                return Object.prototype.toString.call(val) == '[object Object]';
            }

            function indexOf(array, item) {
                var i, length;

                if (array === null) return -1;

                length = array.length;
                for (i = 0; i < length; i++) {
                    if (array[i] === item) return i;
                }
                return -1;
            }

            function startsWith(string1, string2) {
                return toLower(string1).lastIndexOf(toLower(string2), 0) === 0;
            }

            function toLower(string) {
                return (string === null) ? "" : string.toLowerCase();
            }
        }

        static factory() {
            var directive = ($parse, $compile, $timeout, $document) => {
                return new GoogleAddressDirective($parse, $compile, $timeout, $document);
            };

            directive['$inject'] = ['$parse', '$compile', '$timeout', '$document'];

            return directive;
        }
    }

    export class GooglePlacesAutocompleteDrawer {

        constructor(private $window: any, private $document: any) {

        }
        TEMPLATE = [
            '<div class="pac-container" ng-if="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\', width: position.width+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">',
            '  <div class="pac-item" g-places-autocomplete-prediction index="$index" prediction="prediction" query="query"',
            '       ng-repeat="prediction in predictions track by $index" ng-class="{\'pac-item-selected\': isActive($index) }"',
            '       ng-mouseenter="selectActive($index)" ng-click="selectPrediction($index)" role="option" id="{{prediction.id}}">',
            '  </div>',
            '</div>'
        ];

        restrict: string = 'A';
        scope: Object = {
            input: '=',
            query: '=',
            predictions: '=',
            active: '=',
            selected: '='
        };
        template: any = this.TEMPLATE.join('');

        link = ($scope, element) => {
            element.bind('mousedown', function (event) {
                event.preventDefault();  // prevent blur event from firing when clicking selection
            });
            var document = this.$document;
            var window = this.$window;
            function getDrawerPosition(element) {
                var domEl = element[0],
                    rect = domEl.getBoundingClientRect(),
                    docEl = document[0].documentElement,
                    body = document[0].body,
                    scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
                    scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

                return {
                    width: rect.width,
                    height: rect.height,
                    top: rect.top + rect.height + scrollTop,
                    left: rect.left + scrollLeft
                };
            }

            this.$window.onresize = () => {
                $scope.$apply(() => {
                    $scope.position = getDrawerPosition($scope.input);
                });
            };

            $scope.isOpen = () => ($scope.predictions.length > 0);

            $scope.isActive = index => ($scope.active === index);

            $scope.selectActive = index => {
                $scope.active = index;
            };

            $scope.selectPrediction = index => {
                $scope.selected = index;
            };

            $scope.$watch('predictions', () => {
                $scope.position = getDrawerPosition($scope.input);
            }, true);
        }

        static factory() {
            var directive = ($window, $document) => {
                return new GooglePlacesAutocompleteDrawer($window, $document);
            };

            directive['$inject'] = ['$window', '$document'];

            return directive;
        }
    }

    export class GooglePlacesAutocompletePrediction { 
        TEMPLATE = [
            '<span class="pac-icon pac-icon-marker"></span>',
            '<span class="pac-item-query" ng-bind-html="prediction | highlightMatched"></span>',
            '<span ng-repeat="term in prediction.terms | unmatchedTermsOnly:prediction">{{term.value | trailingComma:!$last}}&nbsp;</span>',
            '<span class="custom-prediction-label" ng-if="prediction.is_custom">&nbsp;{{prediction.custom_prediction_label}}</span>'
        ]; 

        restrict: string = 'A';
        scope: Object = {
            index: '=',
            prediction: '=',
            query: '='
        };
        template = this.TEMPLATE.join('');
    }
     
    export class HighlightMatched {
        constructor($sce: any) {
            return function (prediction): any {
                var matchedPortion = '',
                    unmatchedPortion = '',
                    matched;

                if (prediction.matched_substrings.length > 0 && prediction.terms.length > 0) {
                    matched = prediction.matched_substrings[0];
                    matchedPortion = prediction.terms[0].value.substr(matched.offset, matched.length);
                    unmatchedPortion = prediction.terms[0].value.substr(matched.offset + matched.length);
                }
                return $sce.trustAsHtml('<span class="pac-matched">' + matchedPortion + '</span>' + unmatchedPortion);
            };
        }
        static factory(): any {
            var filter = ($sce) => {
                return new HighlightMatched($sce);
            };
            filter['$inject'] = ['$sce'];
            return filter;
        }
    }

    export class UnmatchedTermsOnly {
        constructor() {
            return function (terms, prediction) {
                var i, term, filtered = [];
                for (i = 0; i < terms.length; i++) {
                    term = terms[i];
                    if (prediction.matched_substrings.length > 0 && term.offset > prediction.matched_substrings[0].length) {
                        filtered.push(term);
                    }
                } 
                return filtered;
            };
        } 
    }

    export class TrailingComma {
        constructor() {
            return function (input, condition) {
                return (condition) ? input + ',' : input;
            };
        }
    }

    define([
        "modules/wizard/shared/directives/address.directive",
        "/scripts/async.js!https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places",
    ], () => {
        return GoogleAddressDirective.factory();
    });
     
    var app = angular.module('address.directives', []);
    app.directive('gPlacesAutocompletePrediction', () => new GooglePlacesAutocompletePrediction());
    app.directive('gPlacesAutocompleteDrawer', ['$window', '$document', GooglePlacesAutocompleteDrawer.factory()]);
    app.directive('gPlacesAutocomplete', ['$parse', '$compile', '$timeout', '$document', GoogleAddressDirective.factory()]);
    app.filter('highlightMatched', ['$sce', HighlightMatched.factory()]);
    app.filter('unmatchedTermsOnly', () => new UnmatchedTermsOnly());
    app.filter('trailingComma', () => new TrailingComma());
} 