// import { connect } from "tls";

app.controller('MainController', ['$scope', '$http', '$env', function ($scope, $http, $env) {
    $scope.tableData = new Object();
    $scope.tableData.buttonText = "Next";

    //This function populates the userAccounts variable with all the user accounts in our current test Users table. 
    $scope.getUserAccounts = function () {
        $scope.tableData.page = $scope.tableData.page || 1;
        $scope.tableData.range = $scope.tableData.range || 10;
        $http.post(
            $env.apiRoot + "UserAPI/getUserAccounts", {
                'range': $scope.tableData.range,
                'page': $scope.tableData.page,
            }
        ).then(function (response) {
            if (response.data.length == 0) {
                $scope.tableData.page -= 1;
                $scope.getUserAccounts();
            }
            $scope.userAccounts = response.data;
            $scope.tableData.range = $scope.userAccounts.length;
        }, function (response) {
            // on error                
            console.log("Error Not Reached Server");
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

    //Admin Method
    $scope.getUserProspects = function () {
        $http.get($env.apiRoot + "VolunteerAPI/getUserProspects")
            .then(function (response) {
                $scope.prospects = response.data;
            }, function (response) {
                //Failure  
            });
    };

    //Admin Method
    $scope.getSomeProspects = function () {
        $scope.tableData = $scope.tableData == undefined ? new Object() : $scope.tableData;
        $scope.tableData.page = $scope.tableData.page || 1;
        $scope.tableData.range = $scope.tableData.range || 10;
        $http.post(
            $env.apiRoot + "AdminAPI/getSomeProspects", {
                'range': $scope.tableData.range,
                'page': $scope.tableData.page,
            }
        ).then(function (response) {
            if (response.data.length == 0) {
                $scope.tableData.page -= 1;
                $scope.getSomeProspects();
            }
            $scope.prospects = response.data;
            $scope.tableData.range = $scope.prospects.length;
        }, function (response) {
            // on error                
            console.log("Error Not Reached Server");
        });
    };

    //Volunteer Method
    $scope.getMyProspects = function () {
        $scope.tableData = $scope.tableData == undefined ? new Object() : $scope.tableData;
        $scope.tableData.page = $scope.tableData.page || 1;
        $scope.tableData.range = $scope.tableData.range || 10;
        $http.post(
            $env.apiRoot + "VolunteerAPI/getMyProspects", {
                'range': $scope.tableData.range,
                'page': $scope.tableData.page,
            }
        ).then(function (response) {
            if (response.data.length == 0) {
                $scope.tableData.page -= 1;
                $scope.getMyProspects();
            }
            $scope.prospects = response.data;
            $scope.tableData.range = $scope.prospects.length;
        }, function (response) {
            // on error                
            console.log("Error Not Reached Server");
        });
    };

    //Volunteer Method
    $scope.getSomeAvailableProspects = function () {
        $scope.tableData = $scope.tableData == undefined ? new Object() : $scope.tableData;
        $scope.tableData.page = $scope.tableData.page || 1;
        $scope.tableData.range = $scope.tableData.range || 10;
        $http.post(
            $env.apiRoot + "UserAPI/getSomeAvailableProspects", {
                'range': $scope.tableData.range,
                'page': $scope.tableData.page,
            }
        ).then(function (response) {
            if (response.data.length == 0) {
                $scope.tableData.page -= 1;
                $scope.getSomeAvailableProspects();
            }
            console.log("getSomeAvailableProspects");
            $scope.prospects = response.data;
            $scope.tableData.range = $scope.prospects.length;
        }, function (response) {
            // on error                
            console.log("Error Not Reached Server");
        });
    };

    //User Method
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

    //User Method
    $scope.prospectPageIncrement = function (runFunction) {
        $scope.tableData.page += 1;
        if (runFunction) {
            runFunction();
        }
        $scope.tableData.buttonText = "Next";
    };

    //User Method
    $scope.prospectPageDecrement = function (runFunction) {
        if ($scope.tableData.page > 1) {
            $scope.tableData.page -= 1;
        }
        if (runFunction) {
            runFunction();
        }
        $scope.tableData.buttonText = "Next";
    };

    //User Method    
    $scope.setRange = function (element, runFunction) {
        $scope.$apply(function ($scope) {
            $scope.tableData.range = element.value;
            $scope.tableData.page = 0;
            $scope.tableData.buttonText = "Update";
            // runFunction();
        });
    };

    //User Method
    $scope.range = function (max, item, min, step) {
        step = step || 1;
        min = min || 0;
        var input = [];
        if (!item) {
            return;
        }
        max = item.length || max;
        for (var i = min; i < max; i += step) {
            input.push(item[i]);
        }
        return input;
    };
}]);

