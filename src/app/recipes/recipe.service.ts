import { Recipe } from './recipe.model';
import { EventEmitter, Output, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService
{    
    recipesChanged = new Subject<Recipe[]>();

    //private is used , so that we can't directly access this array from outside
    private recipes:Recipe[] = [
        new Recipe("Japanese Noodles","Tasty Noodles","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpiZffoaEeE2424SSQpWUquSZ5bYjjKWye7w&usqp=CAU",
        [
            new Ingredient('Soya Sauce',2),
            new Ingredient('Meat',1),
            
        ]),
        new Recipe("A Fat Burger ","THis is very delicious","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSutpowkTyaNKRLkAsUyEK_iWzLO3w8d1OYRQ&usqp=CAU",
        [
            new Ingredient('Buns',2),
            new Ingredient('Cheese Slice',3),
            
        ])
      ];
    
    constructor(private shoppingService:ShoppingListService )
    {
                
    }
    
    getRecipes()
    {
        return this.recipes.slice();   //we are returning new array , which is exact copy of above array
    }

    addIngredientsToShoppingList(ingredients:Ingredient[])
    {
        this.shoppingService.addIngredients(ingredients);
    }

    getRecipe(index:number)
    {
        return this.recipes[index];
    }

    appRecipe(recipe:Recipe)
    {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe:Recipe)
    {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number)
    {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

}

