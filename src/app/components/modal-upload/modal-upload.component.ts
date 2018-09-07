import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

declare var $: any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

	imagenSubir: File;
  imagenTemp: any;

  constructor(
  	public _subirArchivoService: SubirArchivoService,
  	public _modalUploadService: ModalUploadService
  ) { 

  }

  ngOnInit() {
  	
  }


  subirImagen(){
  	this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id).then( 
  		res => {
  			console.log(res);
  			this._modalUploadService.notificacion.emit(res);
  			this.cerrarModal();
  		}
  	)
  	.catch( err => {
  		console.log('Error en la carga...');
  	});
  }


  seleccionImagen(archivo: File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image')==-1){
      swal('Solo imágenes','El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }

  }


  cerrarModal(){
  	this.imagenTemp = null;
  	this.imagenSubir = null;

  	this._modalUploadService.ocultarModal();
  }


}
