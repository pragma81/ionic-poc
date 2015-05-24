(function() {
    'use strict';

    angular.module('starter').factory('socialAbstractFactory',SocialAbstractFactory);

 function SocialAbstractFactory(facebookSecurityService,twitterSecurityService){

    var availableSocialPlugin = ['facebook','twitter'];
    var currentSocial = undefined;
    var securityService = undefined;

     var factory = {
            setCurrentSocial: setCurrentSocial,
            getLoginService: getLoginService
        };

        return factory;

     function setCurrentSocial(social){
       if( availableSocialPlugin.indexOf(social) === -1)
           throw new Error('Unavailable support for '+social+' social');

         this.currentSocial = social;
         if(social === 'facebook'){
             securityService = facebookSecurityService;
        } else

        if(social === 'twitter'){
            securityService = twitterSecurityService;

        }


     }
     function getLoginService(){


     }
}

 SocialAbstractFactory.prototype = {
    setCurrentSocial: function(social){
        this.currentSocial = social;
    },


    }

})();
