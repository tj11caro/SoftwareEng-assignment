app.controller('MainController', ['$scope', '$http', '$env', function ($scope, $http, $env) {

    //This function populates the userAccounts variable with all the user accounts in our current test Users table. 
    $scope.getUserAccounts = function () {
        $http.get($env.apiRoot + "UserAPI/getUserAccounts")
            .then(function (response) {
                $scope.userAccounts = response.data;
            }, function (response) {
                //Failure  
            });
    };

    //This function currently takes in a pidm, and a username/email and writes the username/email to the pidm's prospect in the database. 
    //It then refreshes prospects variable with the getProspects() function 
    $scope.postAssignUser = function (pidmParam, userParam) {
        $http.post(
            $env.apiRoot + "VounteerAPI/postAssignUser", {
                'pidm': pidmParam,
                'user': userParam
            }
        ).then(function (data) {
            //Success
            $scope.getProspects();
        }, function (response) {
            //Failure  
        });
    };

    $scope.getUserProspects = function () {
        $http.get($env.apiRoot + "VolunteerAPI/getUserProspects")
            .then(function (response) {
                $scope.prospects = response.data;
            }, function (response) {
                //Failure  
            });
    };

    $scope.getSomeProspects = function () {
        $scope.getprospects = $scope.getprospects == undefined ? new Object() : $scope.getprospects;
        $scope.getprospects.page = $scope.getprospects.page || 1;
        $scope.getprospects.range = $scope.getprospects.range || 10;
        $http.post(
            $env.apiRoot + "AdminAPI/getSomeProspects", {
                'range': $scope.getprospects.range,
                'page': $scope.getprospects.page,
            }
        ).then(function (response) {
            if (response.data.length == 0) {
                $scope.getprospects.page -= 1;
                $scope.getSomeProspects();
            }
            $scope.prospects = response.data;
        }, function (response) {
            // on error                
            console.log("Error Not Reached Server");
        });
    };

    $scope.getSomeAvailableProspects = function () {
        $scope.getprospects = $scope.getprospects == undefined ? new Object() : $scope.getprospects;
        $scope.getprospects.page = $scope.getprospects.page || 1;
        $scope.getprospects.range = $scope.getprospects.range || 10;
        $http.post(
            $env.apiRoot + "VolunteerAPI/getSomeAvailableProspects", {
                'range': $scope.getprospects.range,
                'page': $scope.getprospects.page,
            }
        ).then(function (response) {
            if (response.data.length == 0) {
                $scope.getprospects.page -= 1;
                $scope.getSomeProspects();
            }
            $scope.prospects = response.data;
        }, function (response) {
            // on error                
            console.log("Error Not Reached Server");
        });
    };

    $scope.prospectPageIncrement = function () {
        $scope.getprospects.page += 1;
        $scope.getSomeProspects();
    };

    $scope.prospectPageDecrement = function () {
        if ($scope.getprospects.page > 1) {
            $scope.getprospects.page -= 1;
        }
        $scope.getSomeProspects();
    };

    $scope.getAvailableProspects = function () {
        $http.get($env.apiRoot + "VolunteerAPI/getAvailableProspects")
            .then(function (response) {
                $scope.prospects = response.data;
            });
    };

    $scope.buildQuery = function () {
        // var newQuery = "SELECT * FROM TESTTABLE1 where ";

        var Fname = $scope.buildQuery.Fname;
        var Lname = $scope.buildQuery.Lname;
        var Mname = $scope.buildQuery.Mname;
        var GradYear = $scope.buildQuery.GradYear;
        var Major = $scope.buildQuery.Major;
        var Minor = $scope.buildQuery.Minor;
        var Club = $scope.buildQuery.Club;
        var City = $scope.buildQuery.City;
        // if (Fname != null) {
        //     newQuery += "DONOR_FIRST_NAME = '" + Fname + "', ";
        // }
        // if (Lname != null) {
        //     newQuery += "Donor_Last_Name = " + Lname + ", ";
        // }
        // if (Mname != null) {
        //     newQuery += "Donor_Maiden = " + Mname + ", ";
        // }
        // //        if (Major != null){
        // //            newQuery+="Donor_Major = " + Major + ", ";
        // //        }
        // if (GradYear != null) {
        //     newQuery += "Donor_Pref_Class = " + GradYear + ", ";
        // }
        // //        if (Minor != null){
        // //            newQuery+="Donor_Minor = " + Minor + ", ";
        // //        }
        // //        if (Club != null){
        // //            newQuery+="Donor_Club = " + Club + ", ";
        // //        }
        // if (City != null) {
        //     newQuery += "UV_City = " + City + ", ";
        // }
        // $scope.advancedSearch = newQuery.substring(0, newQuery.length - 2);
        // $scope.advancedSearch += ";";
        //       alert($scope.advancedSearch);
        $http.post($env.apiRoot + "VolunteerAPI\buildQuery", {
            //             'query':$scope.advancedSearch
            'Fname': Fname,
            'Lname': Lname,
            'Mname': Mname,
            'GradYear': GradYear,
            'City': City,
            'Major': Major,
            'Minor': Minor,
            'Club': Club

        }).then(function (response) {
            $scope.prospects = response.data;
            console.log(response);
        }, function (response) {
            //Failure  
        });
    }

    $scope.setRange = function (element) {
        $scope.$apply(function ($scope) {
            $scope.getprospects.range = element.value;
            // if($scope.s){
            $scope.getSomeProspects();
            // }
        });
    };

    $scope.range = function (max, item, min, step) {
        step = step || 1;
        min = min || 0;
        var input = [];
        for (var i = min; i < max; i += step) {
            input.push(item[i]);
        }
        return input;
    };

}]);

