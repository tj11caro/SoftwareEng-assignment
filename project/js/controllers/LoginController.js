app.controller('LoginController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    
    
    $scope.submitLogin = function() {
        
        alert("fired"); 

         var user = {
                    email: $scope.email,
                    password: $scope.pw
         };    

         $http.get("http://oraserv.cs.siena.edu:1337/User/user")
            .then(function (response) {
                    console.log(response.data);
                });

    };
    
}]);
