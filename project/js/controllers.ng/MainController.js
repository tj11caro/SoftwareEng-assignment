app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

    //This function populates the userAccounts variable with all the user accounts in our current test Users table. 
    $scope.getUserAccounts = function () {
        $http.get("http://oraserv.cs.siena.edu:2000/UserAPI/getUserAccounts")
            .then(function (response) {
                console.log(response.data);
                $scope.userAccounts = response.data;
            });
    };

    //This function currently takes in a pidm, and a username/email and writes the username/email to the pidm's prospect in the database. 
    //It then refreshes prospects variable with the getProspects() function 
    $scope.postAssignUser = function (pidmParam, userParam) {
        $http.post(
            "http://oraserv.cs.siena.edu:2000/VounteerAPI/postAssignUser", {
                'pidm': pidmParam,
                'user': userParam
            }
        ).success(function (data) {
            $scope.getProspects();
        });
    };

    $scope.getUserProspects = function () {
        $http.get("http://oraserv.cs.siena.edu:2000/VolunteerAPI/getUserProspects")
            .then(function (response) {
                // console.log(response);
                $scope.prospects = response.data;
            });
    };

    $scope.getProspects = function () {
        console.log("Whart");
        $http.get("http://oraserv.cs.siena.edu:2000/AdminAPI/getProspects")
            .then(function (response) {
                console.log(response);
                $scope.prospects = response.data;
            });
    };
    
    //        $http.post("http:\\orserv.cs.siena.edu:2000\VolunteerAPI\buildQuery", {
    
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
        $http.post("http:\\orserv.cs.siena.edu:2000\VolunteerAPI\buildQuery", {
            //             'query':$scope.advancedSearch
            'Fname': Fname
             'Lname': Lname
        }).then(function (response) {
            $scope.prospects = response.data;
            console.log(response);
        });

}]);

