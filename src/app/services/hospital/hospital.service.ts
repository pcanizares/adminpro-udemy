import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
  	public http: HttpClient,
  	public _us: UsuarioService
  ) { 

  }

  cargarHospitales(desde: number=0){
  	let url = URL_SERVICIOS + '/hospital?desde='+desde;

  	return this.http.get(url);
  }


  borrarHospital(id: string){
  	let url = URL_SERVICIOS + '/hospital/'+id+'?token=' + this._us.token;

  	return this.http.delete(url);
  }


  buscarHospital(nombre: string){
  	let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/'+nombre;

  	return this.http.get(url).pipe(map(res => {
  		return res['hospitales'];
  	}));
  }


  actualizarHospital(hospital: Hospital){
  	let url = URL_SERVICIOS + '/hospital/'+hospital._id+'?token='+this._us.token;

  	return this.http.put(url, hospital);
  }


  crearHospital(nombre: string){
  	let url = URL_SERVICIOS + '/hospital?token='+this._us.token;

  	return this.http.post(url, {nombre});
  }


  obtenerHospital(id: string){
  	let url = URL_SERVICIOS +'/hospital/'+id;

  	return this.http.get(url);
  }


}
