import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
      products: new FormArray([
        new FormGroup({
          product: new FormControl('', [Validators.required]),
          quantity : new FormControl(0, [Validators.required])
        })
      ]),
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
      this.pageComponent.swalOpcoes.fire({
        title: 'Tem certeza?',
        text: "Você só poderá reverter isso excluindo e adicionando um noov recebimento.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, salvar!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.createRecebimento(this.form.value)
          this.pageComponent.swalOpcoes.fire(
            'Salvo!',
            'Seu recebimento foi registrado',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.pageComponent.swalOpcoes.fire(
            'Cancelado!',
            'Seu recebimento não foi registrado',
            'error'
          )
        }
      })
    } else{
      this.erroForm()
    }
  }

  get products() { return this.form.get('products'); }

  addNewField(i) {
    if((this.products as FormArray).at(i).invalid == false) {
      (this.products as FormArray).push(
        new FormGroup({
          product: new FormControl(''),
          quantity : new FormControl(0)
        })
      )
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
    data.user = Number(JSON.parse(localStorage.getItem("user")).id)
    data.products.forEach((ps, i) => {
      ps.product = { id : Number(ps.product)}
    })
    data.products = data.products.filter((ele : any) => { return ele.product.id != 0 });
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
