mobileApp.run(function ($rootScope, $location, $cookies, $http, $state, AuthenticationService) {


 $rootScope.globals = $cookies.getObject('globals') || {};

        if ($rootScope.globals.loggedIn ==1) {
            
            if ($location.path() =='/' || $location.path() ==''){
                
                $location.path('/home');
                // $rootScope.logininfo = $cookies.getObject('globals').currentUser.id;
            }else{
               $location.path($location.path()); 
            }
            // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
           
        }else{
            $location.path('/');
        }


});




mobileApp.controller('loginCtrl', ['$scope', 'Data', '$state', 'AuthenticationService', '$localStorage', function($scope, Data, $state, AuthenticationService, $localStorage){

	$scope.displayloader = false;
    $scope.wrongpsd = false;

    $scope.loginSubmit = function(username, password){

        $scope.displayloader = true;
		
		AuthenticationService.Login(username, password, function (response) {
                if (response.data.success == 1) {
                    $scope.displayloader = false;
                	
                    if(response.data.configure_data[7]==1){
                      AuthenticationService.SetCredentials(username, password, response.data.configure_data);
                    
                    $state.go('home');
                    
                    $localStorage.empdata = response.data;
                    $localStorage.empcode = username;

                    }
                    else{
                    	
                      // $state.go('resetpassword');
                    }
                } else {
                    $scope.displayloader = false;
                    $scope.wrongpsd = true;

                    $state.go('login')
                }
            });

	}

    $scope.goForgotPassword = function(){
        $state.go('forgot');
    }

}]);

mobileApp.controller('forgotpasswordCtrl', ['$scope', 'Data', '$localStorage', '$state', function($scope, Data, $localStorage, $state){

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    $scope.otpdiv = false;
    $scope.changepwddiv = true;

    $scope.displayloader = false;

    $scope.changePwd = function(empcode){
        $scope.displayloader = true;
        var otp = makeid();
        // alert(empcode+" "+otp);
        Data.sendOTP(empcode, otp)
        .then(function(response){
            if(response.data.success){
                $localStorage.otpEmpCode = empcode;
                $localStorage.otp = otp;
                $scope.otpdiv = true;
                $scope.changepwddiv = false;
                $scope.displayloader = false;
            }
        }).catch(function(response){

        });
    }

    $scope.enterOTP = function(otp, newpwd, confirmpwd){
        $scope.displayloader = true;
        if(otp==$localStorage.otp){
            if(newpwd==confirmpwd){
                Data.resetPassword($localStorage.otpEmpCode, newpwd)
                    .then(function(response){
                         $scope.displayloader = false;
                        $state.go('login');
                       
                    }).catch(function(response){
                        $state.go('resetpassword');
                    });
            }else{
                alert("password doesn't match");
            }
        }else{
            alert("entered otp is wrong");
        }
    }

}]);




