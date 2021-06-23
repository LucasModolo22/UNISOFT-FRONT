import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader()

    var httpOptions
    try {
      httpOptions = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('currentUser').replace(/"/g, "")}` }),
        observe: 'response'
      }
    } catch {}

    var newReq = request.clone(httpOptions)

    return next.handle(newReq).pipe(
      catchError(err => {
        if (err.status == 401) {
          this.authService.logout()
          return throwError(err)
        }
        console.log(err)
        Swal.fire('Erro!', err.error.msg || 'Houve um erro ao concluir essa ação.', 'error')
        return throwError(err)
      }),
      finalize(() => {
        this.hideLoader()
      })
    )
  }

  showLoader(): void {
    let load = document.querySelectorAll('.http-loading');
    load.forEach(t => t.classList.add('load-activ'));
  }
  hideLoader(): void {
    let load = document.querySelectorAll('.http-loading');
    load.forEach(t => t.classList.remove('load-activ'));
  }
}
