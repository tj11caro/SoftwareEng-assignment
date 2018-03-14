app.controller('XlsxController', ['$scope', '$http', 'SheetJSExportService', function ($scope, $http, SheetJSExportService) {
    $scope.gridOptions = {
        columnDefs: [
            { field: 'name' },
            { field: 'gender', visible: false },
            { field: 'company' }
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterMenuPdf: false,
        exporterMenuCsv: false,
        showHeader: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        /* SheetJS Service setup */
        filename: "Example.csv",
        sheetname: "ng-SheetJS",
        gridMenuCustomItems: [
            {
                title: 'Export all data as XLSX',
                action: function ($event) { SheetJSExportService.exportXLSX($scope.gridApi); },
                order: 200
            },
            {
                title: 'Export all data as XLSB',
                action: function ($event) { SheetJSExportService.exportXLSB($scope.gridApi); },
                order: 201
            }
        ]
    };

    $scope.setFile = function (element) {
        $scope.canSubmit = true;
        $scope.$apply(function ($scope) {
            $scope.gridOptions.filename = element.files[0].name;
        });
    };

    $scope.submitImport = function () {
        console.log($scope.gridOptions.data);
        $http.post(
            "/AdminAPI/submitImport", {
                'excelData': $scope.gridOptions.data,
            }
        ).then(function (response) {
            // console.log(response);
            // $scope.prospects = response.data;
        });
    };


    $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json').success(function (data) { $scope.gridOptions.data = data; });

}]);