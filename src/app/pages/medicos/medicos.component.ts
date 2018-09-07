import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { UsuarioService } from '../../services/service.index';

declare var swal: any;


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

	cargando: boolean = true;

	desde: number = 0;

	totalRegistros: number = 0;

	medicos: Medico[] = [];

  constructor(
  	public _medicoService: MedicoService,
  	public _us: UsuarioService
  ) { }

  ngOnInit() {
  	this.cargarMedicos();
  }


  cargarMedicos(){
  	this.cargando = true;
  	this._medicoService.cargarMedicos(this.desde).subscribe(
  		res => {
  			console.log(res);
  			this.medicos = res['medicos'];
  			this.totalRegistros = res['total'];
  			this.cargando = false;
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
  	this.cargarMedicos();

  }

  borrarMedico(medico: Medico){

		if(medico['usuario']['_id'] != this._us.usuario._id){
			swal('No se puede borrar el medico', 'No puedes borrar un medico que no has creado tú', 'error');
  		return;
		}

		swal({
  		title: '¿Estás seguro?',
  		text: 'Está a punto de borrar el hospital '+medico.nombre,
  		icon: 'warning',
  		buttons: true,
  		dangerMode: true
  	}).then(confirm => {
  		if(confirm){
  			this._medicoService.borrarMedico(medico._id).subscribe(
  				res => {
  					console.log(res);
  					this.totalRegistros--;
  					if(this.desde >= this.totalRegistros){
  						this.desde = this.totalRegistros - 5;
  					}
  					this.cargarMedicos();
  					swal('Médico eliminado correctamente', 'El médico ha sido eliminado correctamente', 'success');
  				}
  			);
  		}
  	});

	}


  buscarMedico(termino: string){

		this.cargando = true;

		if(termino==null || termino.trim()===''){
			this.cargarMedicos();
			return;
		}

		this._medicoService.buscarMedico(termino).subscribe(
			res => {
				console.log(res);
				this.medicos = res;
				this.cargando = false;
			}
		);

  }



}
