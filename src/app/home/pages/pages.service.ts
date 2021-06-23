import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(
    private http: HttpClient
  ) { }

  loadProdutos(){
    return this.http.get<any>(`${environment.apiUrl}/product`)
  }
  deleteItem(id, apiRota){
    return this.http.delete<any>(`${environment.apiUrl}/${apiRota}/${id}`)
  }

  loadVendas(){
    return this.http.get<any>(`${environment.apiUrl}/sale`)
  }

  loadRecebimentos(){
    return this.http.get<any>(`${environment.apiUrl}/receivement`)
  }

  loadUsuarios(){
    return this.http.get<any>(`${environment.apiUrl}/user`)
  }

}
