import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      product: [null],
      quantity: [null],
      price: [null],
      client_name: [null],
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
    this.createVenda(this.form.value)
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
