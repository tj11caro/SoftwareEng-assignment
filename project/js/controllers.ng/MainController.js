app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

    //This function populates the userAccounts variable with all the user accounts in our current test Users table. 
    $scope.getUserAccounts = function () {
        $http.get("http://oraserv.cs.siena.edu:2000/UserAPI/getUserAccounts")
            .then(function (response) {
                console.log(response.data);
                $scope.userAccounts = response.data;
            });
    };

    //This function currently takes in a pidm, and a username/email and writes the username/email to the pidm's prospect in the database. 
    //It then refreshes prospects variable with the getProspects() function 
    $scope.postAssignUser = function (pidmParam, userParam) {
        $http.post(
            "http://oraserv.cs.siena.edu:2000/VounteerAPI/postAssignUser", {
                'pidm': pidmParam,
                'user': userParam
            }
        ).success(function (data) {
            $scope.getProspects();
        });
    };

    $scope.getUserProspects = function () {
        $http.get("http://oraserv.cs.siena.edu:2000/VolunteerAPI/getUserProspects")
            .then(function (response) {
                // console.log(response);
                $scope.prospects = response.data;
            });
    };

    $scope.getProspects = function () {
        console.log("Whart");
        $http.get("http://oraserv.cs.siena.edu:2000/AdminAPI/getProspects")
            .then(function (response) {
                console.log(response);
                $scope.prospects = response.data;
            });
    };

}]);

