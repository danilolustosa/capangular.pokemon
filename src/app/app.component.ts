import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './services/pokemon.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pokemon';
  pokemon:Pokemon = {};
  error:boolean = false;
  errorMessage:string = "";

  constructor(private service:PokemonService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      const nomePokemon = params['nome'];

      if (nomePokemon){
        this.getPokemon(nomePokemon);
      }

    });
  }

  onSubmit(form:NgForm){

    //type Form = { nome:string }
    //let formValue:Form = form.value;


    if (form.valid){
      this.getPokemon(form.value.nome);
    } else {
      this.error = true;
      this.errorMessage = "Nome do Pokémon não informado";
    }


  }

  getPokemon(nome:string){
    this.service.getPokemon(nome)
    .subscribe((response:any) => {
      this.error = false;
      this.pokemon = response;
      console.log(this.pokemon);
    }, (error:HttpErrorResponse) => {
      if (error.status == 404) {
        this.error = true;
        this.errorMessage = "Pokémon não encontrado";
      }
    });
  }


}
