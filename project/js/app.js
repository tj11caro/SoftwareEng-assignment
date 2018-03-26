var app = angular.module("AnnualFund", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
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
