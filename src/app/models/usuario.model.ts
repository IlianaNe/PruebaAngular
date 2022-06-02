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
    estado: string;
    fechaUltimaAct:Date;
    idCliente: string;
    numeroCuenta: string;
    saldo: number;
}

export class TransferenciaModel{
    fechaUltimaAct: Date;
    monto: number;
    numeroCuenta: string;
    terminal: string;
    tipo: string;
    usuario: string;
}