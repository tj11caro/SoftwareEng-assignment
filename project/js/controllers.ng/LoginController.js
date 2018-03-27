// A N G U L A R   C O N T R O L L E R 
app.controller('LoginController', ['$scope', '$http', '$window', '$location', '$env', function ($scope, $http, $window, $location, $env) {
    console.log(" .ng");

    $scope.submitLogin = function () {
        $http.post(
            $env.apiRoot + 'UserAPI/login', {
                'email': $scope.email,
                'password': $scope.password,
            }).then(function (response) {
                // on success
                $scope.session = new Object();
                $scope.session.user = response.data;
                console.log(response.data);
                console.log($scope.session.user);
                if ($scope.session.user.userType === "admin") {
                    console.log("Got this message");
                    $location.path("/admin");
                } else if ($scope.session.user.userType === "volunteer") {
                    $location.path("/user");
                } else {
                    console.log("This is an error Check How Are you seeing this");
                }
            }, function (response) {
                // on error
                $location.path("/");
                console.log("Redirect May Not implemented ERR#0403");
                console.log("Error in Login Controller #0001", response.data, response.status);
            });
    };

    $scope.logout = function () {
        $http({

            method: 'GET',
            url: $env.apiRoot + 'UserAPI/logout'

        }).then(function (response) {
            // on success
            $scope.session = new Object();
            $location.path("/");

        }, function (response) {
            // on error
            $location.path("/");
            console.log("Error in User Controller #0001", response.data, response.status);
        });
    };

    $scope.submitSignUp = function () {
        $http.post(
            $env.apiRoot + "UserAPI/signup", {
                'vpassword': $scope.volunteer.password,
                'vemail': $scope.volunteer.email,
                'fname': $scope.volunteer.fname,
                'lname': $scope.volunteer.lname,
                'vpidm': $scope.volunteer.pidm,
            }
        ).then(function (response) {
            // on success
            //! This should really redirect to a Success Page
            $location.path("/");
        }, function (response) {
            // on error                
            $location.path("/");
            console.log("Redirect May Not implemented ERR#0403");
            console.log("Error in Login Controller #0002", response.data, response.status);
        });
    };

    $scope.submitNewAdmin = function () {
        $http.post(
            $env.apiRoot + "/UserAPI/createAdmin", {
                'email': $scope.admin.email,
                'fname': $scope.admin.fname,
                'lname': $scope.admin.lname,
                'pidm': $scope.admin.pidm,
                'password': $scope.admin.password,
                'security_code': $scope.security.code
            }
        ).then(function (response) {
            // on success
            $window.location.href = "/admin/";
        }, function (response) {
            // on error
            $window.location.href = "/signup.html";
            console.log("Error in Session Controller #0003", response.data, response.status);
        });
    };

}]);