mobileApp.controller('homeCtrl', ['$scope', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', function($scope, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location){

	$scope.logout = function(){

        $localStorage.imgsrc = '';
        $localStorage.empdata = '';
        $localStorage.empcode = '';
	
		AuthenticationService.ClearCredentials();
		$timeout(function () {
	        $location.path('/')
	    }, 1000);

	}

    $scope.displayloader = true;

    var time = new Date();
    var month = time .getMonth() + 1;
    var day = time .getDate();
    var year = time .getFullYear();
    if(month.toString().length==1){
        month = '0'+month.toString();
    }

    var monthname = time .getMonth();
    var currentdate =  month + "/" + day + "/" + year;
    var monthNames = ["Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $scope.fromdate = day+""+monthNames[monthname];
    $scope.todate = (day-7)+""+monthNames[monthname];
    console.log($scope.todate);
	
	// console.log($localStorage.empcode[0]['empCode']);

	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

	// console.log($rootScope.logininfo);
    $localStorage.login_info = $cookies.getObject('globals').currentUser.id;

	$scope.blankprofilepic = true;


	 Data.getImageUrl($localStorage.empdata.datasets[0]['empCode'])
    .then(function(response){
        $scope.imagedata = response.data.datasets;
        $scope.imgsrc = response.data.datasets[0]['imagePath']+response.data.datasets[0]['imageName'];
        $localStorage.imgsrc = $scope.imgsrc;
        $scope.shoimageUrl = true;
        $scope.displayloader = false;
        $rootScope.img_src =response.data.datasets[0]['imagePath']+response.data.datasets[0]['imageName'];
    	if(response.data.datasets){
    		$scope.blankprofilepic = false;
    	}
    }).catch(function(response){
        $scope.displayloader = false;

    });

    $scope.nolist = true;
    $scope.brthlist = false;

    Data.getBirthDay()
    .then(function(response){
        $scope.birthdaylist = response.data.configure_data;
       
        if(response.data.configure_data.length>0){
        	$scope.nolist = false;
        	$scope.brthlist = true;
        }
    }).catch(function(response){

    });

    $scope.goProfile = function(){
    	$state.go('profile');
    }

    $scope.goMobileDirectory = function(){
        $state.go('mobiledirectory');
    }

    $scope.goChangePwd = function(){
        $state.go('changepwd');
    }

    $scope.goFeedBack = function(){
        $state.go('feedback');
    }

    $scope.goAttendance = function(){
        $state.go('attendance');
    }

    $scope.goTask = function(){
        $state.go('task');
    }

    $scope.goLeave = function(){
        $state.go('leave')
    }

    $scope.goHolidays = function(){
        $state.go('holidays');
    }

    $scope.birthpop = false;
    $scope.showpopup = false;

    $scope.birthPop = function(){
        $scope.birthpop = true;
    }

    $scope.closeBirthPop = function(){
        $scope.birthpop = false;
    }

    $scope.wishBirtDay = function(empcode, firstname, officialmail){
                
        var json_data = {
            "empCode":empcode,
            "firstName":firstname, 
            "officealEmail":officialmail
        }
        

        Data.wishHappyBirth(json_data)
        .then(function(response){
            $scope.birthpop = false;
            $scope.showpopup = true;
            $timeout(function () {
                $scope.showpopup = false;
            }, 1000);
        }).catch(function(response){

        });
    }

    $scope.tasklist = '';

    Data.getTaskList($localStorage.empdata.datasets[0]['empCode'])
    .then(function(response){
        $scope.tasklist = response.data.leaveRequest_data[response.data.leaveRequest_data.length-1];
    }).catch(function(response){

    });


}]);

mobileApp.controller('taskCtrl', ['$scope', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', function($scope, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location){

    $scope.goHome = function(){
        $state.go('home');
    }

    $scope.displayloader = false;
    $scope.alertshow = false;
    $scope.alertmessage = '';

    $scope.logininfo = $localStorage.login_info
    $scope.empcode = $localStorage.empdata.datasets[0]['empCode'];
    $scope.imgsrc = $localStorage.imgsrc;

    Data.getLeaveTask($localStorage.empdata.datasets[0]['empCode'])
    .then(function(response){
        $scope.leaverequest = response.data.leaveRequest_data[response.data.leaveRequest_data.length - 1];
    }).catch(function(response){

    });

    $scope.withDrawLeave = function(){
       Data.withDrawLeave($localStorage.empdata.datasets[0]['empCode'])
       .then(function(response){
            $scope.alertmessage = 'Successfully withdrawn';
            $scope.alertshow = true;

            $timeout(function () {
                $state.go('home');
                $scope.alertshow = false;
            }, 1000);
       }).catch(function(response){

       }); 
    }

    $scope.msg = '';

    $scope.resubmitLeave = function(leaveType, reason, duration, startDate, endDate, managerComment, msg){
        // console.log(leaveType+" "+reason+" "+duration+" "+startDate+" "+endDate+" "+managerComment+" "+msg);
        var json_data = {
            "empCode":$localStorage.empdata.datasets[0]['empCode'],
            "leaveType":leaveType, 
            "reason":reason, 
            "duration":duration, 
            "startDate":startDate, 
            "endDate":endDate, 
            "managerComment":managerComment, 
            "message":msg
        }
        Data.resubmitLeave(json_data)
        .then(function(response){
            $scope.alertmessage = 'Successfully resubmitted';
            $scope.alertshow = true;
            $timeout(function () {
               $state.go('home');
               $scope.alertshow = false;
            }, 1000);
        }).catch(function(response){

        });
    }

}]);


