var app = angular.module('AnnualFund', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter']);
/* Inject SheetJSExportService */
app.factory('SheetJSExportService', SheetJSExportService);
SheetJSExportService.inject = ['uiGridExporterService'];
app.directive("importSheetJs", [SheetJSImportDirective]);

app.constant("$env", {
    projectRoot: "http://127.0.0.1:5500/",
    apiRoot: "http://127.0.0.1:2000/",
    // projectRoot: "http://oraserv.cs.siena.edu/~perm_team1_2017/GitRepos/AnnualFund2017-18/project/",
    // apiRoot: "http://oraserv.cs.siena.edu:2000/",
});

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);