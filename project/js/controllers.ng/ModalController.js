app.controller('ModalController', ['$scope', '$http', function ($scope, $http) {

    $scope.test = "original";
    console.log($scope.test);

    $scope.changeTest = function() {
        alert('fireee');
        console.log($scope.test); 
        $scope.test = "changed"; 
        console.log($scope.test);
    };


    $scope.detailProspectShow = function (clickedProspect) {
        $('#detailProspectModal').modal('show');
        $scope.detailedProspect = {
            data: null 
        }
        $scope.detailedProspect.data = clickedProspect; //I had to write this in this way, by addind the .data object in order for angular to refresh the data. 
    };



}]);