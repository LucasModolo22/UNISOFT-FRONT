import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      username: [null],
      name: [null],
      surname: [null],
      email: [null],
      pwd: [null]
    });
   }

  ngOnInit(): void {
  }

  salvar(){
    this.createUsuario(this.form.value)
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
