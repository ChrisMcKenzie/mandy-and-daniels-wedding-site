var app = angular.module("mandysSite", ["firebase"]);

app.controller("guestbook", ["$scope", "$firebase", function($scope, $firebase) {
    console.log("asdasd");
    var ref = new Firebase("https://mdsite.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref.child("guestbook"));
    // download the data into a local object
    $scope.signatures = sync.$asArray();
    console.log($scope.signatures);
  }
]);