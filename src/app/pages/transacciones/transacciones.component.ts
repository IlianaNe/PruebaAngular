import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {

  transacciones;

  idToken = "";

  constructor(private auth: AuthService, private cuentasServicio: CuentaService) {
    this.idToken = this.auth.leerToken();
  }

  ngOnInit() {
    this.cuentasServicio.getTransacciones(this.idToken).subscribe(resp => {
      this.transacciones = Object.values(resp);
    });
  }

}
