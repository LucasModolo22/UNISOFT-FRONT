
import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
    selector: "[myValidators]",
    providers: [{
        provide: NG_VALIDATORS,
        useExisting:MyValidators,
        multi: true
    }]
})
export class MyValidators {

  static numeroMaiorIgualAZero(control: AbstractControl): { [key: string]: any } | null{
    return control.value >= 0  ?  null : {numeroInvalido: control.value};
  }

  static numeroMaiorQueZero(control: AbstractControl): { [key: string]: any } | null{
    return control.value > 0  ?  null : {numeroInvalido: control.value};
  }

  static numeroInteiro(control: AbstractControl): { [key: string]: any } | null{
    return control.value % 1 == 0  ?  null : {numeroInvalido: control.value};
  }
    
}