import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/validators/myvalidators.directive';
import Swal from 'sweetalert2';
import { PagesComponent } from '../../pages.component';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-edit-recebimentos',
  templateUrl: './edit.component.html',
  styleUrls: ['../edit.component.scss']
})
export class EditRecebimentosComponent implements OnInit {

  form: FormGroup;
  produtos = []

  constructor(private fb: FormBuilder, private editService: EditService, private pageComponent: PagesComponent) {
    this.form = this.fb.group({
      product: [null, [Validators.required]],
      quantity: [null, [Validators.required, MyValidators.numeroMaiorQueZero, MyValidators.numeroInteiro]],
    });
   }

  ngOnInit(): void {
    this.getProdutos()
  }

  getProdutos(){
    this.editService.getProdutos().subscribe(data => {
      this.produtos = data
    })
  }

  salvar(){
    this.form.markAllAsTouched()
    if(this.form.valid){
      this.createRecebimento(this.form.value)
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
    this.pageComponent.recebimentoJanela = false
    this.form.reset()
  }

  createRecebimento(data){
    this.editService.createRecebimento(data).subscribe(data => {
      this.pageComponent.recebimentos.push(data)
      this.pageComponent.swalToast.fire({
        icon: 'success',
        title: 'Recebimento adicionado com sucesso!'
      })
      this.cancelar()
    })
  }

}
