app.controller('XlsxController', ['$scope', '$http', '$env', 'SheetJSExportService', function ($scope, $http, $env, SheetJSExportService) {

    $scope.gridOptions = {
        columnDefs: [

        ],
        wscols: [
            { wch: 6 }, // "characters"
            { wpx: 50 }, // "pixels"
            ,
            { hidden: true } // hide column
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
        filename: "None",
        sheetname: "None",
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
            $env.apiRoot + "AdminAPI/submitImport", {
                'excelData': $scope.gridOptions.data,
            }
        ).then(function (response) {
            // console.log(response);
            // $scope.prospects = response.data;
        });
    };
}]);