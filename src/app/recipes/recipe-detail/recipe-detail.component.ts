import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe;

  id:number;

  constructor(private recipeService:RecipeService,
      private route:ActivatedRoute, private routerBtn:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((paramsData:Params)=>{
      this.id = +paramsData['id'];   //using '+' for typecasting to number
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  onAddToShoppingList()
  {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe()
  {
    this.routerBtn.navigate(['/recipes', this.id, 'edit']); 
  }

  onDeleteRecipe()
  {
    this.recipeService.deleteRecipe(this.id);
    this.routerBtn.navigate(['/recipes']);
  }

}
