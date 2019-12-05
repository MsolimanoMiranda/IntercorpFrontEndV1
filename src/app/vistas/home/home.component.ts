import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Service } from '../../servicios/service';
import { URL_SERVICIOS } from '../../../config/global';
import Swal from 'sweetalert2';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  datos: any = [];
  cliente : any =[];
  titulo_modal: any = 'Titulo';
  bodyModal: any = '';
  style_barra:any='';
  modalReference:any='';
  public usuario = { id: '1'};
  public formGroup: FormGroup;
  // tslint:disable-next-line: max-line-length
  constructor(public service: Service, public modalService: NgbModal, public activeModal: NgbActiveModal,private  formBuilder: FormBuilder ) {
    this.cargarDatos();
   }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    
    const name = '';
    const apellido = '';
    const edad = '';
    const fch_nacio = '';
    this.formGroup = this.formBuilder.group({
      Nombres: [name,Validators.required],
      Apellidos: [apellido,Validators.required],
      Edad: [edad,Validators.required],
      fecha_nacimiento:[fch_nacio,Validators.required]
    });
  }


  async register() {
    const user = this.formGroup.value;
    console.log(user);
    const url = URL_SERVICIOS + 'crearcliente';
    const data  = { "nombres":user.Nombres,
                  "apellidos":user.Apellidos,
                  "edad":user.Edad,
                  "fecha_nacimiento":user.fecha_nacimiento};


                 await this.service.postUris(url,data).subscribe(
                    async (data:any) => {
                      if( data.mensaje == "OK" ) {
                       await this.closeMOdal();
                       await this.cargarDatos();
                       await this.buildForm();
                       Swal('Se Registro el Usuario con Exito');
                    } else {

                      Swal('Error al Registrar');
              
                    }
                    },
                    (error:any) => {
                      Swal('Error con el Servicio '+error.name);
                    });
          
   

  }

  


async OpenRister(content2, caso){

  this.modalReference = this.modalService.open(content2, { centered: true });
}

async OpenAnalisis(content3,cliente){
  this.cliente=cliente[0];
  
  this.style_barra='';

  this.modalReference = this.modalService.open(content3, { centered: true });

}

closeMOdal(){

  this.modalReference.close();
}




 async openModal(content, caso) {

const url = URL_SERVICIOS + 'kpiclientes';

  await this.service.getUris(url).subscribe(
    (data: any) => {

      if( data.mensaje == "OK" ) {

        // tslint:disable-next-line: max-line-length
        this.bodyModal = caso ? 'El promedio de Edades es: ' + data.data.promedio : 'La Desviación Estandar es: ' +  data.data.desviacion_estandar ;
        this.titulo_modal = caso ? 'Promedio de Edades' : 'Desviación Estandar' ;
        this.modalReference = this.modalService.open(content, { centered: true });

      } else {

        Swal('Error no se Cargaron Datos');

      }
    },
    (error:any) => {
      Swal('Error con el Servicio '+error.name);
    });
}




 async cargarDatos() {

  const url = URL_SERVICIOS + 'listclientes';

  await this.service.getUris(url).subscribe(
    (data: any) => {

      if(data.mensaje == "OK" ) {
       
        this.datos = data.data;
      } else {

        Swal('Error no se Cargaron Datos');

      }
    },
    (error:any) => {
      Swal('Error con el Servicio '+error.name);
    });

}

}
