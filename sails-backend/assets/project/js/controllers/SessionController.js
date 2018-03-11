// A N G U L A R   C O N T R O L L E R 
app.controller('SessionController', ['$scope', '$http', function ($scope, $http) {

    $scope.getSession = function (callback) {
        if ($scope.user) {
            //This line may never be excuted because GetMe is traditionally an init me
            console.log("Session was Remember on Client");
        } else {
            $http({

                method: 'GET',
                url: '/User/getSession'

            }).then(function (response) {
                // on success
                console.log("Session was Gained From Server");
                $scope.user = response.data.user;
                if (!$scope.user) {
                    //This needs to be set up later
                    $window.location.href = '/';
                    Console.log("Redirect May Not implemented ERR#0404");
                    console.log("Error in User Controller #0000", response.data, response.status);
                }


                // This Could be a Vulnerablity Vul#001
                eval("var runnable = function(){ $scope." + callback + "; }; runnable()");
            }, function (response) {
                // on error
                $window.location.href = '/';
                Console.log("Redirect May Not implemented ERR#0403");
                console.log("Error in User Controller #0001", response.data, response.status);

            });
        }
    };



}]);