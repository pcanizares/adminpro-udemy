import { Injectable, EventEmitter } from '@angular/core';

declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

	public tipo: string;
	public id: string;

	public oculto: string = 'oculto';

	public notificacion = new EventEmitter<any>();

  constructor() { 

  }

  ocultarModal(){
  	$('.modal').modal('hide');
  	this.oculto = 'oculto';
  	this.id = null;
  	this.tipo = null;
  	
  }


  mostrarModal(tipo: string, id:string){
  	$('.modal').modal('show');
  	this.oculto = '';
  	this.id = id;
  	this.tipo = tipo;
  }




}
