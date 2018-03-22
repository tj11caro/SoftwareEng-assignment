var app = angular.module('AnnualFund', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter']);
/* Inject SheetJSExportService */
app.factory('SheetJSExportService', SheetJSExportService);
SheetJSExportService.inject = ['uiGridExporterService'];
app.directive("importSheetJs", [SheetJSImportDirective]);

app.constant("globalVars", {
    projectRoot: "http://oraserv.cs.siena.edu/~perm_team1_2017/GitRepos/AnnualFund2017-18/project/",
    apiRoot: "http://oraserv.cs.siena.edu:2000/",
});