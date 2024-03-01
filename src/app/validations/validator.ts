import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class customValidators{
     
    static noSpaceValidator(): ValidatorFn{
        return (control : AbstractControl): ValidationErrors |null =>{
            const hasSpace = (control.value as string). includes(' ');
            return hasSpace ? {hasSpace : true} : null
        }
    }
    static passwordValidation() :ValidatorFn {
        return (control : AbstractControl):ValidationErrors |null=>{
            const password:string= control.value
            if(!/[a-z]/.test(password)){
                return {lowerCase:true}
            }
            if(!/[A-Z]/.test(password)){
                return {upperCase:true}
            }
            if(!/[0-9]/.test(password)){
                return {digit:true}
            }
            if(!/[@*%$#]/.test(password)){
                return {specialCharacter:true}
            }
            return null
        }
    }

}