mobileApp.controller('profileCtrl', ['$scope', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', function($scope, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location){

	$scope.goHome = function(){
		$state.go('home');
	}

	$scope.goPayroll = function(){
		$state.go('payroll');
	}

    $scope.displayloader = true;

	$scope.img_src = $localStorage.imgsrc;

	// console.log($localStorage.empcode);
 //    console.log($localStorage.empdata.configure_data);

    $scope.headpara = $localStorage.empdata.configure_data;

    Data.getEployeeDetails($localStorage.empdata.datasets[0]['empCode'])
    .then(function(response){
        $scope.empdetails = response.data.response[0];
        // console.log(response.data.response[0]);
        $scope.displayloader = false;
    }).catch(function(response){

    });




    $scope.uploadFile = function(){

        $scope.displayloader = true;

        var filename = event.target.files[0].name;
             // console.log(event.target.files);

            Data.updateImageUrl($localStorage.empdata.datasets[0]['empCode'], filename)
            .then(function(response){

            }).catch(function(response){

            });

            // console.log(event.target.files[0]);
            Data.uploadImage(event.target.files)
            .then(function(response){

                  Data.getImageUrl($localStorage.empdata.datasets[0]['empCode'])
                    .then(function(response){
                        $scope.imagedata = response.data.datasets;
                        $scope.imgsrc = response.data.datasets[0]['imagePath']+response.data.datasets[0]['imageName'];
                        $localStorage.imgsrc = $scope.imgsrc;
                        $scope.shoimageUrl = true;
                        $scope.displayloader = false;
                        $rootScope.img_src =response.data.datasets[0]['imagePath']+response.data.datasets[0]['imageName'];
                        if(response.data.datasets){
                            $scope.blankprofilepic = false;
                            $scope.displayloader = false;
                            $state.go($state.current, $state.params, { reload: true });
                        }
                    }).catch(function(response){
                        $scope.displayloader = false;

                    });

            }).catch(function(response){

            });

        };






}]);

mobileApp.controller("changepwdCtrl", ['$scope', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', function($scope, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location){


   
    $scope.changePwd = function(oldpwd, newpwd, confpwd){
        if(newpwd==confpwd){
            Data.changePassword($localStorage.empdata.datasets[0]['empCode'], oldpwd, newpwd)
            .then(function(response){
                console.log(response.data.datasets['confirmation']);
                if(response.data.datasets['confirmation'] == 1){
                    AuthenticationService.ClearCredentials();
                    $timeout(function () {
                        $location.path('/')
                    }, 1000);
                } else{
                    alert("old password is wrong");
                    $state.go('changepwd');
                }
            }).catch(function(response){

            });
        }
    }

    $scope.goHome = function(){
        $state.go('home');
    }

}]);

mobileApp.controller('mobiledirectoryCtrl', ['$scope', 'empimagelist', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', function($scope, empimagelist, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location){

    $scope.displayloader = true;

    if(empimagelist){
        $scope.displayloader = false;
    }
    
    $scope.empimagelist = empimagelist;

    $scope.empDetailsById = function(empcode){
        $state.go('empdetails', {'empcode' : empcode});        
    }

    $scope.goHome = function(){
        $state.go('home');
    }

}]);

mobileApp.controller('empdetailsCtrl', ['$scope', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', '$stateParams', function($scope, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location, $stateParams){

    // var empcode = $stateParams[0];
    // console.log($stateParams.empcode);

    $scope.displayloader = true;

    Data.getProfileImage($stateParams.empcode)
    .then(function(response){
        $scope.image = response.data.datasets[0];
        console.log($scope.image);
    }).catch(function(response){

    });

    Data.getProfileData($stateParams.empcode)
    .then(function(response){
        $scope.pfdata = response.data.datasets[0];
        console.log($scope.pfdata);
        $scope.displayloader = false;
    }).catch(function(response){

    });

    $scope.goMobileDirectory = function(){
        $state.go('mobiledirectory');
    }

}]);

