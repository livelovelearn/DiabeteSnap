(function () {
    'use strict';

    angular
        .module('app')
        .controller('OverviewController', function ($scope, $cookieStore, $http) {
            $scope.loading = true;
            $scope.date = new Date();
            $scope.patient = {};

            var pid = $cookieStore.get('globals')._pid;

            var fhirPatientApi = 'http://polaris.i3l.gatech.edu:8080/gt-fhir-webapp/base/Patient/' + pid;
            $http({
                url: fhirPatientApi,
                method: 'GET'
            }).then(function successCallback(response) {
                $scope.patient = response.data;
            }, function errorCallback(response) {
            });

        });
})();

