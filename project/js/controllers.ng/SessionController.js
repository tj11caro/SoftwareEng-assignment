// A N G U L A R   C O N T R O L L E R 
app.controller('SessionController', ['$scope', '$http', '$window', '$env', function ($scope, $http, $window, $env) {

    $scope.getSession = function () {
        $http({

            method: 'GET',
            url: $env.apiRoot + 'UserAPI/getSession'

        }).then(function (response) {
            // on success
            $scope.session = new Object();
            $scope.session.user = response.data;
            if (!$scope.session.user) {
                //This needs to be set up later
                // $window.location.href = '/login.html';
                console.log("Redirect May Not implemented ERR#0404");
                console.log("Error in User Controller #0000", response.data, response.status);
            } else {
                console.log("Session was Gained From Server");
            }
        }, function (response) {
            // on error
            console.log("Redirect May Not implemented ERR#0403");
            console.log("Error in User Controller #0001", response.data, response.status);
            $window.location.href = '/';

        });
    };

    (function () {
        //This is the init method. It will run when the controller is loaded
        $scope.getSession();
    })();

}]);