app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

    //This function populates the userAccounts variable with all the user accounts in our current test Users table. 
    $scope.getUserAccounts = function () {
        $http.get("../../ajax/php/getUserAccounts.php")
            .then(function (response) {
                $scope.userAccounts = response.data;
            });
    };

    //This function currently takes in a pidm, and a username/email and writes the username/email to the pidm's prospect in the database. 
    //It then refreshes prospects variable with the getProspects() function 
    $scope.postAssignUser = function (pidmParam, userParam) {
        $http.post(
            "../../ajax/php/postAssignUser.php", {
                'pidm': pidmParam,
                'user': userParam
            }
        ).success(function (data) {
            $scope.getProspects();
        });
    };

    //This was the first function I wrote that interfaced with the database. It just grabs a title databas
    $scope.getTitle = function () {
        $http.get("../../ajax/php/getTitle.php")
            .then(function (response) {
                $scope.title = response.data;
                $scope.title = $scope.title[0].TestTextData;
            });
    };

    $scope.getUsers = function () {
        $http.get("../../ajax/php/getUsers.php")
            .then(function (response) {
                $scope.users = response.data;
            });
    };

    $scope.getProspects = function () {
        $http.get("../../ajax/php/getProspects.php")
            .then(function (response) {
                $scope.prospects = response.data;
            });
    };
    
    $scope.getUserProspects = function () {
        $http.get("../../ajax/php/getUserProspects.php")
            .then(function (response) {
                $scope.prospects = response.data;
            });
    };

    $scope.buildQuery = function () {
        var newQuery = "SELECT * FROM TESTTABLE1 where ";

        var Fname = $scope.buildQuery.Fname;
        var Lname = $scope.buildQuery.Lname;
        var Mname = $scope.buildQuery.Mname;
        var GradYear = $scope.buildQuery.GradYear;
        //        var Major = $scope.buildQuery.Major;
        //        var Minor = $scope.buildQuery.Minor;
        //        var Club = $scope.buildQuery.Club;
        var City = $scope.buildQuery.City;
        if (Fname != null) {
            newQuery += "DONOR_FIRST_NAME = '" + Fname + "', ";
        }
        if (Lname != null) {
            newQuery += "Donor_Last_Name = " + Lname + ", ";
        }
        if (Mname != null) {
            newQuery += "Donor_Maiden = " + Mname + ", ";
        }
        //        if (Major != null){
        //            newQuery+="Donor_Major = " + Major + ", ";
        //        }
        if (GradYear != null) {
            newQuery += "Donor_Pref_Class = " + GradYear + ", ";
        }
        //        if (Minor != null){
        //            newQuery+="Donor_Minor = " + Minor + ", ";
        //        }
        //        if (Club != null){
        //            newQuery+="Donor_Club = " + Club + ", ";
        //        }
        if (City != null) {
            newQuery += "UV_City = " + City + ", ";
        }
        $scope.advancedSearch = newQuery.substring(0, newQuery.length - 2);
        $scope.advancedSearch += ";";
        //       alert($scope.advancedSearch);
        $http.post("../../ajax/php/advancedSearch.php", {
            //             'query':$scope.advancedSearch
            'Fname': Fname,
            'Lname': Lname,
            'Mname': Mname, 
            'GradYear': GradYear,
           // 'Minor': Minor,
          //  'Major': Major,
           // 'Club': Club,
            'City':City,
            'newQuery': advancedSearch
        }).then(function (response) {
            $scope.prospects = response.data;
            console.log(response);
        });
    }

    //******************************************* THE FOLLOWING ARE EXAMPLES FROM LAB 8 FOR IN TEXT REFERENCE *******************************************

    $scope.plusOne = function (id, likes, dislikes) {
        //Increment the likes value
        $scope.likes = Number(likes) + 1;
        $http.post(
            "ajax/updateLikesDislikes.php", {
                'id': id,
                'likes': $scope.likes,
                'dislikes': dislikes
            }
        ).success(function (data) {
            //reset likes property back to 0
            $scope.likes = 0;
            //This will refresh the page by 
            //calling the show_data function, 
            //which displays all books.
            $scope.show_data();
        });
    };


    //Retrieves all books from database and displays
    $scope.show_data = function () {
        $http.get("ajax/getBooks.php")
            .then(function (response) {
                $scope.products = response.data;
            });
    };



    $scope.minusOne = function (id, likes, dislikes) {
        //Increment the likes value
        $scope.dislikes = Number(dislikes) + 1;
        $http.post(
            "ajax/updateLikesDislikes.php", {
                'id': id,
                'likes': likes,
                'dislikes': $scope.dislikes
            }
        ).success(function (data) {
            //reset likes property back to 0
            $scope.dislikes = 0;
            //This will refresh the page by 
            //calling the show_data function, 
            //which displays all books.
            $scope.show_data();
        });
    };

    //******************************************* END LAB 8 EXAMPLES *******************************************

}]);

