import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cars: any;
  filtro: string = '';
  criterioFiltro: string = 'marca';

  
  onRadioValueChanged(event: any) {
    console.log("Criterio de búsqueda seleccionado: "+event.detail.value);
    this.criterioFiltro = event.detail.value;
  }

  constructor(private httpClient: HttpClient) {
    this.cars = this.httpClient.get('https://raw.githubusercontent.com/Alvaromorenogil/ProyectoCoches/master/coches.json');
  }
}
