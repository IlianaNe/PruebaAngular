import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CuentaModel, TransferenciaModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private url = 'https://mibanco-333616-default-rtdb.firebaseio.com/';
  private url2= '/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json?auth=';

  constructor(private http: HttpClient) {
  }

  getCuentas(id: string) {
    return this.http.get(`${this.url}cuentaAhorro${this.url2}${id}`).pipe(map((data: any) => {
      const user: CuentaModel = data
      return user;
    })
    );
  }

  getTransacciones(id: string) {
    return this.http.get(`${this.url}transacciones${this.url2}${id}`).pipe(map((data: any) => {
      const trans  = data
      return trans;
    })
    );
  }

  crearCuenta(cuenta: CuentaModel, id:string) {
    return this.http.post(`${this.url}cuentaAhorro${this.url2}${id}`, cuenta)
      .pipe(map((resp: any) => {
        console.log(resp)
      }));
  }


  crearTransaccion(trans: TransferenciaModel, id:string) {
    return this.http.post(`${this.url}transacciones${this.url2}${id}`, trans)
      .pipe(map((resp: any) => {
        console.log(resp)
      }));
  }

}
