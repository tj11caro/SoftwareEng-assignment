angular.module('MainModule').controller('MainController', ['$scope', '$http', function ($scope, $http) {

    //This function populates the userAccounts variable with all the user accounts in our current test Users table. 
    $scope.getUserAccounts = function () {
        $http.get("/admin/list")
            .then(function (response) {
                // console.log(response);
                // console.log(response.data.data);
                $scope.userAccounts = response.data.data;
            });
    };

    //This function currently takes in a pidm, and a username/email and writes the username/email to the pidm's prospect in the database. 
    //It then refreshes prospects variable with the getProspects() function 
    $scope.assign = function (pidmParam, userParam) {
        $http.post(
            "../js/ajax/php/assignUser.php", {
                'pidm': pidmParam,
                'user': userParam
            }
        ).success(function (data) {
            $scope.getProspects();
        });
    };

    //This was the first function I wrote that interfaced with the database. It just grabs a title databas
    $scope.getTitle = function () {
        $http.get("../js/ajax/php/getTitle.php")
            .then(function (response) {
                $scope.title = response.data;
                $scope.title = $scope.title[0].TestTextData;
            });
    };

    $scope.getUsers = function () {
        $http({

            method: 'GET',
            url: ''

        }).then(function (response) {
            console.log(response);
            // on success
            $scope.users = response.data;

        }, function (response) {
            console.log(response);
            // on error
            console.log(response.data, response.status);

        });
    };

    $scope.getProspects = function () {
        $http.get("/admin/list")
            .then(function (response) {
                // console.log(response);
                $scope.prospects = response.data;
            });
    };


    //I Don't Think This Should Be getting used since we are using single pages
    $scope.setPage = function (page) {
        $scope.activePage = "../templates/p/admin/" + page;
    };

}]);

