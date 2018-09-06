import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index'; 
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;


  constructor(
    public router: Router,
    public _us: UsuarioService
   ) { }

  ngOnInit() {
  	
  	init_plugins();
    this.googleInit();


    this.email = localStorage.getItem('email') || '';
    if(localStorage.getItem('email')){
      this.recuerdame = true;
    }

  }


  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '163209335264-u75r0se80cbf5no9gsjaci7rglu3k25m.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSigning(document.getElementById('btnGoogle'));
    });
  }


  attachSigning(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      //console.log(token);
      this._us.loginGoogle(token).subscribe(
        res => {
          console.log(res);
          //this.router.navigate(['/dashboard']);
          window.location.href='#/dashboard';
        }
      )

    });
  }




  ingresar(forma: NgForm){
  	//console.log('ingresando...');
    //console.log(forma.valid);
    //console.log(forma.value);
    
    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._us.login(usuario, forma.value.recuerdame).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.error(err);
      }
     

  	//this.router.navigate(['/dashboard']);
  }

}
