export class UsuarioModel {
    email: string;
    password: string;
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