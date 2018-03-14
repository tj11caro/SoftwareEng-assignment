var app = angular.module('AnnualFund', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter']);
/* Inject SheetJSExportService */
app.factory('SheetJSExportService', SheetJSExportService);
SheetJSExportService.inject = ['uiGridExporterService'];
app.directive("importSheetJs", [SheetJSImportDirective]);