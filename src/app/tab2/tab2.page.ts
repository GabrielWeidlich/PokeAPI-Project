import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TitleCasePipe
  ]
})
export class Tab2Page {
  favoritePokemon: any[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private router: Router   
  ) {}

  ionViewWillEnter() {
    this.favoritePokemon = this.favoriteService.getFavorites();
  }

  goToDetails(pokemonName: string) {
    this.router.navigate(['/tabs/tab1/details', pokemonName]);
  }

  getPokemonId(pokemonUrl: string): string{
    const parts = pokemonUrl.split('/');
    return parts[parts.length - 2];
  }

  getPokemonImageUrl(pokemonUrl: string): string {
    const id = this.getPokemonId(pokemonUrl);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
