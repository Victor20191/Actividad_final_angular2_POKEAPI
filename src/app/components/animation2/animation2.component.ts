import { ChangeDetectionStrategy, Component, OnInit, signal, computed, effect } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

interface Pokemon {
  name: string;
  id: number;
  image: string;
}

@Component({
  selector: 'app-animation2',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HeaderComponent,
    FooterComponent
],
  providers: [PokemonService],
  template: `
  <app-header></app-header>
  <div class="content">
    <div class="grid-container">
      <h1>Lista de Pokémon</h1>
      @if (loading()) {
        <div class="loader-area">
          <div class="loader-container">
            <span class="loader"></span>
          </div>
        </div>
      } @else {
        @if (selectedPokemonId() === null) {
          @if (pokemonList().length > 0) {
            <div class="pokemon-list" style="cursor: pointer;">
              @for (pokemon of pokemonList(); track pokemon.id) {
                <div class="pokemon-item" (click)="selectPokemon(pokemon.id)">
                  <img [src]="pokemon.image" [alt]="pokemon.name">
                  <p>{{ pokemon.name }}</p>
                </div>
              }
            </div>
          } @else {
            <p>No se encontraron Pokémon</p>
          }
        } @else {
          <div class="centered-container">
            <h1>{{pokemonData()?.species?.name}}</h1>
            @if(animationArray().length === 2 && imagenActual()) {
              <img [src]="imagenActual()" alt="Imagen de animación" height="150" width="150">
            }
            <button mat-button (click)="closeDetail()">Volver a la lista</button>
          </div>
        }
      }
    </div>
  </div>
  <app-footer></app-footer>
`,
  styleUrl: './animation2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AnimationComponent2 implements OnInit {
  loading = signal(true);
  pokemonList = signal<Pokemon[]>([]);
  selectedPokemonId = signal<number | null>(null);
  
  pokemonData = signal<any>(null);
  animationArray = signal<string[]>([]);
  indiceActual = signal(0);
  animating = signal(false);

  imagenActual = computed(() => {
    const array = this.animationArray();
    return array.length > 0 ? array[this.indiceActual()] : '';
  });

  constructor(
    private pokemonService: PokemonService,
    private _snackBar: MatSnackBar
  ) {
    effect(() => {
      if (this.animating()) {
        this.animateFrames();
      }
    });
  }

  ngOnInit() {
    this.loadAllPokemon();
  }

  loadAllPokemon() {
    this.loading.set(true);
    this.pokemonService.getAllPokemon().subscribe({
      next: (pokemonList: Pokemon[]) => {
        this.pokemonList.set(pokemonList);
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error(err);
        this.openSnackBarError('Error al cargar los Pokémon');
        this.loading.set(false);
      }
    });
  }

  selectPokemon(id: number) {
    this.selectedPokemonId.set(id);
    this.loadPokemonAnimation(id);
  }

  loadPokemonAnimation(id: number) {
    this.loading.set(true);
    this.pokemonService.getPokemon(id.toString()).subscribe({
      next: (pokemon: any) => {
        this.pokemonData.set(pokemon);
        this.loading.set(false);
        this.animationArray.set([
          pokemon.sprites.front_default,
          pokemon.sprites.back_default
        ]);
        this.iniciarAnimacion();
        this.playSound(pokemon.cries.latest);
      },
      error: (err: any) => {
        console.error(err);
        this.openSnackBarError('Error al cargar el Pokémon');
        this.loading.set(false);
      }
    });
  }

  closeDetail() {
    this.selectedPokemonId.set(null);
    this.detenerAnimacion();
  }

  openSnackBarError(message: string) {
    this._snackBar.open(message, 'Cerrar', {duration: 3000});
  }

  playSound(soundSource: string) {
    const audio = new Audio();
    audio.src = soundSource;
    audio.load();
    audio.play();
  }

  iniciarAnimacion() {
    this.indiceActual.set(0);
    this.animating.set(true);
  }

  animateFrames() {
    setTimeout(() => {
      if (this.animating()) {
        this.indiceActual.update(index => (index + 1) % this.animationArray().length);
        this.animateFrames();
      }
    }, 300);
  }

  detenerAnimacion() {
    this.animating.set(false);
  }
}