angular.module('SignupModule').controller('SignupController',['$scope',function($scope){
    $scope.signupForm={
        loading:false
    }

    $scope.submitSignupForm=function(){
        $scope.signupForm.loading=true;
        console.log("clicked!");
    }
}]);