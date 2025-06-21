import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
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
    ExploreContainerComponent]
})
export class Tab1Page implements OnInit {
  pokemons: any[] = [];
  limit = 20;
  offset = 0;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: InfiniteScrollCustomEvent) {
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (response) => { 
        this.pokemons = this.pokemons.concat(response.results);
        this.offset += this.limit;
        if (event) {
          event.detail.complete(); 
        }
      },
      error: (error) => { 
        console.error('Erro ao carregar Pokémons:', error);
        if (event) {
          event.detail.complete();
        }
      }
    })};

    goToDetails(pokemonName: string) {
      this.router.navigate(['/tabs/tab1/details', pokemonName]);
    }

    loadMorePokemons(event: InfiniteScrollCustomEvent) {
      this.loadPokemons(event);
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
