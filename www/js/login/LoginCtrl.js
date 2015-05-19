angular.module('starter').controller('LoginCtrl', LoginController)

function LoginController($scope, $timeout, $state, $stateParams, $cordovaOauth, $localStorage, $location) {

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);

    /*
    $timeout(function() {
     ionic.material.motion.panInLeft({
        selector: '.animate-pan-in-left'
    })
      }, 500);
      */
    ionic.material.ink.displayEffect();


    $scope.login = function() {
        $cordovaOauth.facebook("823607484376036", ["email", "read_stream", "user_website", "user_location", "user_relationships","user_photos","user_likes"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            $state.go('app.profile');
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

}
