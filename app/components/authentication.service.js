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
            var shaObj = new jsSHA("SHA-1", "TEXT");
            shaObj.update(pwd);
            var hash = shaObj.getHash("B64");
            var params = {
                'apiKey': 'rWXeTPz4_S4x1W1pRl9v9dLjZrzcMpWc',
                'q': '{"username":"' + uname + '","pwd":"' + hash + '"}"',
                'f': '{"patientId": 1}"',
                'l': 1
            };
            var authApi = 'https://api.mlab.com/api/1/databases/diabetesnap-db/collections/Profile';
            $http({
                url: authApi,
                method: 'GET',
                params: params
            }).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                callback(response.data);
            });
        }

        function SetCredentials(uname, pwd, pid) {
            var shaObj = new jsSHA("SHA-1", "TEXT");
            shaObj.update(pwd);
            var authdata = shaObj.getHash("B64");

            $rootScope.globals = {
                currentUser: {
                    authdata: authdata
                },
                _pid : pid
            };
            console.log($rootScope.globals);
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        }
    }
})();
