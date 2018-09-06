import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

	constructor(
		public _us: UsuarioService,
		public router: Router
	){

	}




  canActivate(): boolean {
  	if(this._us.estaLogueado()){
  		console.log('paso el guard');
  		return true;
  	}else{
  		console.log('bloqueado por el guard');
  		this.router.navigate(['/login']);
    	return false;
  	}
  }
}
