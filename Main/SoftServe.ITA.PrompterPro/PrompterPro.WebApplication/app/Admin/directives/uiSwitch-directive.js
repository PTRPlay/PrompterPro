﻿app.directive('switch', function () {
    return {
        restrict: 'AE'
    , replace: true
    , transclude: true
    , template: function (element, attrs) {
        var html = '';
        html += '<span';
        html += ' class="switch' + (attrs.class ? ' ' + attrs.class : '') + '"';
        html += attrs.ngModel ? ' ng-click="' + attrs.ngModel + '=!' + attrs.ngModel + (attrs.ngChange ? '; ' + attrs.ngChange + '()"' : '"') : '';
        html += ' ng-class="{ checked:' + attrs.ngModel + ' }"';
        html += '>';
        html += '<small></small>';
        html += '<input type="checkbox"';
        html += attrs.id ? ' id="' + attrs.id + '"' : '';
        html += attrs.name ? ' name="' + attrs.name + '"' : '';
        html += attrs.ngModel ? ' ng-model="' + attrs.ngModel + '"' : '';
        html += ' style="display:none" />';
        html += '</span>';
        return html;
    }
    }
});
