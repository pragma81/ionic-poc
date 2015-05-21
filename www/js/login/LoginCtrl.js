angular.module('starter').controller('LoginCtrl', LoginController)

function LoginController($scope, $timeout, $state, $stateParams, $cordovaOauth, $localStorage, $location, securityservice) {

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
        securityservice.facebookLogin(
            function(result){
                $state.go('app.profile')},
            function(error){
                alert("There was a problem signing in!  See the console for logs");
                console.log(error);
            })

    };

}
