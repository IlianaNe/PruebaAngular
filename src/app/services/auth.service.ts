import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map, repeat } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {//necesitamos 2 servicos, uno para la autenticacion y otro para crear usuarios

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
  private apikey = 'AIzaSyB-p8CKoaQr097NJ8YJRpoWpezJj5xRRUI';
  private apikeyPrueba= 'AIzaSyB-p8CKoaQr097NJ8YJRpoWpezJj5xRRUI'
  //registrarse
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //acceder
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  userToken: string;//aqui colocamos si ya existe el idtoken

  constructor(private http: HttpClient) {
    this.leerToken();
   }

  logout() {

  }


  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario, //es lo mismo que usuario.password y usuario.email porque pedimos el modelo compelto
      returnSecureToken: true
    }

    return this.http.post(`${this.url}signupNewUser?key=${this.apikey}`, authData)
      .pipe(map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      }));//map transormra la respuesta o solo sirve como intermediario, el map´no marca errores
  }


  login(usuario: UsuarioModel) {

    const authData = {
      ...usuario, //es lo mismo que usuario.password y usuario.email porque pedimos el modelo compelto
      returnSecureToken: true
    }

    return this.http.post(`${this.url}verifyPassword?key=${this.apikey}`, authData).pipe(map(resp => {
      this.guardarToken(resp['idToken']);
      return resp;
    }));;
  }

  private guardarToken(idToken: string) { //método para guardar el token que es el que almacena el inicio de sesion
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {//método para leer lo que hay en el token
    //verificar si hay informacion
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';//retornamos un string vacío
    }
    return this.userToken;
  }

  estaAutenticado():boolean{
    if(this.userToken){
      return true;
    } else{
      const expira = Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);
      if(expiraDate > new Date()){
        return true;
      }else{
        return false;
      }
    }
    //return this.userToken.length > 2;
  }

}
