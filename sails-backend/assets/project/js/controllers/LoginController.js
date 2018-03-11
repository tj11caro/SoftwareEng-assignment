app.controller('LoginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {


    $scope.submitLogin = function () {

        alert("fired");
        var user = {
            email: $scope.email,
            password: $scope.pw
        };
        $http({
            method: 'GET',
            url: '/User/getMe'
        }).then(function (response) {
            console.log(response.data);
        });
    };

}]);
