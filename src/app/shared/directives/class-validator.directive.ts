import {
  AbstractControl, 
  NG_VALIDATORS, 
  ValidationErrors, 
  Validator, 
  ValidatorFn
} from '@angular/forms';
import {Directive, Input} from '@angular/core';

function classValidatorFn(requiredClass: Function): ValidatorFn {  
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value instanceof requiredClass ? null : {classValidator: {required: requiredClass, actual: control.value.constructor}};
  }
}

@Directive({  
  selector: '[appClassValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ClassValidatorDirective,
    multi: true
  }]
})
/**
 * @description
 * Validator that requires the control's value to be instanceof to the provided class.
 *
 * @usageNotes
 *
 * ### Validate when instanceof provided class
 *
 * ```typescript
 * const myClass: MyClass = new MyClass();
 * const control = new FormControl(MyClass, Validators.reactive(''));
 *
 * console.log(control.errors); // {classValidator: {required: class MyClass, actual: f String()}}
 * ```
 */
export class ClassValidatorDirective implements Validator {
  private _requiredClass: Function;
  private _onChange?: () => void;

  /**
   * @description
   * Tracks changes to the genericType attribute bound to this directive.
   */
  @Input()
  get requiredClass(): Function {
    return this._requiredClass;
  }

  set requiredClass(requiredClass: Function) {
    this._requiredClass = requiredClass;
    if (this._onChange) this._onChange();
  }

  /**
   * @description
   * Registers a callback function to call when the validator inputs change.
   *
   * @param fn The callback function
   */
  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }

  /**
   * @description
   * Allow using the custom validator for reactive forms.
   * 
   * @param {Function} requiredClass Class condition of instanceof validation.
   * @returns {ValidatorFn} Validator function that returns an error map with the
   * `classValidator` property if the validation check fails, otherwise `null`.
   */
  static reactive(requiredClass: Function): ValidatorFn {
    return classValidatorFn(requiredClass);
  };
    
  validate(control: AbstractControl): ValidationErrors | null {
    return classValidatorFn(this.requiredClass)(control);
  }
}
