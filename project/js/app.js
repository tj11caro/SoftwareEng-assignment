var app = angular.module('AnnualFund', []);

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