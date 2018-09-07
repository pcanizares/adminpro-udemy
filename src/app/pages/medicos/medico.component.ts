import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/service.index';
import { HospitalService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

	hospitales: Hospital[] = [];

	medico: Medico = new Medico('', '', '', '', '');

	hospital: Hospital = new Hospital('');

  constructor(
  	public _medicoService: MedicoService,
  	public _hospitalService: HospitalService,
  	public _router: Router,
  	public _activatedRoute: ActivatedRoute,
  	public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

  	this._hospitalService.cargarHospitales().subscribe(
  		res => {
  			this.hospitales = res['hospitales'];
  		}
  	);


  	this._activatedRoute.params.subscribe( params => {
  		if(params['id']!='nuevo'){
  			this.cargarMedico(params['id']);
  		}
  	});

  	this._modalUploadService.notificacion.subscribe(
      res => {
        this.medico.img = res.medico.img;
      }
    );

  }

  guardarMedico(forma: NgForm){
  	console.log(forma.valid);
  	console.log(forma.value);
  	if(forma.invalid){
  		return;
  	}

  	this._medicoService.guardarMedico(this.medico).subscribe(
  		res => {
  			console.log(res);
  			this.medico._id = res._id;
  			this._router.navigate(['/medico', res._id])
  		}
  	);
  }


  cambioHospital(event){
  	this._hospitalService.obtenerHospital(event).subscribe(
  		res => {
  			this.hospital =  res['hospital'];
  		}
  	)
  }


  cargarMedico(id: string){
  	this._medicoService.cargarMedico(id).subscribe(
  		res => {
  			this.medico = res;
  			this.medico.hospital = res['hospital']._id;
  			this.cambioHospital(this.medico.hospital);
  		}
  	)
  }


  cambiarFoto(){
  	this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
