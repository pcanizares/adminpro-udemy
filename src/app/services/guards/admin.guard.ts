import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from '../../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

	constructor(
		public _us: UsuarioService
		public router: Router
	){

	}


  canActivate(){

  	if(this._us.usuario.role === 'ADMIN_ROLE'){
  		return true;
  	}else{
  		console.log('bloqueado por el admin guard');
  		this._us.logout();
  		//this.router.navigate['/login'];
    	return false;
  	}


  }
}
