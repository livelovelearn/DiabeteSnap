(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(uname, pwd, callback) {

            /* var shaObj = new jsSHA("SHA-1", "TEXT");
            shaObj.update(pwd);
            var hash = shaObj.getHash("B64");
            var params = {"authCode": hash};
            var authApi = 'services/rest/1.0/auth/statuscheck';
            var config = {"TRANSACTION_ID": 123}

             $http({
                url: authApi,
                method: 'GET',
                params: params,
                headers: config
            })
                .success(function (response) {
                    callback(response.status);
                });*/
            var response = {};
            response.errorMessage = 'Success';
            callback(response);

        }

        function SetCredentials(uname, pwd) {
            var shaObj = new jsSHA("SHA-1", "TEXT");
            shaObj.update(pwd);
            var authdata = shaObj.getHash("B64");

            $rootScope.globals = {
                currentUser: {
                    authdata: authdata
                }
            };
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        }
    }
})();