mobileApp.controller('feedbackCtrl', ['$scope', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', function($scope, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location){

    $scope.goHome = function(){
        $state.go('home');
    }

    $scope.awesome = '';
    $scope.happy = '';
    $scope.unsure = '';
    $scope.upset = '';
    $scope.love = '';
    $scope.emtext = '';

    $scope.message = '';
    $scope.showpopup = false;


    $scope.feedBackSubmit = function(emotion, emotiontext){
        if(emotion=='Awesome'){
            $scope.awesome = emotion;
        }else if(emotion=='Happy'){
            $scope.happy = emotion;
        }else if(emotion=='Unsure'){
            $scope.unsure = emotion;
        }else if(emotion=='Upset'){
            $scope.upset = emotion;
        }else if(emotion=='Love'){
            $scope.love = emotion;
        }
        $scope.emtext = emotiontext;

        // console.log($scope.awesome+" "+$scope.happy+" "+$scope.unsure+" "+$scope.upset+" "+$scope.love+" "+emotiontext);
        
        var json_Data = {
            'love':$scope.love,
            'upset':$scope.upset,
            'awesome':$scope.awesome,
            'handroidy':$scope.happy,
            'unsure': $scope.unsure,
            'message':$scope.emotiontext,
            'empCode':$localStorage.empdata.datasets[0]['empCode']
        }


        Data.feedbackSubmit(json_Data)
        .then(function(response){
            $scope.message = 'Thanks for sharing your experience...';
            $scope.showpopup = true;
            $timeout(function () {
                $scope.showpopup = false;
                $state.go('home');
            }, 2000);

        }).catch(function(response){
            $scope.message = 'sorry!!!';
            $scope.showpopup = true;
            $timeout(function () {
                $scope.showpopup = false;
            }, 2000);
        });

    }

     $scope.showpopup = false;

}]);

