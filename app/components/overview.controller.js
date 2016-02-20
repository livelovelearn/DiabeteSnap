(function () {
    'use strict';

    angular
        .module('app')
        .controller('OverviewController', function ($scope, $http) {
            $scope.loading = true;

            $scope.date = new Date();

            /*
             var config = {
             "TRANSACTION_ID": 123
             }

             $http({
             url: "services/rest/1.0/release/info",
             method: 'GET',
             headers: config
             }).success(function (response) {

             });
             */

        });
})();

