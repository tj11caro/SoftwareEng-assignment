var app = angular.module("AnnualFund", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "login.html",
            controller: "LoginController",
        })
        .when("/admin", {
            templateUrl: "views/admin/admin.html",
            controller: "AdminSessionController",
        })
        .when("/admin/view-users", {
            templateUrl: "views/admin/admin-users.html",
            controller: "AdminSessionController",
        })
        .when("/admin/reports", {
            templateUrl: "views/admin/admin-reports.html",
            controller: "AdminSessionController",
        })
        .when("/admin/prospects", {
            templateUrl: "views/admin/admin-prospects.html",
            controller: "AdminSessionController",
        })
        .when("/admin/create-admin", {
            templateUrl: "create-admin.html",
            controller: "AdminSessionController",
        })
        .when("/admin/create-volunteer", {
            templateUrl: "signup.html",
            controller: "AdminSessionController",
        })
        .when("/successful-request", {
            templateUrl: "successful-request.html",
            controller: "SessionController",
        })
        .when("/admin/import", {
            controller: function () {
                console.log("Somthing");
                window.location.replace('views/admin/admin-import.html');
            },
            template: "<div></div>"
        })
        .when("/home", {
            templateUrl: "views/user/index.html",
            controller: "SessionController",
        })
        .when("/select-prospects", {
            templateUrl: "views/user/select-prospects.html",
            controller: "SessionController",
        })
        .when("/view-prospects", {
            templateUrl: "views/user/view-prospects.html",
            controller: "SessionController",
        })
        .when("/advanced-search", {
            templateUrl: "views/user/advancedSearch.html",
            controller: "SessionController",
        }).otherwise({
            templateUrl: "views/404-page.html"
        });
});

app.constant("$env", {
    // projectRoot: "http://127.0.0.1:5500/",
    // apiRoot: "http://127.0.0.1:2000/",
    // projectRoot: "http://oraserv.cs.siena.edu/~perm_team1_2017/GitRepos/AnnualFund2017-18/project/",
    apiRoot: "http://oraserv.cs.siena.edu:2000/",
});

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);

//This method ensures that all modals are closed during URL changes
app.run(function ($rootScope, $location) {
    $rootScope.$watch(function () {
        return $location.path();
    },
        function (a) {
            $('#exampleModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        });
});
