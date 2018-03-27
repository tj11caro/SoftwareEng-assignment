app.controller('LoginController', ['$scope', '$http', '$location', 'user', function ($scope, $http, $location, user) {
    console.log("Not .ng");

    $scope.submitLogin = function () {

        $http.post(
            "ajax/php/mockAuth.php", {
                email: $scope.email,
                password: $scope.pw
            }
        ).success(function (data) {

            if (data.loggedIn == 'true') {
                user.setUsername(data.username);
                user.userLoggedIn();
                if (data.isAdmin == 1) {
                    user.setAdmin(true);
                    $location.path("/admin");
                } else {
                    $location.path("/whereverWeDecideUsersGo");
                }

            } else {
                alert("Invalid Username and/or Password");
                $location.path("/");
            }

        });
    };
}]);
