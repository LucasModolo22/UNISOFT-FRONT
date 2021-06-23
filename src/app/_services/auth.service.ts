import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(login){
      this.http.post<any>(`${environment.apiUrl}/user/login`, login).subscribe(data => {
        // if (data.type != 'usuarioPainel') return Swal.fire('Erro!', 'Login inválido.', 'error')
        localStorage.setItem('currentUser', data.token)
        localStorage.setItem("username", data.result.username)
        this.router.navigate(['/home'])
        return
      })
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
