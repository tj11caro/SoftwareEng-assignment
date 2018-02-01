app.controller('MainController', ['$scope', '$http', function($scope, $http) {

    $scope.title = '';
    
    //In the controller, attach promo to $scope, and set its value to your own string.
    $scope.promo = 'Keep Calm and Read a Book';

    
    
    $scope.getTitle = function() {
        $http.get("../../ajax/php/getTitle.php")
            .then(function(response) {
                  $scope.title = response.data;
                  $scope.title = $scope.title[0].TestTextData;
            });
    };

     //Retrieves all books from database and displays
     $scope.show_data = function() {
        $http.get("ajax/getBooks.php")
            .then(function(response) {
                $scope.products = response.data;
            });
    };

    $scope.plusOne = function(id, likes, dislikes) {
        //Increment the likes value
        $scope.likes = Number(likes) + 1;
        $http.post(
            "ajax/updateLikesDislikes.php", {
                'id': id,
                'likes': $scope.likes,
                'dislikes': dislikes
            }
        ).success(function(data) {
            //reset likes property back to 0
            $scope.likes = 0;
            //This will refresh the page by 
            //calling the show_data function, 
            //which displays all books.
            $scope.show_data();
        });
    };
    
    $scope.minusOne = function(id, likes, dislikes) {
        //Increment the likes value
        $scope.dislikes = Number(dislikes) + 1;
        $http.post(
            "ajax/updateLikesDislikes.php", {
                'id': id,
                'likes': likes,
                'dislikes': $scope.dislikes
            }
        ).success(function(data) {
            //reset likes property back to 0
            $scope.dislikes = 0;
            //This will refresh the page by 
            //calling the show_data function, 
            //which displays all books.
            $scope.show_data();
        });
    };


}]);

