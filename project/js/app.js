var app = angular.module("AnnualFund", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            // function() {
            // console.log("this is a first");
            // },
            // console.log("this is a first"),
            templateUrl: "login.html"
        })
        .when("/admin", {
            templateUrl: "views/admin/admin.html"
        })
        .when("/home", {
            templateUrl: "views/user/user.html"
        })
        .when("/select-prospects", {
            templateUrl: "views/user/selectProspects.html"
        })
        .when("/view-prospects", {
            templateUrl: "views/user/userProspects.html"
        })
        .when("/advanced-search", {
            templateUrl: "views/user/advancedSearch.html"
        })
        .when("/admin/view-users", {
            templateUrl: "views/admin/admin-users.html"
        })
        .when("/admin/reports", {
            templateUrl: "views/admin/admin-reports.html"
        })
        .when("/admin/prospects", {
            templateUrl: "views/admin/admin-prospects.html"
        })
        .when("/admin/import", {
            templateUrl: "views/admin/admin-import.html"
        });
});

app.constant("$env", {
    projectRoot: "http://127.0.0.1:5500/",
    apiRoot: "http://127.0.0.1:2000/",
    // projectRoot: "http://oraserv.cs.siena.edu/~perm_team1_2017/GitRepos/AnnualFund2017-18/project/",
    // apiRoot: "http://oraserv.cs.siena.edu:2000/",
});

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);

// app.directive("ng-tableStream", function () {
//     return function (scope, element, attrs) {
//         element.bind("", function () {

//         });
//     }
// });
