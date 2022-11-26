import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import generatePassword from 'password-generator';
import {PersonaRepository} from '../repositories';
import {Persona} from '../models/persona.model'
import {Llaves} from '../config/llaves';
const generador = require("password-generator");
const criptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository
  ) {}

  GenerarClave(){
    let clave = generatePassword(8, false);
    return clave;
  }

  CifrarClave(clave : string){
    let claveCifrada = criptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPersona(usuario: string, clave: string){
    try {
      let p = this.personaRepository.findOne(
        {
          where: {correo: usuario, clave: clave}
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(persona: Persona){
    let token = jwt.sign(
      {
        data: {
          id: persona.id,
          correo: persona.correo,
          nombre: persona.nombres + " " + persona.apellidos,
        }
      },
      Llaves.claveJWT);
      return token;
  }

  ValidarTokenJWT(token:string){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos
    } catch {
      return false
    }
  }
}
