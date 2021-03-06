// A N G U L A R   C O N T R O L L E R 
app.controller('SessionController', ['$scope', '$http', '$window', '$env', '$location', function ($scope, $http, $window, $env, $location) {

    $scope.back = function () {
        $window.history.back();
    };

    $scope.home = function () {
        if ($scope.session.user.userType === "admin") {
            console.log("Got this message");
            $location.path("/admin");
        } else if ($scope.session.user.userType === "volunteer") {
            $location.path("/home");
        } else {
            console.log("This is an error Check How Are you seeing this");
        }
    };

    $scope.getSession = function () {
        if ($scope.session !== undefined && $scope.session.user !== undefined) {
            console.log("Remebered Session");
        } else
            $http({

                method: 'GET',
                url: $env.apiRoot + 'UserAPI/getSession'

            }).then(function (response) {
                // on success
                $scope.session = new Object();
                $scope.session.user = response.data;
                if (!$scope.session.user) {
                    //This needs to be set up later
                    console.log("Error in User Controller #0000", response.data, response.status);
                } else {
                    console.log("Session was Gained From Server");
                }
            }, function (response) {
                // on error
                console.log("Error in User Controller #0001", response.data, response.status);
                $location.path("/");
            });
    };

    (function () {
        //This is the init method. It will run when the controller is loaded
        $scope.getSession();
    })();

}]);