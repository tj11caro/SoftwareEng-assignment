app.controller('LoginController', ['$scope', '$http', '$window', '$sanitize', function($scope, $http, $window, $sanitize) {
    
    
    $scope.submitLogin = function() {
        
     $scope.email; 
     $scope.pw;
     $window.location.href = './index.html';
        
    };
    
}]);
