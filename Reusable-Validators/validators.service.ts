/*
Author: DESS - Chennai
Description: Reusable validation services - Angular2
Services:'ValidatorsService'
Version: 1.0.0
*/

// Usage - 
// 1. import ValidatorsService into your app.module.ts and add this service into the providers array
// 2. import ValidatorsService into your component in which you want to use the service and create an instance of this service in the constructor
// 3. using the instance access the validation functions in your components

import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorsService {

	constructor() { }
  
    // Declare if you need default template rather returning false when the validation fails - default message templates below
	DEFAULT_TEMPLATE: string = true;

	// Constants, Variable declarations (Default Message Templates)
	REQUIRED_TEMPLATE: string = "This Field is Required";
	ALPHABETS_TEMPLATE: string = "This field should contains only alphabets";
	ALPHABETS_SPACE_TEMPLATE: string = "This field should contains only alphabets and space";
	ALPHABETS_NUMBERS_TEMPLATE: string = "This field should contains only alphabets and numbers";
	ALPHABETS_NUMBERS_SPACE_TEMPLATE: string = "This field should contains only alphabets, numbers and space";
	NUMBERS_TEMPLATE: string = "This field should contains only numbers";
	PASSWORD_MATCH_TEMPLATE: string = "Password matches";
	EMAIL_TEMPLATE: string = "Please enter a valid email id";
	PASSWORD_MAX: string = "Password should be maximum 15 characters";
	PASSWORD_MIN: string = "Password should be minimum 5 characters";
	PASSWORD_LOWER: string = "Password should have atleast 1 lower case character";
	PASSWORD_UPPER: string = "Password should have atleast 1 upper case character";
	PASSWORD_SPECIAL: string = "Password should have atleast 1 special character";
	DOB_FUTURE_TEMPLATE: string = "Date of birth cannot be in future";
	DOB_18_PLUS_TEMPLATE: string = "You should be 18 years and above";
	MIN_TEMPLATE: string = "This field should be minimum ";
	CHARACTERS: string = " characters";
	
	// Constants, Variable declarations (Message Templates will get added if the label name is sent as a parameter)
	LABEL_REQUIRED_TEMPLATE: string = " is Required";
	LABEL_ALPHABETS_TEMPLATE: string = " should contains only alphabets";
	LABEL_ALPHABETS_SPACE_TEMPLATE: string = " should contains only alphabets and space";
	LABEL_ALPHABETS_NUMBERS_TEMPLATE: string = " should contains only alphabets and numbers";
	LABEL_ALPHABETS_NUMBERS_SPACE_TEMPLATE: string = " should contains only alphabets, numbers and space";
	LABEL_NUMBERS_TEMPLATE: string = " should contains only numbers";
	LABEL_MIN_TEMPLATE: string = " should be minimum ";
	
	// Regex Patterns declarations
	ALPHABETS_PATTERN: string = "^[a-zA-Z]+$";
	ALPHABETS_SPACE_PATTERN: string = "^[a-zA-Z ]+$";
	ALPHABETS_NUMBERS_SPACE_PATTERN: string = "^[a-zA-Z0-9\ ]*$";
	ALPHABETS_NUMBERS_PATTERN: string = "^[a-zA-Z0-9]*$";
	NUMBERS_PATTERN: string = "^[0-9]*$";
	EMAIL_PATTERN: string = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
	
	// Function for required field validation	
	requiredValidation(value, label){
		var requiredLocalValue;	
		if(!value){
			if(label){
				requiredLocalValue = label + this.LABEL_REQUIRED_TEMPLATE;
			}else if(this.DEFAULT_TEMPLATE) {
				requiredLocalValue = this.REQUIRED_TEMPLATE;
			} else {
				requiredLocalValue = false;
			}
		} else {
			requiredLocalValue = true;
		}		
		return requiredLocalValue;
	}
	
	//Common funtion for testing Regex patterns
	regexTest(value, regexPattern){
		var pattern = new RegExp(regexPattern);
		if (pattern.test(value)) {
			return true;
		} else {
			return false;
		}
	}
	
	// Function for alphabet validation 
	alphaValidation(value, label){
	var alphaLocalValue;
	if(value){
		if(this.regexTest(value, this.ALPHABETS_PATTERN) === true){
			alphaLocalValue = true;
		} else {
			if(label){
				alphaLocalValue = label + this.LABEL_ALPHABETS_TEMPLATE;
			}else if(this.DEFAULT_TEMPLATE) {
				alphaLocalValue = this.ALPHABETS_TEMPLATE;
			} else {
				alphaLocalValue = false;
			}				
		}
	}
	return alphaLocalValue;
	}
	
	// Function for alphabet space validation 
	alphaSpaceValidation(value, label){
	var alphaSpaceLocalValue;	
	if(value){
		if(this.regexTest(value, this.ALPHABETS_SPACE_PATTERN) === true){
			alphaSpaceLocalValue = true;
		} else {
			if(label){
				alphaSpaceLocalValue = label + this.LABEL_ALPHABETS_SPACE_TEMPLATE;
			}else if(this.DEFAULT_TEMPLATE) {
				alphaSpaceLocalValue = this.ALPHABETS_SPACE_TEMPLATE;
			} else {
				alphaSpaceLocalValue = false;
			}				
		}
	}
	return alphaSpaceLocalValue;
	}
	
	// Function for alphabet Number validation 
	alphaNumberValidation(value, label){
	var alphaNumberLocalValue;
	if(value){
		if(this.regexTest(value, this.ALPHABETS_NUMBERS_PATTERN) === true){
			alphaNumberLocalValue = true;
		} else {
			if(label){
				alphaNumberLocalValue = label + this.LABEL_ALPHABETS_NUMBERS_TEMPLATE;
			}else if(this.DEFAULT_TEMPLATE) {
				alphaNumberLocalValue = this.ALPHABETS_NUMBERS_TEMPLATE;
			} else {
				alphaNumberLocalValue = false;
			}				
		}
	}
	return alphaNumberLocalValue;
	}
	
	// Function for number validation 
	numberValidation(value, label){
	var numberLocalValue;
	if(value){
		if(this.regexTest(value, this.NUMBERS_PATTERN) === true){
			numberLocalValue = true;
		} else {
			if(label){
				numberLocalValue = label + this.LABEL_NUMBERS_TEMPLATE;
			}else if(this.DEFAULT_TEMPLATE) {
				numberLocalValue = this.NUMBERS_TEMPLATE;
			} else {
				numberLocalValue = false;
			}				
		}
	}
	return numberLocalValue;
	}
	
	// Function for password match validation 
	passwordMatchValidation(value, confirmValue){
	var passwordMatchLocalValue;
	if(value && confirmValue){
		if (value === confirmValue) {
			passwordMatchLocalValue = true;
		} else {
			if(this.DEFAULT_TEMPLATE) {
				passwordMatchLocalValue = this.PASSWORD_MATCH_TEMPLATE;
			} else {
				passwordMatchLocalValue = false;
			}	
		}
	}
	return passwordMatchLocalValue;
	}
	
	// Function for email validation 
	emailValidation(value){
	var emailLocalValue;
	if(value){
		if(this.regexTest(value, this.EMAIL_PATTERN) === true){
			emailLocalValue = true;
		} else {
			if(this.DEFAULT_TEMPLATE) {
				emailLocalValue = this.EMAIL_TEMPLATE;
			} else {
				emailLocalValue = false;
			}				
		}
	}
	return emailLocalValue;
	}
	
	// Function for password validation 
	passwordValidation(value){
	var passwordLocalValue;
	var string = value;
	if(string.length >= 5){
		if(string.length <= 15){
			var checkSpecial = /[*@!#%&()^~{}]+/.test(string);
			var checkUpper = /[A-Z]+/.test(string);
			var checkLower = /[a-z]+/.test(string);
			passwordLocalValue = false;
					if (checkLower) {
						if(checkUpper){
							if(checkSpecial){
								passwordLocalValue = true;
							} else {
								passwordLocalValue = this.PASSWORD_SPECIAL;
							}
						} else {
							passwordLocalValue = this.PASSWORD_UPPER;
						}
					} else {
						passwordLocalValue = this.PASSWORD_LOWER;
					}
				passwordLocalValue = passwordLocalValue;
			} else {
			passwordLocalValue = this.PASSWORD_MAX;
		}
	} else {
		passwordLocalValue = this.PASSWORD_MIN;
	}
	return passwordLocalValue;
	}
	
	// Function for alphabet number space validation
	alphaNumberSpaceValidation(value, label){
	var alphaNumberSpaceLocalValue;
	if(value){
		if(this.regexTest(value, this.ALPHABETS_NUMBERS_SPACE_PATTERN) === true){
			alphaNumberSpaceLocalValue = true;
		} else {
			if(label){
				alphaNumberSpaceLocalValue = label + this.LABEL_ALPHABETS_NUMBERS_SPACE_TEMPLATE;
			}else if(this.DEFAULT_TEMPLATE) {
				alphaNumberSpaceLocalValue = this.ALPHABETS_NUMBERS_SPACE_TEMPLATE;
			} else {
				alphaNumberSpaceLocalValue = false;
			}				
		}
	}
	return alphaNumberSpaceLocalValue;
	}
	
	// Function for Min Length validation 
	minLengthValidation(value, lengthValue, label){
	var minLengthLocalValue;
	var string = value;
	if(string.length >= lengthValue){
		minLengthLocalValue = true;
	} else {
		if(label) {
			minLengthLocalValue = label + this.LABEL_MIN_TEMPLATE + lengthValue + this.CHARACTERS;
		} else if(this.DEFAULT_TEMPLATE) {
			minLengthLocalValue = this.MIN_TEMPLATE + lengthValue + this.CHARACTERS;
		} else {
			minLengthLocalValue = false;
		}
	}
	return minLengthLocalValue;
	}
	
}
