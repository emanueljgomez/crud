import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://crud-2f901-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: Heroe) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
      })
    );
  }

  actualizarHeroe(heroe: Heroe) {
    /*  const heroeTemp = {
      ...heroe,
    };

    delete heroeTemp.id; */

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroe);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArreglo), delay(1500));
  }

  private crearArreglo(heroesObj: object) {
    const heroes: Heroe[] = [];

    console.log(heroesObj);

    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach((key) => {
      const heroe: Heroe = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }
}
