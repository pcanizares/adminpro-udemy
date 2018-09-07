import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

declare var swal:any;


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

	totalMedicos: number = 0;

  constructor(
  	public http: HttpClient,
  	public _us: UsuarioService
  ) { }


  cargarMedicos(desde: number=0){
  	let url = URL_SERVICIOS + '/medico?desde='+desde;

  	return this.http.get(url).pipe(map(res => {
  		this.totalMedicos = res['total'];
  		return res;
  	}));
  }

  buscarMedico(nombre: string){
  	let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/'+nombre;

  	return this.http.get(url).pipe(map(res => {
  		return res['medicos'];
  	}));
  }

  borrarMedico(id: string){
  	let url = URL_SERVICIOS + '/medico/'+id+'?token=' + this._us.token;

  	return this.http.delete(url);
  }


  guardarMedico(medico: Medico){
  	let url = URL_SERVICIOS + '/medico';

  	if(medico._id){
  		//Update
  		url += '/'+medico._id+'?token='+this._us.token;

  		return this.http.put(url, medico).pipe(map(res => {
  			swal('Médico actualizado', medico.nombre, 'success');
	  		return res['medico'];
  		}));


  	}else{
  		//Crear
  		url+= '?token='+this._us.token;
	  	return this.http.post(url, medico).pipe(map(res=> {
	  		swal('Médico creado', medico.nombre, 'success');
	  		return res['medico'];
	  	}));
  	}




  }


  cargarMedico(id: string){
  	let url = URL_SERVICIOS + '/medico/'+id;

  	return this.http.get(url).pipe(map(res => {
  		return res['medico'];
  	}));
  }


}



