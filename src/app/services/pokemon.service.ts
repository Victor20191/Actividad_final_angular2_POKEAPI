import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemon(nameOrId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${nameOrId}`);
  }

  getAllPokemon(limit: number = 20): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}`).pipe(
      map((response: any) => {
        return response.results.map((pokemon: any, index: number) => {
          return {
            ...pokemon,
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
          };
        }); 
      })
    );
  }
}