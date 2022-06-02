import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario = new UsuarioModel();
  recordarme = false;
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por Favor..'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(resp => {
      Swal.close();
      if(this.recordarme = true){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: err.error.error.message
      });
    });
    //en el subscribe se tiene la respuesta al firebase

  }


}
