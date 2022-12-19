import { Component } from '@angular/core';
import { Coche } from '../coche';

import { FirestoreService } from '../firestore.service';

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

  constructor(private firestoreService: FirestoreService) {
    // Crear un coche vacio al empezar
    this.cocheEditando = {} as Coche;

    this.obtenerListaCoches();
  }

  clickBotonInsertar() {
    this.firestoreService.insertar("coches", this.cocheEditando)
    .then(() => {
      console.log("Coche creado correctamente");
      // Limpiar el contenido del coche que se estaba editando
      this.cocheEditando = {} as Coche;
    }, (error) => {
      console.error(error);
    });
  }

  obtenerListaCoches() {
    this.firestoreService.consultar("coches").subscribe((resultadoConsultaCoches) => {
      this.arrayColeccionCoches = [];
      resultadoConsultaCoches.forEach((datosCoche: any) => {
        this.arrayColeccionCoches.push({
          id: datosCoche.payload.doc.id,
          data: datosCoche.payload.doc.data()
        })
      })
    }
    )
  }

}
