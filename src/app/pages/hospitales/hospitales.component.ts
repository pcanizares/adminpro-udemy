import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

	cargando: boolean = true;	

	totalRegistros: number = 0;
	desde: number = 0;

	hospitales: Hospital[] = [];

  constructor(
  	public _hospital: HospitalService,
  	public _us: UsuarioService,
  	public _modalUploadService: ModalUploadService
  ) { 


  }

  ngOnInit() {

  	this.cargarHospitales();

  	this._modalUploadService.notificacion.subscribe(
      res => {
        this.cargarHospitales();
      }
    );

  }



  cargarHospitales(){
  	this.cargando = true;

  	this._hospital.cargarHospitales(this.desde).subscribe(
  		res => {
  			//console.log(res);
  			this.cargando = false;
  			this.hospitales = res['hospitales'];
  			this.totalRegistros = res['total'];
  		}
  	);

  }


  cambiarDesde(valor: number){
  	let desde = this.desde + valor;
  	console.log(desde);
  	if(desde >= this.totalRegistros){
  		return;
  	}else if(desde <0){
  		return;
  	}

  	this.desde += valor;
  	this.cargarHospitales();

  }


	borrarHospital(hospital: Hospital){

		if(hospital['usuario']._id != this._us.usuario._id){
			swal('No se puede borrar el hospital', 'No puedes borrar un hospital que no has creado tú', 'error');
  		return;
		}

		swal({
  		title: '¿Estás seguro?',
  		text: 'Está a punto de borrar el hospital '+hospital.nombre,
  		icon: 'warning',
  		buttons: true,
  		dangerMode: true
  	}).then(confirm => {
  		if(confirm){
  			this._hospital.borrarHospital(hospital._id).subscribe(
  				res => {
  					console.log(res);
  					this.totalRegistros--;
  					if(this.desde >= this.totalRegistros){
  						this.desde = this.totalRegistros - 5;
  					}
  					this.cargarHospitales();
  					swal('Hospital eliminado correctamente', 'El hospital ha sido eliminado correctamente', 'success');
  				}
  			);
  		}
  	});

	}

	crearHospital(){
		swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

    	if(valor == null || valor.trim() ===''){
    		return;
    	}

    	this._hospital.crearHospital(valor).subscribe(
    		res => {
    			this.cargarHospitales();
    			swal('Guardado', 'El hospital se ha guardado correctamente', 'success');
    		}
    	);


    });
	
	}


	buscarHospital(termino: string){

		this.cargando = true;

		if(termino==null || termino.trim()===''){
			this.cargarHospitales();
			return;
		}

		this._hospital.buscarHospital(termino).subscribe(
			res => {
				console.log(res);
				this.hospitales = res;
				this.cargando = false;
			}
		);

  }


  actualizarHospital(hospital: Hospital){
  	if(hospital['usuario']._id != this._us.usuario._id){
			swal('No se puede editar el hospital', 'No puedes editar un hospital que no has creado tú', 'error');
  		return;
		}

		this._hospital.actualizarHospital(hospital).subscribe(
			res => {
				console.log(res);
				swal('Hospital actualizado', hospital.nombre, 'success');
			}
		)
  
  }

  mostrarModal(hospital: Hospital){
  	if(hospital['usuario']._id != this._us.usuario._id){
			swal('No se puede editar la foto del hospital', 'No puedes editar la foto de un hospital que no has creado tú', 'error');
  		return;
		}
  	this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }


	obtenerHospital(){
		let id = '5b927d268b647124b0525de7';
		this._hospital.obtenerHospital(id).subscribe(
			res => {
				console.log(res);
			}
		)

  }





  


  




}
