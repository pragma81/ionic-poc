angular.module('starter').controller('GalleryCtrl',GalleryController)

function GalleryController($scope, $http, $localStorage, $stateParams, $timeout) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionic.material.ink.displayEffect();

    ionic.material.motion.pushDown({
        selector: '.push-down'
    });


     $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000,
             selector: '.animate-fade-slide-in .item'
        });
    }, 700);

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me/photos", { params: { access_token: $localStorage.accessToken, fields: "source,likes,comments", format: "json", limit :10 }}).then(function(result) {
                var oddGallery = [];
                var evenGallery = [];
                var res= result.data.data;
                var max = res.length /2;
                for( i=0; i<max;i++){
                    var likesOdd = res[2*i].likes === undefined ? 0 : res[2*i].likes.data.length
                    var commentsOdd = res[2*i].comments === undefined ? 0 : res[2*i].comments.data.length

                    var likesEven = res[2*i+1].likes === undefined ? 0 : res[2*i+1].likes.data.length
                    var commentsEven = res[2*i+1].comments === undefined ? 0 : res[2*i+1].comments.data.length

                    oddGallery.push({url : res[2*i].source, likes : likesOdd, comments: commentsOdd});
                    evenGallery.push({url : res[2*i+1].source, likes : likesEven, comments: commentsEven});

                }
                $scope.oddGallery = oddGallery;
                $scope.evenGallery = evenGallery;

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });
        } else {
            alert("Not signed in");
            $location.path("/login");
        }
    };
}
