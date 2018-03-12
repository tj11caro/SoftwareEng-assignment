var app = angular.module("AnnualFund", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "login.html"
        })
        .when("/admin", {
            templateUrl: "views/admin/admin.html"
        })
        .when("/admin/view-users", {
            templateUrl: "views/admin/admin-users.html"
        })
        .when("/green", {
            templateUrl: "green.htm"
        })
        .when("/blue", {
            templateUrl: "blue.htm"
        });
});

app.service('user', function() {
   
    var username; 
    var loggedIn = false; 
    var admin = false; 
    
    this.setUsername = function(name) {
        username = name; 
    };
    this.getName = function() {
      return username;   
    };
    this.isUserLoggedIn = function() {
        return loggedIn; 
    };
    this.userLoggedIn = function() {
        loggedIn = true; 
    };
    this.isAdmin = function() {
        return admin; 
    };
    this.setAdmin = function(bool) {
        admin = bool; 
    };
    
    
});
