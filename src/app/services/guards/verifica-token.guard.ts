import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

	constructor(
		public _us: UsuarioService,
		public router: Router
	){

	}


  canActivate(): Promise<boolean> | boolean {
  	console.log('inicio de verifica token guard')

  	let token = this._us.token;

  	let payload = JSON.parse(atob(token.split('.')[1]));

  	let expirado = this.expirado(payload.exp);

  	if(expirado){
  		this._us.logout();
  		this.router.navigate(['/login']);
  		return false;
  	}

    return this.verificaRenueva(payload.exp);
  }



  expirado(fechaExp: number){
  	let ahora = new Date().getTime() / 1000;

  	if(fechaExp < ahora){
  		return true;
  	}else {
  		return false;
  	}
  }


  verificaRenueva(fechaExp: number): Promise<boolean>{

  	return new Promise( (resolve, reject) => {

  		let tokenExp = new Date(fechaExp*1000);
  		let ahora = new Date();

  		ahora.setTime(ahora.getTime()+(1*60*60*1000));

  		//console.log(tokenExp);
  		//console.log(ahora);

  		if(tokenExp.getTime() > ahora.getTime()){
  			resolve(true);
  		}else{
  			this._us.renuevaToken().subscribe( () => {
  				resolve(true);
  			}, () => {
  				this._us.logout();
  				this.router.navigate(['/login']);
  				reject(false);
  			});
  		}

  		resolve(true);

  	});

  }


}
