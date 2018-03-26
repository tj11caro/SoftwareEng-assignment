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
                // $window.location.href = $env.projectRoot + 'login.html';
                console.log("Redirect May Not implemented ERR#0404");
                console.log("Error in User Controller #0000", response.data, response.status);
            } else {
                console.log("Session was Gained From Server");
            }
        }, function (response) {
            // on error
            $window.location.href = $env.projectRoot + 'login.html';
            console.log("Redirect May Not implemented ERR#0403");
            console.log("Error in User Controller #0001", response.data, response.status);

        });
    };

    $scope.logout = function () {
        $http({

            method: 'GET',
            url: $env.apiRoot + 'UserAPI/logout'

        }).then(function (response) {
            // on success
            $scope.session = new Object();
            $window.location.href = $env.projectRoot + 'login.html';
        }, function (response) {
            // on error
            $window.location.href = $env.projectRoot + 'login.html';
            console.log("Error in User Controller #0001", response.data, response.status);
        });
    }

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
                    $window.location.href = $env.projectRoot + 'views/admin/';
                } else if ($scope.session.user.userType === "volunteer") {
                    $window.location.href = $env.projectRoot + 'views/user/';
                } else {
                    console.log("This is an error Check How Are you seeing this");
                }
            }, function (response) {
                // on error
                $window.location.href = $env.projectRoot + 'login.html';
                console.log("Redirect May Not implemented ERR#0403");
                console.log("Error in Login Controller #0001", response.data, response.status);
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
            $window.location.href = $env.projectRoot + 'login.html';
        }, function (response) {
            // on error                
            $window.location.href = $env.projectRoot + 'login.html';
            console.log("Redirect May Not implemented ERR#0403");
            console.log("Error in Login Controller #0002", response.data, response.status);
        });
    };

    $scope.submitNewAdmin = function () {
        $http.post(
            $env.projectRoot + "/UserAPI/createAdmin", {
                'email': $scope.admin.email,
                'fname': $scope.admin.fname,
                'lname': $scope.admin.lname,
                'pidm': $scope.admin.pidm,
                'password': $scope.admin.password,
                'security_code': $scope.security.code
            }
        ).then(function (response) {
            // on success
            $window.location.href = $env.projectRoot + "/views/admin/";
        }, function (response) {
            // on error
            $window.location.href = $env.projectRoot + "/signup.html";
            console.log("Error in Session Controller #0003", response.data, response.status);
        });
    };

}]);