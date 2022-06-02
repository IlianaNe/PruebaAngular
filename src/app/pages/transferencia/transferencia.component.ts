import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { TransferenciaModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  transferencia = new TransferenciaModel();

  idToken;

  constructor(private auth: AuthService, private cuentasServicio: CuentaService) { 
    this.idToken = this.auth.leerToken();
  }

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

    this.cuentasServicio.crearTransaccion(this.transferencia,this.idToken).subscribe(resp => {
      Swal.close();

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
