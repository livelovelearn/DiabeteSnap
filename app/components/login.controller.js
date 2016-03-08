(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService'];
    function LoginController($location, AuthenticationService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.uname, vm.pwd, function (response) {
                console.log(response)
                if (typeof response !== 'undefined' && response.length) {
                    AuthenticationService.SetCredentials(vm.pwd, vm.uname);
                    $location.path('/pages/overview');
                }
                else if (typeof response !== 'undefined' && !response.hasOwnProperty('patientId')) {
                    vm.dataLoading = false;
                    vm.error = 'Invalid credentials';
                }
                else {
                    vm.dataLoading = false;
                    vm.error = 'Please try again later. We are unable process your request';
                }
            });
        };
    }
})();
