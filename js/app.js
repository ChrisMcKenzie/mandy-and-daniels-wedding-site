var app = angular.module("mandysSite", ["firebase"]);

app.controller("guestbook", ["$scope", "$firebase", function($scope, $firebase) {
    console.log("asdasd");
    $scope.sig = {
      name: null,
      email: null,
      message: null
    };
    var ref = new Firebase("https://mdsite.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref.child("guestbook"));
    // download the data into a local object
    $scope.signatures = sync.$asArray();
    // console.log($scope.signatures);

    $scope.submit = function(){
      $scope.sig.date = Date.now();
      $scope.signatures.$add($scope.sig);
    }
  }
]);