import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

	usuarios: Usuario[] = [];
	desde: number = 0;

	totalRegistros: number = 0; 

	cargando: boolean;

  constructor(
  	private _us: UsuarioService,
		public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  	this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe(
      res => {
        this.cargarUsuarios();
      }
    );
  }


  cargarUsuarios(){
  	this.cargando = true;
  	this._us.cargarUsuarios(this.desde).subscribe(
  		res => {
  			//console.log(res);
  			this.totalRegistros = res['total'];
  			this.usuarios = res['usuarios'];
  			this.cargando = false;
  		}
  	);
  }



  cambiarDesde(valor: number){
  	let desde = this.desde + valor;
  	//console.log(desde);
  	if(desde >= this.totalRegistros){
  		return;
  	}else if(desde <0){
  		return;
  	}

  	this.desde += valor;
  	this.cargarUsuarios();

  }


  buscarUsuario(termino: string){
  	if(termino == null || termino.trim()===''){
  		this.cargarUsuarios();
  		return;
  	}
  	this.cargando = true;
  	this._us.buscarUsuario(termino).subscribe(
  		res => {
  			//console.log(res);
  			this.usuarios = res;
  			this.cargando = false;
  		}
  	);

  }


  borrarUsuario(usuario: Usuario){
  	if(usuario._id === this._us.usuario._id){
  		swal('No se puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
  		return;
  	}

  	swal({
  		title: '¿Estás seguro?',
  		text: 'Está a punto d borrar a '+usuario.nombre,
  		icon: 'warning',
  		buttons: true,
  		dangerMode: true
  	}).then(confirm => {
  		if(confirm){
  			this._us.borrarUsuario(usuario._id).subscribe(
  				res => {
  					console.log(res);
  					this.totalRegistros--;
  					if(this.desde >= this.totalRegistros){
  						this.desde = this.totalRegistros - 5;
  					}
  					this.cargarUsuarios();
  					swal('Usuario eliminado correctamente', 'El usuario ha sido eliminado correctamente', 'success');
  				}
  			);
  		}
  	});

  }


  guardarUsuario(usuario: Usuario){
  	this._us.actualizarUsuario(usuario).subscribe(
  		res => {
  			console.log(res);
  		}
  	);
  }
	
	mostrarModal(id: string){
		this._modalUploadService.mostrarModal('usuarios', id);
  }





  


}
