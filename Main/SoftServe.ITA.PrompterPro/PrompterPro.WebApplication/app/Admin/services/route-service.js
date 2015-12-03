app.config(
[
    '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/Admin/Users',
            {
                templateUrl: '/Admin/Users',
                controller: 'usersController'
            })
            .when('/Admin/Diagnostics',
            {
                templateUrl: '/Admin/Diagnostics',
                controller: 'diagnosticsController'
            })
            .when("/Admin/UserActivity",
            {
                templateUrl: "/Admin/UserActivity",
                controller: "userActivityController"
            })
            .when("/Admin/Actors",
            {
                templateUrl: "/Admin/Actors",
                controller: "actorsAdminController"
           })
        ;

        $locationProvider.html5Mode(false).hashPrefix('!');

    }
]);