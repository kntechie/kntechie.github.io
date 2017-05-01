define(function(){

var coreModule = angular.module('coreModule',['ngRoute']);

coreModule.config(['$routeProvider',function($routeProvider) {

$routeProvider.
    when('/validation', {
        templateUrl: 'app/validation.html'
    }).
	otherwise({
        redirectTo: '/validation'
    });
	
}]);coreModule.controller('validationController',function($scope, validatorsService){

$('.alert').hide();
$scope.error = {};
$scope.warning = {};
$scope.errorMessages = [];
$scope.warningMessages = [];

$(function(){
   $('.closeAlert').click(function(){
		$('.alert').hide();
   });
});

$scope.$watchGroup(['warning.ageWarningError', 'error.firstNameError', 'error.lastNameError', 'error.emailAddressError', 'error.ageError', 'error.passwordError', 'error.userNameError'], function(){
	$scope.totalErrors = 0;
	$scope.totalWarnings = 0;
	$scope.errorMessages = [];
	$scope.warningMessages = [];
	angular.forEach($scope.error, function(value, key){
		if(value){
			$scope.totalErrors = $scope.totalErrors + 1;
			var error = value;
			$scope.errorMessages.push(error);
		}
	});
	angular.forEach($scope.warning, function(value, key){
		if(value){
			$scope.totalWarnings = $scope.totalWarnings + 1;
			var error = value;
			$scope.warningMessages.push(error);
		}
	});
});

$scope.checkValidation = function (field, allFields) {

if(field === 'firstName' || allFields == true){
	if(validatorsService.requiredValidation($scope.firstName) == true){
		$scope.error.firstNameError = "";
	} else {
		$scope.error.firstNameError = "First Name is required";
	}
}
if(field === 'lastName' || allFields == true){
	if(validatorsService.requiredValidation($scope.lastName) == true){
		$scope.error.lastNameError = "";
	} else {
		$scope.error.lastNameError = "Last Name is required";
	}
}
if(field === 'emailAddress' || allFields == true){
	if(validatorsService.requiredValidation($scope.emailAddress) == true){
		$scope.error.emailAddressError = "";
	} else {
		$scope.error.emailAddressError = "Email Address is required";
	}
}
if(field === 'age' || allFields == true){
	if(validatorsService.requiredValidation($scope.age) == true){
		$scope.error.ageError = "";
	} else {
		$scope.error.ageError = "Age is required";
	}
	if($scope.age){
		if(validatorsService.minValidation($scope.age, 18) == true){ 
			$scope.warning.ageWarningError = "";
		} else {
			$scope.warning.ageWarningError = "You should be more than 18 years";
		} 
	}
}
if(field === 'password' || allFields == true){
	if(validatorsService.requiredValidation($scope.password) == true){
		$scope.error.passwordError = "";
	} else {
		$scope.error.passwordError = "Password is required";
	}
}
if(field === 'userName' || allFields == true){
	if(validatorsService.requiredValidation($scope.userName) == true){
		$scope.error.userNameError = "";
	} else {
		$scope.error.userNameError = "User name is required";
	}
}
}

$scope.submitData = function(){
	$scope.checkValidation(null, true);
	if(($scope.error.userNameError || $scope.error.passwordError || $scope.error.ageError || $scope.error.emailAddressError || $scope.error.lastNameError || $scope.error.firstNameError) || (!$scope.userName || !$scope.password || !$scope.age || !$scope.emailAddress || !$scope.lastName || !$scope.firstName)){	
		$('.alert').hide();
		$('#myModal').modal('show');
	} else {
		$('.alert').show();
		$scope.error = {};
		$scope.warning = {};
		$scope.errorMessages = [];
		$scope.warningMessages = [];
		$scope.userName	= "";
		$scope.password = "";
		$scope.age = "";
		$scope.emailAddress = "";
		$scope.lastName = "";
		$scope.firstName = "";
	}
}});

coreModule.service('validatorsService', function() {
	// Declare if you need default template rather returning false when the validation fails - default message templates below
	var DEFAULT_TEMPLATE = false;
	var ERROR_CLASS = true;

	// Constants, Variable declarations (Default Message Templates)
	var REQUIRED_TEMPLATE = "This Field is Required";
	var ALPHABETS_TEMPLATE = "This field should contains only alphabets";
	var ALPHABETS_SPACE_TEMPLATE = "This field should contains only alphabets and space";
	var ALPHABETS_NUMBERS_TEMPLATE = "This field should contains only alphabets and numbers";
	var ALPHABETS_NUMBERS_SPACE_TEMPLATE = "This field should contains only alphabets, numbers and space";
	var NUMBERS_TEMPLATE = "This field should contains only numbers";
	var PASSWORD_MATCH_TEMPLATE = "Password matches";
	var EMAIL_TEMPLATE = "Please enter a valid email id";
	var PASSWORD_MAX = "Password should be maximum 15 characters";
	var PASSWORD_MIN = "Password should be minimum 5 characters";
	var PASSWORD_LOWER = "Password should have atleast 1 lower case character";
	var PASSWORD_UPPER = "Password should have atleast 1 upper case character";
	var PASSWORD_SPECIAL = "Password should have atleast 1 special character";
	var DOB_FUTURE_TEMPLATE = "Date of birth cannot be in future";
	var DOB_18_PLUS_TEMPLATE = "You should be 18 years and above";
	var MIN_TEMPLATE = "This field should be minimum ";
	var CHARACTERS = " characters";
	
	// Constants, Variable declarations (Message Templates will get added if the label name is sent as a parameter)
	var LABEL_REQUIRED_TEMPLATE = " is Required";
	var LABEL_ALPHABETS_TEMPLATE = " should contains only alphabets";
	var LABEL_ALPHABETS_SPACE_TEMPLATE = " should contains only alphabets and space";
	var LABEL_ALPHABETS_NUMBERS_TEMPLATE = " should contains only alphabets and numbers";
	var LABEL_ALPHABETS_NUMBERS_SPACE_TEMPLATE = " should contains only alphabets, numbers and space";
	var LABEL_NUMBERS_TEMPLATE = " should contains only numbers";
	var LABEL_MIN_TEMPLATE = " should be minimum ";
	
	// Regex Patterns declarations
	var ALPHABETS_PATTERN = "^[a-zA-Z]+$";
	var ALPHABETS_SPACE_PATTERN = "^[a-zA-Z ]+$";
	var ALPHABETS_NUMBERS_SPACE_PATTERN = "^[a-zA-Z0-9\ ]*$";
	var ALPHABETS_NUMBERS_PATTERN = "^[a-zA-Z0-9]*$";
	var NUMBERS_PATTERN = "^[0-9]*$";
	var EMAIL_PATTERN = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
	

	// Reusable validators initialization
    this.requiredValidation = publicRequiredValidation;
    this.alphaValidation = publicAlphaValidation;
    this.alphaSpaceValidation = publicAlphaSpaceValidation;
    this.alphaNumberValidation = publicAlphaNumberValidation;
    this.numberValidation = publicNumberValidation;
    this.passwordValidation = publicPasswordValidation;
    this.passwordMatchValidation = publicPasswordMatchValidation;
    this.emailValidation = publicEmailValidation;
    this.alphaNumberSpaceValidation = publicAlphaNumberSpaceValidation;
    this.dobFutureValidation = publicDobFutureValidation;
    this.dob18PlusValidation = publicDob18PlusValidation;
    this.minLengthValidation = publicMinLengthValidation;
	this.minValidation = publicMinValidation;
	
	//Common funtion for testing Regex patterns
	function regexTest(value, regexPattern){
		var pattern = new RegExp(regexPattern);
		if (pattern.test(value)) {
			return true;
		} else {
			return false;
		}
    }

    // Function for required field validation
    function publicRequiredValidation(value, label){
        if(!value){
			if(label){
				return label + LABEL_REQUIRED_TEMPLATE;
			}else if(DEFAULT_TEMPLATE) {
				return REQUIRED_TEMPLATE;
			} else {
				return false;
			}
        } else {
			return true;
        }
    }

    // Function for alphabet validation 
	function publicAlphaValidation(value, label){
		if(value){
			if(regexTest(value, ALPHABETS_PATTERN) === true){
				return true;
			} else {
				if(label){
					return label + LABEL_ALPHABETS_TEMPLATE;
				}else if(DEFAULT_TEMPLATE) {
					return ALPHABETS_TEMPLATE;
				} else {
					return false;
				}				
			}
		}
    }

    // Function for alphabet space validation 
	function publicAlphaSpaceValidation(value, label){	
		if(value){
			if(regexTest(value, ALPHABETS_SPACE_PATTERN) === true){
				return true;
			} else {
				if(label){
					return label + LABEL_ALPHABETS_SPACE_TEMPLATE;
				}else if(DEFAULT_TEMPLATE) {
					return ALPHABETS_SPACE_TEMPLATE;
				} else {
					return false;
				}				
			}
		}
    }

    // Function for alphabet Number validation 
	function publicAlphaNumberValidation(value){
        if(value){
			if(regexTest(value, ALPHABETS_NUMBERS_PATTERN) === true){
				return true;
			} else {
				if(label){
					return label + LABEL_ALPHABETS_NUMBERS_TEMPLATE;
				}else if(DEFAULT_TEMPLATE) {
					return ALPHABETS_NUMBERS_TEMPLATE;
				} else {
					return false;
				}				
			}
		}
    }

    // Function for number validation 
	function publicNumberValidation(value){
		if(value){
			if(regexTest(value, NUMBERS_PATTERN) === true){
				return true;
			} else {
				if(label){
					return label + LABEL_NUMBERS_TEMPLATE;
				}else if(DEFAULT_TEMPLATE) {
					return NUMBERS_TEMPLATE;
				} else {
					return false;
				}				
			}
		}
    }

    // Function for password match validation 
	function publicPasswordMatchValidation(value, confirmValue){
        if(value && confirmValue){
			if (value === confirmValue) {
				return true;
			} else {
				if(DEFAULT_TEMPLATE) {
					return PASSWORD_MATCH_TEMPLATE;
				} else {
					return false;
				}	
			}
        }
    }

    // Function for email validation 
	function publicEmailValidation(value){
        if(value){
			if(regexTest(value, EMAIL_PATTERN) === true){
				return true;
			} else {
				if(DEFAULT_TEMPLATE) {
					return EMAIL_TEMPLATE;
				} else {
					return false;
				}				
			}
		}
    }

    // Function for password validation 
	function publicPasswordValidation(value){
        var string = value;
		if(string.length >= 5){
            if(string.length <= 15){
                var checkSpecial = /[*@!#%&()^~{}]+/.test(string);
                var checkUpper = /[A-Z]+/.test(string);
                var checkLower = /[a-z]+/.test(string);
                var fullCheck = false;
                        if (checkLower) {
							if(checkUpper){
								if(checkSpecial){
								    fullCheck = true;
								} else {
									fullCheck = PASSWORD_SPECIAL;
								}
							} else {
								fullCheck = PASSWORD_UPPER;
							}
                        } else {
							fullCheck = PASSWORD_LOWER;
                        }
                	return fullCheck;
                } else {
				return PASSWORD_MAX;
            }
        } else {
            return PASSWORD_MIN;
        }
    }

    // Function for comment validation
	function publicAlphaNumberSpaceValidation(value, label){
        if(value){
			if(regexTest(value, ALPHABETS_NUMBERS_SPACE_PATTERN) === true){
				return true;
			} else {
				if(label){
					return label + LABEL_ALPHABETS_NUMBERS_SPACE_TEMPLATE;
				}else if(DEFAULT_TEMPLATE) {
					return ALPHABETS_NUMBERS_SPACE_TEMPLATE;
				} else {
					return false;
				}				
			}
		}
    }

    // Function for Dob Future validation 
	function publicDobFutureValidation(value){
	
		var now = new Date;
		var target = new Date(value);
		if (target.getFullYear() > now.getFullYear()) 
		{
			if(DEFAULT_TEMPLATE) {
				return DOB_FUTURE_TEMPLATE;
			} else {
				return false;
			}
		}
		else if (target.getFullYear() == now.getFullYear()) 
		{
			if (target.getMonth() > now.getMonth()) {
				if(DEFAULT_TEMPLATE) {
					return DOB_FUTURE_TEMPLATE;
				} else {
					return false;
				}
			} 
			else if(target.getMonth() == now.getMonth())
			{
				if (target.getDate() >= now.getDate()) {
					if(DEFAULT_TEMPLATE) {
						return DOB_FUTURE_TEMPLATE;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		} else {
			return true;
		}
    }

    // Function for Dob 18 plus validation 
	function publicDob18PlusValidation(value){

		function isValidDate(date, month, year) {
			var flagDate = new Date(year, month, date);
			if (flagDate.getFullYear() != year || flagDate.getMonth() != month || flagDate.getDate() != date)
			{
				return false;
			}
			return true;
		}
		
		function calculateDiffYear(date, month, year) {
			var cur = new Date();
			var diff = Math.floor((cur.getTime() - new Date(year, month, date)) / (60 * 60 * 24 * 1000));
				diff -= Math.floor((cur.getFullYear() - year) / 4);
			
			return diff / 365;
		}

		var target = new Date(value);

		var date = target.getDate();
		var month = target.getMonth();
		var year = target.getFullYear();
		
		if (!isValidDate(date, month, year) || calculateDiffYear(date, month, year) < 18) {
			if(DEFAULT_TEMPLATE) {
				return DOB_18_PLUS_TEMPLATE;
			} else {
				return false;
			}
		} else {
			return true;
		}
    }

    // Function for Min Length validation 
	function publicMinLengthValidation(value, lengthValue, label){
        var string = value;
        if(string.length >= lengthValue){
			return true;
        } else {
			if(label) {
				return label + LABEL_MIN_TEMPLATE + lengthValue + CHARACTERS;
			} else if(DEFAULT_TEMPLATE) {
				return MIN_TEMPLATE + lengthValue + CHARACTERS;
			} else {
				return false;
			}
        }
    }
	
	// Function for Min Length validation 
	function publicMinValidation(value, lengthValue, label){
        var string;
		if(typeof value == 'string'){
			string = parseInt(value);
		} else {
			string = value;
		}
        if(string >= lengthValue){
			return true;
        } else {
			if(label) {
				return label + LABEL_MIN_TEMPLATE + lengthValue + CHARACTERS;
			} else if(DEFAULT_TEMPLATE) {
				return MIN_TEMPLATE + lengthValue + CHARACTERS;
			} else {
				return false;
			}
        }
    }
});


});