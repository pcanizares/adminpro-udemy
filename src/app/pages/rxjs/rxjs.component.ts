import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, retry, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

	subscription: Subscription;

  constructor() { 

  	this.subscription = this.regresaObservable()
					  	.subscribe(
					  		numero => {
					  			console.log('Subs', numero);
					  		},
					  		error => {
					  			console.error('Error en el obsservador (2 veces)', error);
					  		}, 
					  		() => {
					  			console.log('El observador terminó!');
					  		}

					  	);

  }


  ngOnInit() {
  }

  ngOnDestroy(){
  	console.log('La página se va a cerrar');
  	this.subscription.unsubscribe();
  }


  regresaObservable(): Observable<any>{
  	return new Observable( observer=> {

  		let contador = 0;

  		let intervalo = setInterval( () => {

  			contador++;

  			let salida = {
  				valor: contador
  			}

  			observer.next(salida);

  			/*if(contador == 3){ 
  				clearInterval(intervalo);
  				observer.complete();
  			}*/

  			/*if(contador == 2){
  				observer.error('Auxilio!');
  			}*/


  		}, 500);

  	})
  	.pipe(retry(2))
  	.pipe( map( res => {
  		return res['valor'];
  	}))
  	.pipe(filter((valor, index) => {
  		//console.log('Filter', valor, index);
  		if(valor % 2 == 1){
  			//impar
  			return true;
  		}else{
  			//par
  			return false;
  		}
  	}));
  }




}