mobileApp.controller('attendanceCtrl', ['$scope', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', function($scope, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location){

    console.log($localStorage.empdata.datasets[0]['empCode']);
    $scope.displayloader = true;

    $scope.goHome = function(){
        $state.go('home');
    }

    var time = new Date();
    
    var punchtime = ("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2);

    var month = time .getMonth() + 1;
    var day = time .getDate();
    var year = time .getFullYear();
    if(month.toString().length==1){
        month = '0'+month.toString();
    }
    if(day.toString().length==1){
        day = '0'+day.toString();
    }
    var punchdate =  month + "/" + day + "/" + year;

    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }

    var dayin = daysInMonth(month-1, year)+5;
    console.log(dayin);

    $scope.fromdate = punchdate;
    if(day>5){
        $scope.todate = month + "/" + (day-5) + "/" + year;
    }else{
        $scope.todate = (month-1) + "/" + (dayin-5) + "/" + year;
    }
    


    // var punchin = document.getElementById('punchin');
    // var punchout = document.getElementById('punchout');
    console.log($localStorage.empdata.datasets[0]['empCode']);

    Data.getAttendanceCheck($localStorage.empdata.datasets[0]['empCode'])
    .then(function(response){

        $scope.attendance_data = response.data.Attendance_data;

        

        $scope.displayloader = false;

    }).catch(function(response){

        $scope.displayloader = false;

    });


    // $scope.puncIn = function(){

    //     json_data = {
    //         'empCode' : $localStorage.empdata.datasets[0]['empCode'],
    //         'reportInTime': punchtime,
    //         'reportInAddress' : '',
    //         'inAddrInGeoFans': '',
    //         'date': punchdate
    //     }

    //     Data.punchInTime(json_data)
    //     .then(function(response){
    //         $state.go($state.current, $state.params, { reload: true });
    //     }).catch(function(response){

    //     });
        
    // }

    // $scope.punchOut = function(){

    //     json_data = {
    //         'empCode' : $localStorage.empdata.datasets[0]['empCode'],
    //         'reportOutTime': punchtime,
    //         'reportOutAddress' : '',
    //         'outAddrOutGeoFans': ''
    //     }

    //     Data.punchOutTime(json_data)
    //     .then(function(response){
    //         $state.go($state.current, $state.params, { reload: true });
    //     }).catch(function(response){

    //     });
        
    // }

    // console.log('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en');

   
        // function success(position) {
            
        //     var GEOCODING = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';

        //     $.getJSON(GEOCODING).done(function(location) {
        //         console.log(location.results[0]['formatted_address']);
                
        //     })

        // }

        // function error(err) {
        //     console.log(err)
        // }

        // navigator.geolocation.getCurrentPosition(success, error);



        $scope.puncIn = function(){
            

                    json_data = {
                        'empCode' : $localStorage.empdata.datasets[0]['empCode'],
                        'reportInTime': punchtime,
                        // 'reportInAddress' : location.results[0]['formatted_address'],
                        'reportInAddress' : '',
                        'inAddrInGeoFans': '',
                        'date': punchdate
                    }


                    Data.punchInTime(json_data)
                    .then(function(response){
                        
                        $state.go($state.current, $state.params, { reload: true });
                        
                    }).catch(function(response){

                    });
                    
                }

                $scope.punchOut = function(){

                    json_data = {
                        'empCode' : $localStorage.empdata.datasets[0]['empCode'],
                        'reportOutTime': punchtime,
                        // 'reportOutAddress' : location.results[0]['formatted_address'],
                        'reportOutAddress' : '',
                        'outAddrOutGeoFans': ''
                    }

                    Data.punchOutTime(json_data)
                    .then(function(response){
                        $state.go($state.current, $state.params, { reload: true });
                    }).catch(function(response){

                    });
                    
                }


        $scope.checkbox = false;
        $scope.todateClick = function(){
            // console.log(angular.element('#calendarDay')[0].innerText);
            var tdate = angular.element('#calendarDay')[0].innerText;
            var fdate = angular.element('#calendarDay2')[0].innerText;
            
           
            var intervaldate = fdate.split("/")[1]-tdate.split("/")[1];
            if(fdate.split("/")[0]!=tdate.split("/")[0]){
                intervaldate = intervaldate + (fdate.split("/")[0]-tdate.split("/")[0])*30;
            }


            var listdate = [];

            var dyt = parseInt(tdate.split("/")[1]);
            var fdt = '';
            var mnth = month-1;
            if(mnth.toString().length==1){
                mnth = '0'+mnth.toString();
            }
            for(i = 0; i< intervaldate; i++){
                
                if(dyt<daysInMonth(month-1, year)){
                    fdt = dyt;
                    
                    if(fdt.toString().length==1){
                        fdt = '0'+fdt.toString();
                    }
                    listdate.push(mnth + "/" + fdt + "/" + year);
                }else{
                    fdt = ((dyt+1)-daysInMonth(month-1, year));
                    if(fdt.toString().length==1){
                        fdt = '0'+fdt.toString();
                    }
                    if(month.toString().length==1){
                        month = '0'+month.toString();
                    }
                    listdate.push(month + "/" + fdt + "/" + year);
                }
                dyt++; 
            }

            $scope.list_date = listdate;

            console.log($scope.list_date);

            var json_data = {
                'empCode':$localStorage.empdata.datasets[0]['empCode'],
                'date':tdate
            }

            var listjson_data = [json_data];
            console.log(listjson_data);

            Data.checkRegularise(json_data)
            .then(function(response){
                $scope.checkbox = true;
                console.log(response.data);

            }).catch(function(response){
                $scope.checkbox = false;
            });

            // Data.regulariseAttendance()
            // .then(function(response){

            //     console.log(response.data);

            // }).catch(function(response){

            // });
        }


        $scope.selectedList = {};
        $scope.datelog = [];

        $scope.regulariseFunc = function () {
            angular.forEach($scope.selectedList, function (selected, day) {
                if (selected) {
                //    console.log(day);
                   $scope.datelog.push(day);

                }
            });
            $localStorage.datelistlog = $scope.datelog;
            $state.go('regularize');
        };




}]);

