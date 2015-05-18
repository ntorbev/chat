'use strict';
app.directive('ngContextMenu', function ($parse) {
    var renderContextMenu = function ($scope, event, options) {
        if (!$) { var $ = angular.element; }
        $(event.currentTarget).addClass('context');
        var __contextMenu = $('<div>');
        var __ul = $('<ul>');

        __contextMenu.addClass('dropdown clearfix');
        __ul.addClass('dropdown-menu');
        __ul.attr({ 'role': 'menu' });
        __ul.css({
            display: 'block',
            position: 'absolute',
            left: event.pageX + 'px',
            top: event.pageY + 'px'
        });
        angular.forEach(options, function (item, i) {
            if($scope.socketId!=event.target.id && item !== null && item[0]=="Log Out") var flag=false;

            if (typeof flag === 'undefined') {
                var __li = $('<li>');
                if (item === null) {
                    __li.addClass('divider');
                } else {
                    var __a = $('<span>');
                    __a.attr({ tabindex: '-1' });
                    __a.text(item[0]);
                    __li.append(__a);
                    __li.on('click', function () {
                        $scope.$apply(function () {
                            item[1].call($scope, $scope);
                        });
                    });
                }
                __ul.append(__li);
            }
        });
        __contextMenu.append(__ul);
        __contextMenu.css({
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999
        });
        $(document).find('body').append(__contextMenu);
        __contextMenu.on("click", function (e) {
            $(event.currentTarget).removeClass('context');
            __contextMenu.remove();
        }).on('contextmenu', function (event) {
            $(event.currentTarget).removeClass('context');
            event.preventDefault();
            __contextMenu.remove();
        });
    };
    return function ($scope, element, attrs) {
        element.on('contextmenu', function (event) {
            $scope.$apply(function () {
                event.preventDefault();
                renderContextMenu($scope, event, $scope.$eval(attrs.ngContextMenu))
            });
        });
    };
});