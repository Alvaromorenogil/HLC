import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  movies: any;
  filtro: string = '';
  criterioFiltro: string = 'titulo';

  
  onRadioValueChanged(event: any) {
    console.log("Criterio de búsqueda seleccionado: "+event.detail.value);
    this.criterioFiltro = event.detail.value;
  }

  constructor(private httpClient: HttpClient) {
    this.movies = this.httpClient.get('https://raw.githubusercontent.com/sergiomateos2daw/ProyectoPeliculas/master/peliculas.json');
  }
    
}
