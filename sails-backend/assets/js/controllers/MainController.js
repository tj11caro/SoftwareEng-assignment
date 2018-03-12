app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

    //This function populates the userAccounts variable with all the user accounts in our current test Users table. 
    $scope.getUserAccounts = function () {
        $http.get("/UserAPI/getUserAccounts")
            .then(function (response) {
                $scope.userAccounts = response.data.users;
            });
    };

    //This function currently takes in a pidm, and a username/email and writes the username/email to the pidm's prospect in the database. 
    //It then refreshes prospects variable with the getProspects() function 
    $scope.postAssignUser = function (pidmParam, userParam) {
        $http.post(
            "/VounteerAPI/postAssignUser", {
                'pidm': pidmParam,
                'user': userParam
            }
        ).success(function (data) {
            $scope.getProspects();
        });
    };

    $scope.getUserProspects = function () {
        $http.get("/VolunteerAPI/getUserProspects")
            .then(function (response) {
                // console.log(response);
                $scope.prospects = response.data;
            });
    };

    $scope.getProspects = function () {
        $http.get("/UserAPI/getProspects")
            .then(function (response) {
                // console.log(response);
                $scope.prospects = response.data;
            });
    };

    $scope.importExcel = function () {

    }

}]);

