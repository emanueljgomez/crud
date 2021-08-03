import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Heroe[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
      this.cargando = false;
    });
  }

  borrarHeroe(heroe: Heroe, i: number) {
    Swal.fire({
      title: 'Confirmar eliminación',
      text: `${heroe.nombre} va a ser borrado, ¿Desea confirmar?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
}
