import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Coche } from '../coche';
import { Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cocheEditando: Coche;
  arrayColeccionCoches: any = [{

    id: "",
    data: {} as Coche

  }];

  idCocheSelec: string;

  constructor(private firestoreService: FirestoreService, private router: Router, 
      private callNumber: CallNumber, private socialSharing: SocialSharing
    ) {

    this.cocheEditando = {} as Coche;
    this.obtenerListaCoches();

  }

  clickBotonInsertar(){
    this.firestoreService.insertar("coches", this.cocheEditando).then(
      () => { 
        console.log("Coche creado correctamente");
        //Limpiamos el contenido del coche que se estaba editando
        this.cocheEditando = {} as Coche
      }, (error) => {
        console.log(error);
      }
    );
  }

  obtenerListaCoches(){
    this.firestoreService.consultar("coches").subscribe((resultadoConsultaCoches) => {
      this.arrayColeccionCoches = [];
      resultadoConsultaCoches.forEach((datosCoche: any) =>
      {
        this.arrayColeccionCoches.push({
          id: datosCoche.payload.doc.id,
          data: datosCoche.payload.doc.data()
        })
      })
    })
  }

  selecCoche(cocheSelec) {
    console.log("Coche seleccionado: ");
    
    if (cocheSelec == false){
      console.log("nueva");
      this.router.navigate(['/detalle', "nueva"]);
    } else{
      console.log(cocheSelec);
      this.idCocheSelec = cocheSelec.id;
      this.cocheEditando.marca = cocheSelec.data.Nombre;
      this.cocheEditando.modelo = cocheSelec.data.Continente;
      this.router.navigate(['/detalle', this.idCocheSelec]);
    }
    
  }

  compartir() {
    const options = {
      message: 'Hola esto es compartir con SocialSharing',
      chooserTitle: 'Compartir con...'
    };

    this.socialSharing.shareWithOptions(options)
      .then(() => {
        console.log('Mensaje compartido correctamente');
      }).catch((error) => {
        console.log('Error al compartir el mensaje: ', error);
      });
  }

  llamar(){

       this.callNumber.callNumber("651065453", true)
       .then(res => console.log('Llamada realizada', res))
       .catch(err => console.log('Error en realizar la llamada', err));

  }

}