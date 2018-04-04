app.controller('NotesController', ['$scope', '$http', '$env', function ($scope, $http, $env) {
    $scope.notes = new Object();
    $scope.submitNote = function (pidm) {
        console.log("Look ", pidm, $scope.notes.message, $scope.notes.flag, $scope.notes.statuz);
        $http.post(
            $env.apiRoot + 'VolunteerAPI/postNote', {
                'pidm': pidm,
                'message': $scope.notes.message,
                'flag': $scope.notes.flag,
                'status': $scope.notes.statuz,
            }).then(function (response) {
                // on success
                var a = response.data;
            }, function (response) {
                // on error
                console.log("Error in Notes Controller #0001", response.data, response.status);
            });
    };

    $scope.getAllMyNotes = function () {
        $http.post(
            $env.apiRoot + 'VolunteerAPI/getAllMyNotes', {
            }).then(function (response) {
                // on success
                $scope.notes.allNotes = response.data;
                for (var i = 0; i < $scope.notes.allNotes.length; i++) {
                    var midname = $scope.notes.allNotes[i].DONOR_MIDDELE_NAME ? $scope.notes.allNotes[i].DONOR_MIDDELE_NAME : "";
                    $scope.notes.allNotes[i].name = $scope.notes.allNotes[i].DONOR_FIRST_NAME + " "
                        + midname + " " + $scope.notes.allNotes[i].DONOR_LAST_NAME;

                    var date = $scope.notes.allNotes[i].updatedAt;
                    date = date.split("-").join("/");
                    date = date.replace("T", " \n");
                    reg = new RegExp(/.\d\d\dZ/);
                    $scope.notes.allNotes[i].date = date.replace(reg, " Zulu");
                }
            }, function (response) {
                // on error
                console.log("Error in Notes Controller #0002", response.data, response.status);
            });
    };

    $scope.getAllNotes = function () {
        return $scope.notes.allNotes;
    };

    $scope.getNote = function (donor) {
        if (donor) {
            $http.post(
                $env.apiRoot + 'VolunteerAPI/getNote', {
                    'pidm': donor.PIDM_KEY,
                }).then(function (response) {
                    // on success
                    $scope.notes.previous = response.data;
                    $scope.notes.previous.date = $scope.notes.previous.date.split("-").join("/");
                    $scope.notes.previous.date = $scope.notes.previous.date.replace("T", " \n");
                    reg = new RegExp(/.\d\d\dZ/);
                    $scope.notes.previous.date = $scope.notes.previous.date.replace(reg, " Zulu");
                }, function (response) {
                    // on error
                    console.log("Error in Notes Controller #0002", response.data, response.status);
                });
        }
    };

}]);
