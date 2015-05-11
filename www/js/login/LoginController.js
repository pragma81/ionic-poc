angular.module('starter').controller('LoginController', LoginController)

function LoginController($scope, $cordovaOauth, $localStorage, $location) {

    $scope.login = function() {
        $cordovaOauth.facebook("823607484376036", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            $location.path("/profile");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

}
