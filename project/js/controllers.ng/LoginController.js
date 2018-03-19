app.controller('LoginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.submitLogin = function () {
        $http.post(
            'http://oraserv.cs.siena.edu:2000/UserAPI/login', {
                'email': $scope.email,
                'password': $scope.password,
            }).then(function (response) {
                // on success
                $scope.session = new Object();
                $scope.session.user = response.data;
                console.log(response.data);
                if ($scope.session.user.userType === "admin") {
                    $window.location.href = '/project/views/admin/admin.html';
                } else if ($scope.session.user.userType === "volunteer") {
                    $window.location.href = '/project/views/user/user.html';
                }
            }, function (response) {
                // on error
                // $window.location.href = '/project/login.html';
                console.log("Redirect May Not implemented ERR#0403");
                console.log("Error in Login Controller #0001", response.data, response.status);
            });
    };

    $scope.submitSignUp = function () {
        $http.post(
            "http://oraserv.cs.siena.edu:2000/UserAPI/signup", {
                'vpassword': $scope.volunteer.password,
                'vemail': $scope.volunteer.email,
                'vpidm': $scope.volunteer.pidm,
            }
        ).then(function (response) {
            // on success
            $window.location.href = '/project/views/admin/admin.html';
        }, function (response) {
            // on error
            $window.location.href = '/project/signup.html';
            console.log("Redirect May Not implemented ERR#0403");
            console.log("Error in Login Controller #0002", response.data, response.status);
        });
    };

    $scope.submitNewAdmin = function () {
        $http.post(
            "http://oraserv.cs.siena.edu:2000/UserAPI/createAdmin", {
                'email': $scope.admin.email,
                'pidm': $scope.admin.pidm,
                'password': $scope.admin.password,
                'security_code': $scope.security.code
            }
        ).then(function (response) {
            // on success
            $window.location.href = '/project/views/admin/admin.html';
        }, function (response) {
            // on error
            $window.location.href = '/project/signup.html';
            console.log("Redirect May Not implemented ERR#0403");
            console.log("Error in Login Controller #0002", response.data, response.status);
        });
    };
}]);
