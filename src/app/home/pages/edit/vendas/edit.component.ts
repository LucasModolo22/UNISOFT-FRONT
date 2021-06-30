import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MyValidators } from 'src/app/validators/myvalidators.directive';
import { AuthService } from 'src/app/_services/auth.service';
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

  constructor(private fb: FormBuilder, private authService : AuthService, private editService: EditService, private pageComponent: PagesComponent) {
    this.form = this.fb.group({
      products: new FormArray([
        new FormGroup({
          product: new FormControl('', [Validators.required]),
          quantity : new FormControl(0, [Validators.required])
        })
      ]),
      price: [null, [Validators.required, MyValidators.numeroMaiorQueZero]],
      client_name: [null, [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.getProdutos()

  }

  get products() { return this.form.get('products'); }
  get firstProduct() { return ((this.form.get('products') as FormArray).at(0) as FormGroup).get('product') }
  get firstQuantity() { return ((this.form.get('products') as FormArray).at(0) as FormGroup).get('quantity') }
  get quantity() { return this.form.get('quantity'); }
  get price() { return this.form.get('price'); }
  get client_name() { return this.form.get('client_name'); }

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

  getProdutos(){
    this.editService.getProdutos().subscribe(data => {
      this.produtos = data
    })
  }

  formVal : any;

  salvar(){
    this.formVal = JSON.stringify(this.form.value)
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
          this.createVenda(JSON.parse(this.formVal))
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
    data.user = Number(JSON.parse(localStorage.getItem("user")).id)
    data.products.forEach((ps, i) => {
      ps.product = { id : Number(ps.product)}
    })
    data.products = data.products.filter((ele : any) => { return ele.product.id != 0 });
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
