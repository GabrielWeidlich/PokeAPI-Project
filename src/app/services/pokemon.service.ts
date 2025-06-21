import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset:number): Observable<any> {
    return this.http.get(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonsDetails(nameOrId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${nameOrId}`);
  }
  
}