mobileApp.controller('regularizeCtrl', ['$scope', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', '$stateParams', function($scope, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location, $stateParams){

    // console.log($localStorage.datelistlog);
    // console.log($localStorage.empdata.datasets[0]['empCode']);

    $scope.datelog = $localStorage.datelistlog;

    $scope.goHome = function(){
        $localStorage.datelistlog = '';
        $state.go('attendance');
    }

    $scope.alertmessage = '';

    $scope.intime = [];
    $scope.datein = [];
    $scope.outtime = [];
    $scope.dateout = [];
    $scope.message = [];

    $scope.showalert = false;

    $scope.submitRegularize = function(){
        // console.log($scope.timein+" "+$scope.datein+" "+$scope.timeout+" "+$scope.dateout);
        angular.forEach($scope.datelog, function(value, key) {
            var json_data = {
                'empCode':$localStorage.empdata.datasets[0]['empCode'],
                'date':$scope.datein[key],
                'reportInTime':$scope.intime[key],
                'reportOutTime':$scope.outtime[key],
                'remark':$scope.message[key]
            }
            var listjsondata = [json_data];

          Data.postRegularize(listjsondata)
          .then(function(response){
            $scope.showalert = true;
             $scope.alertmessage = 'Successfully regularized';

             $timeout(function () {
                $state.go('photo-gallery.myattendance');
            }, 2000);

          }).catch(function(response){
            $scope.showalert = true;
            $scope.alertmessage = 'something wrong!!';

            $timeout(function () {
                $state.go('photo-gallery.myattendance');
            }, 2000);

          });

        });
    }

    
}]);

mobileApp.controller('leaveCtrl', ['$scope', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', '$stateParams', function($scope, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location, $stateParams){

    
    $scope.goHome = function(){
        $state.go('home');
    }

    $scope.leavetype = '';
    $scope.leavereason = '';
    $scope.leaveduration = '';
    $scope.startdate = '';
    $scope.enddate = '';
    $scope.otherreason = '';

    $scope.alertmessage = '';

    $scope.alertshow = false;
    
    $scope.submitLeave = function(leavetype, leavereason, leaveduration, startdate, enddate, otherreason){
        $scope.leavetype = leavetype;
        $scope.leavereason = leavereason;
        $scope.leaveduration = leaveduration;
        $scope.startdate = startdate;
        $scope.enddate = enddate;
        $scope.otherreason = otherreason;
        // console.log($scope.leavetype+" "+$scope.leavereason+" "+$scope.leaveduration+" "+$scope.startdate+" "+$scope.enddate+" "+$scope.otherreason);
        // console.log($localStorage.empdata.datasets[0]['empCode']);
        var json_data = {
            'empCode': $localStorage.empdata.datasets[0]['empCode'],
            'leaveType':$scope.leavetype,
            'reason':$scope.leavereason,
            'duration':$scope.leaveduration,
            'startDate':$scope.startdate,
            'endDate':$scope.enddate,
            'message':$scope.otherreason,
            'managerComment':''
        }

        Data.postLeave(json_data)
        .then(function(response){
            $scope.alertmessage = 'Submitted successfully';
            $scope.alertshow = true;

            
            $timeout(function () {
                $state.go('home');
            }, 1000);

        }).catch(function(response){
            $scope.alertmessage = 'Something is wrong';
        });
    }

}]);

mobileApp.controller('holidaysCtrl', ['$scope', 'holidaylist', 'Data', '$state', '$rootScope', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', '$stateParams', function($scope, holidaylist, Data, $state, $rootScope, AuthenticationService, $cookies, $localStorage, $timeout, $location, $stateParams){

    $scope.holidaylist = holidaylist;

    $scope.goHome = function(){
        $state.go('home');
    }

}]);