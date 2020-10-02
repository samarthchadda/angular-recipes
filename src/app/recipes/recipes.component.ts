import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  selectedRecipe : Recipe;

  constructor(private recipeService:RecipeService) { }
  //same instance of recipe service is used in RecipeCompinent (and all of its child components)

  ngOnInit(): void {

    // //listener
    // this.recipeService.recipeSelected.subscribe((recipeData:Recipe)=>{
    //   this.selectedRecipe = recipeData;
    // });

  }

}
