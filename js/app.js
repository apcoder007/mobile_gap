var mobileApp = angular.module('mobileApp', ['ui.router', 'ngCookies', 'ngStorage']);

mobileApp.run(function($state, $rootScope){
	$rootScope.hidetoolbar = false;

	if($state.go('login')){
		$rootScope.hidetoolbar = true;
	}
});

mobileApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider

        
        .state('login', {
            url: '/',
            templateUrl: 'views/login1.html',
            controller: 'loginCtrl'
        })

        .state('forgot', {
            url: '/forgot/password',
            templateUrl: 'views/forgotpassword.html',
            controller: 'forgotpasswordCtrl'     
        })

        .state('home', {
            url: '/home',
            templateUrl: 'views/home1.html',
            controller: 'homeCtrl'     
        })

        .state('task', {
            url: '/task',
            templateUrl: 'views/task.html',
            controller: 'taskCtrl'     
        })

        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            controller: 'profileCtrl'      
        })

        .state('payroll', {
            url: '/payroll',
            templateUrl: 'views/payroll.html',
            controller:'payrollCtrl'      
        })

        .state('feedback', {
            url: '/feedback',
            templateUrl: 'views/feedback.html',
            controller:'feedbackCtrl'      
        })

        .state('mobiledirectory', {
            url: '/mobiledirectory',
            templateUrl: 'views/mobiledirectory.html',
            controller:'mobiledirectoryCtrl',
            resolve:{
                    empimagelist: function(Data){
                    return Data.getEmpWithImageList();
                    }
                }      
        })

        .state('empdetails', {
            url: '/empdetails/:empcode',
            templateUrl: 'views/empdetails.html',
            controller:'empdetailsCtrl'      
        })

        .state('changepwd', {
            url: '/changepwd',
            templateUrl: 'views/changepwd.html',
            controller:'changepwdCtrl'      
        })

        .state('attendance', {
            url: '/attendance',
            templateUrl: 'views/attendance.html',
            controller: 'attendanceCtrl'
        })

        .state('regularize', {
            url: '/regularize',
            templateUrl: 'views/regularize.html',
            controller: 'regularizeCtrl'
        })

        .state('leave', {
            url: '/leave',
            templateUrl: 'views/leave.html',
            controller: 'leaveCtrl'
        })
        
        .state('holidays', {
            url: '/holidays',
            templateUrl: 'views/holidays.html',
            controller: 'holidaysCtrl',
            resolve:{
                holidaylist: function(Data){
                return Data.gettotalHolidayList();
                }
            }   
        });


});