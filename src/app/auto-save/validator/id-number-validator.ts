import {AbstractControl, ValidationErrors} from '@angular/forms';

export class IdNumberValidator {

	static validateIdNumber(control: AbstractControl): ValidationErrors | null {
		let idNumber = control.value;
		let validationErrors: ValidationErrors = {'idNumberInvalid': 'Invalid ID number'};

		if (idNumber.length == 0) {
			return null;
		}

		if (IdNumberValidator.validate(idNumber)) {
			return null;
		} else {
			return validationErrors;
		}
	}

	static validate(idNumber: string): boolean {
		//Ref: http://www.sadev.co.za/content/what-south-african-id-number-made
		// SA ID number have to be 13 digits, so check the length
		if (idNumber.length != 13) {
			return false;
		}

		// Get first 6 digits as a valid date
		let tempDate = new Date(parseInt(idNumber.substring(0, 2)), parseInt(idNumber.substring(2, 4)) - 1, parseInt(idNumber.substring(4, 6)));
		let id_date = tempDate.getDate();
		let id_month = tempDate.getMonth();
		let id_year = tempDate.getFullYear();

		if (!((tempDate.getFullYear().toString().substring(2, 4) == idNumber.substring(0, 2)) && (id_month == parseInt(idNumber.substring(2, 4)) - 1) && (id_date == parseInt(idNumber.substring(4, 6))))) {
			return false;
		}

		// Apply Luhn formula for check-digits
		let tempTotal = 0;
		let checkSum = 0;
		let multiplier = 1;
		for (let i = 0; i < 13; ++i) {
			tempTotal = parseInt(idNumber.charAt(i)) * multiplier;
			if (tempTotal > 9) {
				tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
			}
			checkSum = checkSum + tempTotal;
			multiplier = (multiplier % 2 == 0) ? 1 : 2;
		}
		if ((checkSum % 10) != 0) {
			return false;
		}

		// ID number is valid
		return true;
	}

}
