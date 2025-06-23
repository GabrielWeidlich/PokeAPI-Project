import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';

import { PokemonService } from '../services/pokemon.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    TitleCasePipe,

  ]
})

export class Tab1Page implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  limit = 20;
  offset = 0;
  isSearching = false;
  searchTerm: string = '';
  canLoadMore = true;
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;


  constructor(private pokemonService: PokemonService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this.loadPokemons();
  }

  loadMorePokemons(event: InfiniteScrollCustomEvent) {


    if (!this.isSearching && this.canLoadMore) {

      this.loadPokemons(event);
    } else {

      if (this.infiniteScroll) {
        this.infiniteScroll.complete();
      }

    }
  }

  loadPokemons(event?: InfiniteScrollCustomEvent) {
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (response) => {
        const newPokemons = response.results;

        if (newPokemons.length === 0 && this.offset > 0) {
          this.canLoadMore = false;
        } else {
          this.pokemons = this.pokemons.concat(newPokemons);
          this.offset += this.limit;

          if (!this.isSearching) {
            this.filteredPokemons = [...this.pokemons];
          } else {
            this.filterPokemons();
          }


          if (this.infiniteScroll) {
            this.infiniteScroll.complete();
          } else {

            if (event && event.detail && typeof event.detail.complete === 'function') {
              event.detail.complete();
            }
          }


          if (newPokemons.length < this.limit) {
            this.canLoadMore = false;
            if (this.infiniteScroll) {
              this.infiniteScroll.disabled = true;

            }
          } else {
            this.canLoadMore = true;
            if (this.infiniteScroll && this.infiniteScroll.disabled) {
              this.infiniteScroll.disabled = false;
            }
          }
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        if (this.infiniteScroll) {
          this.infiniteScroll.complete();
          this.infiniteScroll.disabled = true;
        } else if (event && event.detail && typeof event.detail.complete === 'function') {
          event.detail.complete();
        }
        this.canLoadMore = false;
        this.cdr.detectChanges();
      }
    });
  }

  filterPokemons() {
    const searchTerm = this.searchTerm.toLowerCase().trim();
    this.isSearching = searchTerm.length > 0;

    if (!searchTerm) {
      this.filteredPokemons = [...this.pokemons];
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
    }
    this.cdr.detectChanges();
  }

  searchPokemonByNameOrId() {
  const trimmedTerm = this.searchTerm.trim().toLowerCase();

  if (!trimmedTerm) {
    console.log('Busca vazia');
    return;
  }

  this.pokemonService.getPokemonDetails(trimmedTerm).subscribe({
    next: (pokemon) => {
      console.log('Pokémon encontrado:', pokemon);
      this.router.navigate(['/tabs/tab1/details', trimmedTerm]);
    },
    error: (error) => {
      console.error('Erro ao buscar Pokémon:', error);
    }
  });
}


  resetSearch() {
    this.searchTerm = '';
    this.isSearching = false;
    this.filteredPokemons = [...this.pokemons];
    this.cdr.detectChanges();
  }

  goToDetails(pokemonName: string) {
    this.router.navigate(['/tabs/tab1/details', pokemonName]);
  }


  getPokemonId(pokemonUrl: string): string {
    const parts = pokemonUrl.split('/');
    return parts[parts.length - 2];
  }

  getPokemonImageUrl(pokemonUrl: string): string {
    const id = this.getPokemonId(pokemonUrl);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
