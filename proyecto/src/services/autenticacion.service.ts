import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import generatePassword from 'password-generator';
const generador = require("password-generator");
const criptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  GenerarClave(){
    let clave = generatePassword(8, false);
    return clave;
  }

  CifrarClave(clave : string){
    let claveCifrada = criptoJS.MD5(clave).toString();
    return claveCifrada;
  }


}
