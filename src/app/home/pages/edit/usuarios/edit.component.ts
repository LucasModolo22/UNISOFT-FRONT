import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PagesComponent } from '../../pages.component';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-edit-usuarios',
  templateUrl: './edit.component.html',
  styleUrls: ['../edit.component.scss']
})
export class EditUsuariosComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private editService: EditService, private pageComponent: PagesComponent) {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      pwd: [null, [Validators.required, Validators.minLength(8)]]
    });
   }

  ngOnInit(): void {
  }

  salvar(){
    this.form.markAllAsTouched()
    if(this.form.valid){
      this.createUsuario(this.form.value)
    } else{
      this.erroForm()
    }
  }

  erroForm(){
    Swal.fire(
      'Campos Inválidos!',
      'Insira os dados corretamente.',
      'error'
    )
  }

  cancelar(){
    this.pageComponent.usuarioJanela = false
    this.form.reset()
  }

  createUsuario(data){
    this.editService.createUsuario(data).subscribe(data => {
      this.pageComponent.usuarios.push(data)
      this.pageComponent.swalToast.fire({
        icon: 'success',
        title: 'Usuário adicionado com sucesso!'
      })
      this.pageComponent.usuarioJanela = false
      this.form.reset()
    })
  }

}
