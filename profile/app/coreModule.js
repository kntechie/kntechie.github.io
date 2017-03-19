define(function(){

var coreModule = angular.module('coreModule',['ngRoute']);

coreModule.config(['$routeProvider',function($routeProvider) {
    
$routeProvider.
    when('/contact', {
        templateUrl: 'app/contact/contact.html',
		controller: 'validateCtrl'
    }).
	when('/objective', {
        templateUrl: 'app/objective/objective.html'
    }).
    when('/education', {
        templateUrl: 'app/education/education.html'
    }).
	when('/experience', {
        templateUrl: 'app/experience/experience.html'
    }).
	when('/personal', {
        templateUrl: 'app/personal/personal.html',
		controller: 'personalController'
    }).
	when('/portfolio', {
        templateUrl: 'app/portfolio/portfolio.html',
		controller: 'portController'
    }).
	when('/skills', {
        templateUrl: 'app/skills/skills.html'
    }).
	otherwise({
        redirectTo: '/objective'
    });
}]);
 

// Portfolio page controller
coreModule.controller('portController',function($scope){
	
$scope.files = [
	{ project :	
		[
			{
				path: 'app/portfolio/assets/project/page_1.jpg'
			},
			{
				path: 'app/portfolio/assets/project/page_2.jpg'
			},
			{
				path: 'app/portfolio/assets/project/page_3.jpg'
			},
			{
				path: 'app/portfolio/assets/project/page_4.jpg'
			},
			{
				path: 'app/portfolio/assets/project/page_5.jpg'
			},
			{
				path: 'app/portfolio/assets/project/page_6.jpg'
			}
		]
		
	},
	{
	logos :	
		[
			{
				path: 'app/portfolio/assets/logos/logo_1.png'
			},
			{
				path: 'app/portfolio/assets/logos/logo_2.png'
			},
			{
				path: 'app/portfolio/assets/logos/logo_3.png'
			},
			{
				path: 'app/portfolio/assets/logos/logo_4.png'
			},
			{
				path: 'app/portfolio/assets/logos/logo_5.png'
			}
		]	
	}
];
	
});


// Contact page controller
coreModule.controller('validateCtrl', function($scope, $http) {
	
	$scope.hide = true;
	
	$scope.close_alert = function(){
		$scope.hide = true;
	};
	
	console.log("$scope.hide", $scope.hide);
	// RESTful call to save the data in data base
	$scope.click = function() {
	  console.log("Entered the function");
	  if($scope.formData.user && $scope.formData.email){
		  console.log("Entered the service");
		  $http({
		  method  : 'POST',
		  url     : 'http://localhost/web_hosted/profile/service/test',
		  //data    : $.param($scope.formData),  // pass in data as strings
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		  }).then(function() {
			$scope.formData.user = '';
			$scope.formData.email = '';
			$scope.formData.comment = '';
			$scope.hide = false;
		  });
	   }
	};
	
});


// Personal page controller
coreModule.controller('personalController', function($scope) {
	
	$scope.img_click = function(){
		$scope.modalDisplay = {"display" :"block"};
		$scope.modalSource = $scope.imgSrc;
		//$scope.modalAlt = "";
		//$scope.captionText = 
	};
	
	$scope.close_click = function(){
		$scope.modalDisplay = {"display" :"none"};
	};
	
});


// Directive for showing loader image on route change
coreModule.directive('routeLoadingIndicator', function($rootScope) {
  return {
      restrict: 'E',
      template: "<div class='col-lg-12' ng-if='isRouteLoading'><img src='images/loader.gif' style='display:block;margin-left: auto;margin-right: auto;'/></div>",
      link: function(scope, elem, attrs) {
        scope.isRouteLoading = false;

        $rootScope.$on('$routeChangeStart', function() {
          scope.isRouteLoading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
          scope.isRouteLoading = false;
        });
      }
    };
});

});