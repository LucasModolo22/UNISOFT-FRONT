import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';
import { PagesService } from './pages.service';

@Component({
  selector: 'app-home-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnChanges {

  @Input() type: string;
  typeCampo: string
  apiRota: string
  username: string

  produtos = []
  vendas = []
  recebimentos = []
  usuarios = []

  swalOpcoes: any = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalToast: any = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(
    private authService: AuthService,
    private pagesService: PagesService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    switch (changes.type.currentValue) {
      case "produtos":
        this.typeCampo = "produto"
        this.apiRota = "product"
        this.loadProdutos()
        break;
      case "vendas":
        this.typeCampo = "venda"
        this.apiRota = "sale"
        this.loadVendas()
        break;
      case "recebimentos":
        this.typeCampo = "recebimento"
        this.apiRota = "receivement"
        this.loadRecebimentos()
        break;
      case "usuarios":
        this.typeCampo = "usuário"
        this.apiRota = "user"
        this.loadUsuarios()
        break;
    }
    let searchElement: any = document.getElementById('search')
    searchElement.value = '';
    
  }

  ngOnInit(): void {
    if (!localStorage.getItem('currentUser')) return this.authService.logout()
    this.username = localStorage.getItem('username');
  }

  search(event){
    let domUsuarios = document.querySelectorAll('.pesquisa')
    domUsuarios.forEach((element: HTMLElement ) => {
      if(element.textContent.toLowerCase().search(event.target.value.toLowerCase()) < 0){
        element.parentElement.style.display = 'none'
      } else{
        element.parentElement.style.display = ''
      }
    });
  }

  loadActual(){
    switch (this.type) {
      case "produtos":
        this.loadProdutos()
        break;
      case "vendas":
        this.loadVendas()
        break;
      case "recebimentos":
        this.loadRecebimentos()
        break;
      case "usuarios":
        this.loadUsuarios()
        break;
    }
  }

  deletar(id: any): void {
    this.swalOpcoes.fire({
      title: 'Tem certeza?',
      text: "Você não vai poder reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar isso!',
      cancelButtonText: 'Não, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem(id)
        this.swalOpcoes.fire(
          'Deletado!',
          'Seu item foi deletado.',
          'success'
        ).then((result) => {
          if(result.isConfirmed){
            this.loadActual()
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalOpcoes.fire(
          'Cancelado!',
          'Seu item está seguro :)',
          'error'
        )
      }
    })
  }

  adicionar(){
    this.swalToast.fire({
      icon: 'success',
      title: 'Item adicionado com sucesso!'
    })
  }

  nenhumItemEncontrado(){
    Swal.fire(
      'Nenhum item foi encontrado!',
      'Para adicionar um item, clique no botão verde "Adicionar"',
      'warning'
    )
  }

  deleteItem(id){
    this.pagesService.deleteItem(id, this.apiRota).subscribe()
  }

  loadProdutos(){
    this.pagesService.loadProdutos().subscribe(data => {
      this.produtos = data
      if (!data[0]){
        this.nenhumItemEncontrado()
      }
    })
  }

  loadVendas(){
    this.pagesService.loadVendas().subscribe(data => {
      this.vendas = data
      if (!data[0]){
        this.nenhumItemEncontrado()
      }
    })
  }

  loadRecebimentos(){
    this.pagesService.loadRecebimentos().subscribe(data => {
      this.recebimentos = data
      if (!data[0]){
        this.nenhumItemEncontrado()
      }
    })
  }

  loadUsuarios(){
    this.pagesService.loadUsuarios().subscribe(data => {
      this.usuarios = data
      if (!data[0]){
        this.nenhumItemEncontrado()
      }
    })
  }
  

}
