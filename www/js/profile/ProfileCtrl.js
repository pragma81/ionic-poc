angular.module('starter').controller('ProfileCtrl', ProfileController)


function ProfileController($scope, $http, $localStorage, $location,$timeout,$q, securityservice) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 1700);

    // Set Ink
    ionic.material.ink.displayEffect();

    $scope.init = function() {
        if( securityservice.isAuthenticated == false){
             alert("Not signed in");
            $location.path("/login");
            }

        var meCall = $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,cover,relationship_status", format: "json" }});

        var postCall = $http.get("https://graph.facebook.com/v2.2/me/posts", { params: { access_token: $localStorage.accessToken, fields: "message, picture, created_time, shares, comments", format: "json" }})


        $q.all([meCall,postCall]).then(function(result) {
            $scope.profileData = result[0].data;
            var coverUrl = "url("+result[0].data.cover.source+")"
            $scope.coverImg = {'background-image': coverUrl};

            $scope.posts = result[1].data.data
        }, function(error) {
            alert("There was a problem getting your data.  Check the logs for details.");
            console.log(error);
        });

};



}
