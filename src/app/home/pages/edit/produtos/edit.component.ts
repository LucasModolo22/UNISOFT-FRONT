import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/validators/myvalidators.directive';
import Swal from 'sweetalert2';
import { PagesComponent } from '../../pages.component';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-edit-produtos',
  templateUrl: './edit.component.html',
  styleUrls: ['../edit.component.scss']
})
export class EditProdutosComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private editService: EditService, private pageComponent: PagesComponent) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      price: [null],
      quantity: [null, [Validators.required, MyValidators.numeroMaiorIgualAZero, MyValidators.numeroInteiro]],
    });
   }

  ngOnInit(): void {
  }

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get quantity() { return this.form.get('quantity'); }

  salvar(){
    this.form.markAllAsTouched()
    if(this.form.valid){
      this.createProduto(this.form.value)
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
    this.pageComponent.produtoJanela = false
    this.form.reset()
  }

  createProduto(data){
    this.editService.createProduto(data).subscribe(data => {
      this.pageComponent.produtos.push(data)
      this.pageComponent.swalToast.fire({
        icon: 'success',
        title: 'Produto adicionado com sucesso!'
      })
      this.pageComponent.produtoJanela = false
      this.form.reset()
    })
  }

}
