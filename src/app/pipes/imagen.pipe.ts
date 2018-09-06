import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string='usuarios'): any {

  	let url = URL_SERVICIOS + '/imagenes';

  	if(!img){
  		return url + '/usuarios/xxx';
  	}else if(img.indexOf('https') != -1){
  		return img;
  	}else if(tipo == 'usuarios' || tipo == 'hospitales' || tipo == 'medicos'){
  		return url + '/'+ tipo +'/' + img;
  	}else{
  		return url + '/usuarios/xxx';
  	}

  }

}
