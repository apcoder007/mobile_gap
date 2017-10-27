mobileApp.service('Data', function($http){

	this.getImageUrl = function(empcode){
		var json_data = {
			'empCode' : empcode
		}

		return $http({
			method:'POST',
			data : json_data,
			url: 'https://gapapi-100.appspot.com/api/get/profile/image/'
		});
	}

	this.getBirthDay = function(){
		return $http({
			method:'post',
			url:'https://gapapi-100.appspot.com/api/birthday/deatils/'
		});
	}

    this.getEployeeDetails = function(empCode){
        var json_data = {
            'empCode':empCode
        }
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/position/details/'
        });
    }

    this.changePassword = function(empcode, pwd, newpwd){
        var json_data = {
            'empCode':empcode,
            'password':pwd,
            'newpassword':newpwd
        }

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/change/password/'
        });
    }

    this.sendOTP = function(empcode, otp){
        var json_data = {
            'empCode':empcode,
            'otp':otp
        }

        return $http({
            method:'POST',
            'data':json_data,
            'url':'https://gapapi-100.appspot.com/api/signup/otp/'
        });
    }

    this.resetPassword = function(empcode, pass){
        var json_data = {
            'empCode' : empcode,
            'password' : pass
        }

        return $http({
            method:'POST',
            data: json_data,
            url : 'https://gapapi-100.appspot.com/api/user/forgot/'
        });
    }

    this.feedbackSubmit = function(json_data){
        return $http({
            method:'POST',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/add/employee/review/'
        });
    }

    this.getEmpWithImageList = function(){
        return $http({
            method:'get',
            url:'https://gapapi-100.appspot.com/api/get/employee/imagelist/'
        }).then(function(response){
            return response.data.configure_data;
        }).catch(function(response){
            
        });
    }

    this.gettotalHolidayList = function(){
        return $http({
            method:'post',
            url:'https://gapapi-100.appspot.com/api/total/holiday/'
        }).then(function(response){
            return response.data.holiday_data;
        }).catch(function(response){
            
        });
    }

    this.getProfileImage = function(empcode){
        json_data = {
            'empCode' : empcode
        }

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/get/profile/image/'
        });
    }

    this.getProfileData = function(empcode){
        json_data = {
            'empCode' : empcode
        }

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/get/profile/data/'
        });
    }

    this.getAttendanceCheck = function(empcode){
        json_data = {
            'empCode' : empcode
        }

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/check/attendance/'
        });
    }

    this.punchInTime = function(json_data){

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/attendance/punchin/'
        });
    }

    this.punchOutTime = function(json_data){

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/attendance/punchout/'
        });
    }

    this.checkRegularise = function(listjson_data){

        return $http({
            method:'post',
            data:listjson_data,
            url:'https://gapapi-100.appspot.com/api/checkregularise/attendance/'
        });
    }

    this.postRegularize = function(json_data){

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/regularise/attendance/'
        });

    }

    // this.regulariseAttendance = function()

    this.updateImageUrl = function(empcode, imagename){
        var json_data = {
            'empCode': empcode,
            'image_name':imagename
        }

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/save/image/info/'
        });
    }
    this.uploadImage = function(files){
        var form_data = new FormData();
        form_data.append('file', files[0]);
        console.log(files);
        console.log(form_data);
        
        console.log(form_data.get('file'));
        
        return $http({
            method:'POST',
            data:form_data,
            headers:{
                'Content-Type': undefined
            },
            transformRequest:angular.identity, 
            url:'https://gapapi-100.appspot.com/api/profile/upload/'
        });
    }


    this.postLeave = function(json_data){
        
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/add/leave/request/'
        });
    }

    this.getLeaveTask = function(empcode){
        var json_data = {
            'empCode':empcode
        }
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/leave/requestinfo/'
        });
    }

    this.wishHappyBirth = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/birthday/wish/'
        });
    }

    this.withDrawLeave = function(empCode){
        var json_data = {
            "empCode":empCode
        }
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/withdraw/leave/'
        });
    }

    this.getTaskList = function(empcode){
        var json_data = {
            "empCode":empcode
        }
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/leave/requestinfo/'
        });
    }

    this.resubmitLeave = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/resubmit/leave/'
        });
    }


});





(function () {
    'use strict';
 
    angular
        .module('mobileApp')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout) {
        var service = {};
 
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
 
        return service;
 
        function Login(username, password, callback) {
 
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            // $timeout(function () {
            //     var response;
            //     UserService.GetByUsername(username)
            //         .then(function (user) {
            //             if (user !== null && user.password === password) {
            //                 response = { success: true };
            //             } else {
            //                 response = { success: false, message: 'Username or password is incorrect' };
            //             }
            //             callback(response);
            //         });
            // }, 1000);
 
            /* Use this for real authentication
             ----------------------------------------------*/
             var json_data = {
				'username':username,
				'password' : password
			}

			console.log(json_data);

            $http.post('https://gapapi-100.appspot.com/api/post/login/', { json_data })
               .then(function (response) {
               	console.log(response);
                   callback(response);
               });
 
        }
 
        // function SetCredentials(username, password, id) {
        //     var authdata = Base64.encode(username + ':' + password);
 
        //     $rootScope.globals = {
        //         currentUser: {
        //             username: username,
        //             id: id,
        //             authdata: authdata
        //         }
        //     };
 
        //     // set default auth header for http requests
        //     $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
 
        //     // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
        //     var cookieExp = new Date();
        //     cookieExp.setDate(cookieExp.getDate() + 7);
        //     $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        // }

        function SetCredentials(username, password, id) {
            var authdata = Base64.encode(username + ':' + password);
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    id: id,
                    authdata: authdata
                },
                loggedIn : 1
            };
 
            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
 
            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }
 
        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }
 
    // Base64 encoding service used by AuthenticationService
    var Base64 = {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
})();