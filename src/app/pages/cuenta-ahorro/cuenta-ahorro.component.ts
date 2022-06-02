import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CuentaService } from '../../services/cuenta.service';
import { CuentaModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta-ahorro',
  templateUrl: './cuenta-ahorro.component.html',
  styleUrls: ['./cuenta-ahorro.component.css']
})
export class CuentaAhorroComponent implements OnInit {

  cuentas: CuentaModel[] = [];
  cuenta = new CuentaModel();

  idToken;
  idClient;

  constructor(private auth: AuthService, private cuentasServicio: CuentaService) {
    this.idToken = this.auth.leerToken();
  }

  ngOnInit() {
    this.cuentasServicio.getCuentas(this.idToken).subscribe(resp =>{
      this.cuentas = Object.values(resp);
      this.idClient = JSON.stringify(this.cuentas[1].idCliente);
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por Favor..'
    });
    Swal.showLoading();

    this.cuenta.idCliente = this.idClient;

    this.cuentasServicio.crearCuenta(this.cuenta,this.idToken).subscribe(resp => {
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
