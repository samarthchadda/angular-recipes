import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  //array of recipes
  recipes:Recipe[];

  constructor(private recipeService: RecipeService, private routerBtn:Router) { }

  ngOnInit(): void {

    this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })

    this.recipes = this.recipeService.getRecipes();
    
  }

  // onRecipeSelected(recipe:Recipe)
  // {
  //   this.recipeWasSelected.emit(recipe);
  // }

  newRecipe()
  {
    this.routerBtn.navigate(['/recipes','new']);
  }

}
