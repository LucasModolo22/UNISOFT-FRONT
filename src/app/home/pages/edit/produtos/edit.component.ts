import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      name: [null],
      description: [null],
      quantity: [null],
    });
   }

  ngOnInit(): void {
  }

  salvar(){
    this.createProduto(this.form.value)
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
