app.directive('myEnter', function() {
    return function(scope, element, attrs) {
        element.on("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});