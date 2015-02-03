var app = angular.module("mandysSite", ["firebase"]);
var ref = new Firebase("https://mdsite.firebaseio.com/");
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

app.controller("guestbook", ["$scope", "$firebase", function($scope, $firebase) {
    // console.log("asdasd");
    $scope.sig = {
      name: null,
      email: null,
      message: null
    };
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
]).controller("rsvp", ["$scope", "$firebase", function($scope, $firebase){
  var one = getRandomArbitrary(0, 10);
  var two = getRandomArbitrary(0, 10);
  var answer = one + two
  $scope.question = "what is " + one + " + " + two;
  $scope.rsvp = {}
    // create an AngularFire reference to the data
  var sync = $firebase(ref.child("rsvps"));
  // download the data into a local object
  var rsvps = sync.$asArray();

  $scope.submit = function(){
    if($scope.answer == answer || ($scope.question == "Are you a robot?" && $scope.answer === "no")){
      $scope.rsvp.date = Date.now();
      rsvps.$add($scope.rsvp);
      $scope.message = "Rsvp Successfully Sent..."
    } else if($scope.question == "Are you a robot?" && $scope.answer !== "no") {
      $scope.message = "We don't serve your kind! droids have to wait outside"
    } else {
      $scope.question = "Are you a robot?"
    }
  }
}]).controller("registry", ["$scope", "$firebase", function($scope, $firebase) {
  $scope.donate = function(){
    angular.element("#paypal").submit();
  }
}])