import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from './../models/pokemon.model';
import { PokemonList } from '../models/pokemon-list.model';

const apiURL = "https://pokeapi.co/api/v2/";

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization':  'Bearer test_a8c37778328495ac24c5d0d3c3923b'
  }),
  params: new HttpParams().set('limit', '20')
};

@Injectable()
export class PokemonService {



  constructor(private http:HttpClient) { }

  getPokemon(nome:string): Observable<Pokemon> {
    return this.http.get<Pokemon>(apiURL + "pokemon/" + nome)
  }

  getAllPokemons(): Observable<PokemonList>{
    return this.http.get<PokemonList>(apiURL + "pokemon/");
  }

  post(pokemon: Pokemon){
    //[Exemplo!!] Este código abaixo não refere-se a um end-point válido
    this.http.post(apiURL + "pokemon/post", pokemon);
  }
}
