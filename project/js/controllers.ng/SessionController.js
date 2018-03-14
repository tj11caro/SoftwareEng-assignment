// A N G U L A R   C O N T R O L L E R 
app.controller('SessionController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.getSession = function () {
        if ($scope.user) {
            //This line may never be excuted because GetMe is traditionally an init me
            console.log("Session was Remember on Client");
        } else {
            $http({

                method: 'GET',
                url: 'htpp://oraserv.cs.siena.edu:2000/UserAPI/getSession'

            }).then(function (response) {
                // on success
                console.log("Session was Gained From Server");
                $scope.session = new Object();
                $scope.session.user = response.data.user;
                if (!$scope.session.user) {
                    //This needs to be set up later
                    // $window.location.href = '/project/login.html';
                    console.log("Redirect May Not implemented ERR#0404");
                    console.log("Error in User Controller #0000", response.data, response.status);
                }
            }, function (response) {
                // on error
                // $window.location.href = '/project/login.html';
                console.log("Redirect May Not implemented ERR#0403");
                console.log("Error in User Controller #0001", response.data, response.status);

            });
        }
    };

}]);