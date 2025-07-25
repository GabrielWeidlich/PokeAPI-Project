import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TitleCasePipe]
})
export class PokemonDetailsPage implements OnInit {
  pokemon: any;
  pokemonName: string | null = null;
  additionalInfo: any[] = [];
  sprites: string[] = [];
  isPokemonFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.pokemonName = params.get('pokemonName');
      if (this.pokemonName) {
        this.loadPokemonDetails(this.pokemonName);
        this.isPokemonFavorite = await this.favoriteService.isFavorite(this.pokemonName);
      } else {
      }
    })
  }

  loadPokemonDetails(name: string) {
    this.pokemonService.getPokemonDetails(name).subscribe({ 
      next: (data) => {
        this.pokemon = data;
        this.extractAdditionalInfo(data);
        this.extractSprites(data.sprites);
      },
      error: (error) => {
        console.error('PokemonDetailsPage: Erro ao carregar detalhes do Pokémon:', error); 
      },
      complete: () => {
        console.log('PokemonDetailsPage: Requisição de detalhes concluída.'); 
      }
    })
  }

  extractAdditionalInfo(data: any) {
    this.additionalInfo = [
      { label: 'Height', value: `${data.height / 10} m` }, 
      { label: 'Weight', value: `${data.weight / 10} kg` },   
      { label: 'Base Experience', value: data.base_experience },
      { label: 'Abilities', value: data.abilities.map((ability: any) => ability.ability.name).join(', ') },
      { label: 'Types', value: data.types.map((type: any) => type.type.name).join(', ') }
    ];
  }

  extractSprites(sprites: any) {
    if (sprites.front_default) this.sprites.push(sprites.front_default);
    if (sprites.back_default) this.sprites.push(sprites.back_default);
    if (sprites.front_shiny) this.sprites.push(sprites.front_shiny);
    if (sprites.back_shiny) this.sprites.push(sprites.back_shiny);

    if (sprites.other && sprites.other['official-artwork'] && sprites.other['official-artwork'].front_default) {
      this.sprites.push(sprites.other['official-artwork'].front_default);
    }
  }

  async toggleFavorite() {
    if (this.pokemonName) {
      if (this.isPokemonFavorite) {
        await this.favoriteService.removeFavorite(this.pokemon.name);
      } else {
        await this.favoriteService.addFavorite({
          name: this.pokemon.name, 
          url: `https://pokeapi.co/api/v2/pokemon/${this.pokemon.id}/`
        });
      }
      this.isPokemonFavorite = !this.isPokemonFavorite;
    }
  }

  goBack() {
    window.history.back();
  }
}