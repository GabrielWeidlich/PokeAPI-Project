import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const POKEMON_FAVORITES_KEY = 'pokemonFavorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _storage: Storage | null = null;
  private favorites: any[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadFavorites();
  }

  private async loadFavorites() {
    const storedFavorites = await this._storage?.get(POKEMON_FAVORITES_KEY);
    if (storedFavorites) {
      this.favorites = storedFavorites;
    }
  }
  async addFavorite(pokemon: any) {
    const index = this.favorites.findIndex(fav => fav.name === pokemon.name);
    if (index === -1) {
      this.favorites.push(pokemon);
      await this._storage?.set(POKEMON_FAVORITES_KEY, this.favorites);
    }
  }

  async removeFavorite(pokemon: any) {
    this.favorites = this.favorites.filter(fav => fav.name !== pokemon.name);
    await this._storage?.set(POKEMON_FAVORITES_KEY, this.favorites);
  }

  isFavorite(pokemonName: string): boolean {
    return this.favorites.some(fav => fav.name === pokemonName);
  }

  getFavorites(): any[] {
    return this.favorites;
  }
}
