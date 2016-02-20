(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/overview', {
                controller: 'OverviewController',
                templateUrl: 'overview.view.html'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login.view.html',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/login'});
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'AuthenticationService'];

    function run($rootScope, $location, $cookieStore, $http, AuthenticationService) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        $rootScope.$on('$locationChangeStart', function () {

            var restrictedPage = $location.path() === '/overview';
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }

            var authPage = $location.path() === '/login';
            if (authPage && loggedIn) {
                $location.path('/overview');
            }

            var logoutRequest = $location.path() === '/logout';
            if (logoutRequest) {
                AuthenticationService.ClearCredentials();
                $location.path('/login');
            }

        });
    }

})();
