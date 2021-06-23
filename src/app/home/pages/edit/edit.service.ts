import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(
    private http: HttpClient
  ) { }

  createProduto(data){
    return this.http.post<any>(`${environment.apiUrl}/product`, data)
  }
  
  createVenda(data){
    return this.http.post<any>(`${environment.apiUrl}/sale`, data)
  }

  createRecebimento(data){
    return this.http.post<any>(`${environment.apiUrl}/receivement`, data)
  }

  createUsuario(data){
    return this.http.post<any>(`${environment.apiUrl}/user`, data)
  }

  getProdutos(){
    return this.http.get<any>(`${environment.apiUrl}/product`)
  }

}
