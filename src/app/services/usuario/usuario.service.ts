import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

	usuario: Usuario;
	token: string;
  menu: any[] = [];

  constructor(
  	public http: HttpClient,
  	public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 

  	this.cargarStorage();

  }


  logout(){
  	this.usuario = null;
  	this.token = '';
    this.menu = [];

  	localStorage.removeItem('id');
  	localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  	localStorage.removeItem('menu');

  	this.router.navigate(['/login']);

  }

  login(usuario: Usuario, recordar: boolean = false){
  	if(recordar){
  		localStorage.setItem('email', usuario.email);
  	}else{
  		localStorage.removeItem('email');
  	}


  	let url = URL_SERVICIOS + '/login';

  	return this.http.post(url, usuario).pipe(
      map(res => {
    
    		this.guardarStorage(res['id'], res['token'], res['usuario'], res['menu']);
    		return res;
    	}),
      catchError(err => {
        swal( 'Error en el login', err.error.mensaje, 'error' );
        return throwError(err.error.mensaje);
      })
    );
  }


  loginGoogle(token: string){
  	let url = URL_SERVICIOS + '/login/google';

  	return this.http.post(url, { token }).pipe(map(res => {
  		this.guardarStorage(res['id'], res['token'], res['usuario'], res['menu']);
  		return res;
  	}));

  }

  cargarStorage(){
  	if(localStorage.getItem('token')){
  		this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
  		this.menu = JSON.parse(localStorage.getItem('menu'));
  	}else{
  		this.token = '';
  		this.usuario = null;
      this.menu = [];
  	}
  }


  guardarStorage(id: string, token:string, usuario: Usuario, menu:any){
    localStorage.setItem('id', id);
		localStorage.setItem('token', token);
		localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
		this.usuario = usuario;
		this.token = token;
    this.menu = menu;
  }


  estaLogueado(){
  	return (this.token.length >5) ? true : false;
  }



  crearUsuario(usuario: Usuario){
  	let url = URL_SERVICIOS + '/usuario';

  	return this.http.post(url, usuario).pipe(
      map(res => {
    		return res['usuario'];
    	}),
      catchError(err => {
        swal( err.error.mensaje, err.error.errors.message, 'error' );
        console.log(err)
        return throwError(err.error.mensaje);
      })
    );
  }


  actualizarUsuario(usuario: Usuario){

    let url = URL_SERVICIOS + '/usuario/'+usuario._id;
    url+='?token='+this.token;
    //console.log(url);

    return this.http.put(url, usuario).pipe(
      map(res => {

        if(usuario._id === this.usuario._id){
          this.guardarStorage(res['id'], this.token, res['usuario'], this.menu);
        }

        swal('Usuario actualizado', usuario.nombre, 'success');
        return res;
      }),
      catchError(err => {
        swal( err.error.mensaje, err.error.errors.message, 'error' );
        console.log(err)
        return throwError(err.error.mensaje);
      })
    );

  }


  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id).then(res => {
      //console.log(res);
      this.usuario.img = res['usuario'].img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);
    })
    .catch(res => {
      //console.log(res);
    });
  }

  cargarUsuarios(desde: number = 0){
    let url = URL_SERVICIOS +'/usuario?desde='+desde;

    return this.http.get(url);

  }


  buscarUsuario(termino: string){
    let url = URL_SERVICIOS +'/busqueda/coleccion/usuarios/'+termino;
    return this.http.get(url).pipe(map(res => {
      return res['usuarios'];
    }));
  }


  borrarUsuario(id: string){

    let url = URL_SERVICIOS + '/usuario/'+id+'?token='+this.token;

    return this.http.delete(url);

  }



}
