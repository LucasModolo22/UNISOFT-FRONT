import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/validators/myvalidators.directive';
import Swal from 'sweetalert2';
import { PagesComponent } from '../../pages.component';
import { EditService } from '../edit.service';

@Component({
  selector: 'app-edit-vendas',
  templateUrl: './edit.component.html',
  styleUrls: ['../edit.component.scss']
})
export class EditVendasComponent implements OnInit {

  form: FormGroup;
  produtos = []

  constructor(private fb: FormBuilder, private editService: EditService, private pageComponent: PagesComponent) {
    this.form = this.fb.group({
      product: [null, [Validators.required]],
      quantity: [null, [Validators.required, MyValidators.numeroMaiorQueZero, MyValidators.numeroInteiro]],
      price: [null, [Validators.required, MyValidators.numeroMaiorQueZero]],
      client_name: [null, [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.getProdutos()
  }

  get product() { return this.form.get('product'); }
  get quantity() { return this.form.get('quantity'); }
  get price() { return this.form.get('price'); }
  get client_name() { return this.form.get('client_name'); }

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
        text: "Você só poderá reverter isso excluindo e adicionando uma nova venda.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, vender!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.createVenda(this.form.value)
          this.pageComponent.swalOpcoes.fire(
            'Vendido!',
            'Seu produto foi vendido.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.pageComponent.swalOpcoes.fire(
            'Cancelado!',
            'Seu item não foi vendido',
            'error'
          )
        }
      })
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
    this.pageComponent.vendaJanela = false
    this.form.reset()
  }

  createVenda(data){
    this.editService.createVenda(data).subscribe(data => {
      this.pageComponent.vendas.push(data)
      this.pageComponent.swalToast.fire({
        icon: 'success',
        title: 'Venda adicionada com sucesso!'
      })
      this.cancelar()
    })
  }

}
