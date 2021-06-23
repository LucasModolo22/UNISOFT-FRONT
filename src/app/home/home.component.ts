import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username: string

  type: string
  produtos: boolean = false
  vendas: boolean = false
  recebimentos: boolean = false
  usuarios: boolean = false

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthService,) {
    route.params.subscribe(params => {
      this.username = localStorage.getItem('username');
      this.type = params['page'];
      this.changeActive()
    });
   }

  ngOnInit(): void {
    if (!localStorage.getItem('currentUser')) return this.authenticationService.logout()
  }

  changePage(rota: string){
    this.router.navigateByUrl(rota)
  }

  changeActive(){
    switch (this.type) {
      case "produtos":
        this.produtos = true
        this.vendas = false
        this.recebimentos = false
        this.usuarios = false
        break;
      case "vendas":
        this.produtos = false
        this.vendas = true
        this.recebimentos = false
        this.usuarios = false
        break;
      case "usuarios":
        this.produtos = false
        this.vendas = false
        this.recebimentos = false
        this.usuarios = true
        break;
      case "recebimentos":
        this.produtos = false
        this.vendas = false
        this.recebimentos = true
        this.usuarios = false
        break;
      }
  }

  deslogar(){
    this.authenticationService.logout()
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Você está deslogado',
      showConfirmButton: false,
      timer: 2000
    })
  }

}
