import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validationForm: FormGroup;
  constructor(
    private authenticationService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    ) {
      this.validationForm = this.fb.group({
        username: [null, [Validators.required, Validators.minLength(3)]],
        pwd: [null, Validators.required],
      });
     }

  ngOnInit(): void {
    this.authenticationService.isLogged()
  }

  get username() { return this.validationForm.get('username'); }
  get pwd() { return this.validationForm.get('pwd'); }

  login(){
    this.validationForm.markAllAsTouched()
    if (this.validationForm.invalid) {
      Swal.fire("ERRO!", "Preencha todos os campos com informações válidas.", "error")
    }
    else{
      this.authenticationService.login(this.validationForm.value)
      this.validationForm.reset()
    }
  }

}
