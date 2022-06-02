export class UsuarioModel {
    email: string;
    password: string;
    nombreCompleto: string;
    numeroId: string;
    direccion:string;
    edad:number;
    genero:string
}

export class CuentaModel {
    numeroCuenta: string;
    saldo: number;
    idCliente: string;
}

export class TransferenciaModel{
    monto: number;
    tipo: string;
}