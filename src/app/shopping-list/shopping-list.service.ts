import { Ingredient } from '../shared/ingredient.model';
import { Output, EventEmitter } from '@angular/core';
import {Subject } from 'rxjs';

export class ShoppingListService
{
    //For informing our component that new data is available
    ingredientsChanged = new Subject<Ingredient[]>();

    startedEditing = new Subject<number>();

    private ingredients:Ingredient[]= [
    
            new Ingredient('Apples', 5),
            new Ingredient('Tomatoes', 10),
            new Ingredient('Potatoes', 4),
                                  
    ];

    getShoppingList()
    {
        return this.ingredients.slice();
    }

    getIngredient(index:number)
    {
        return this.ingredients[index];
    }

    addIngredient(ingredient:Ingredient)
    {
        console.log("Inside Service : ", this.ingredients);

        this.ingredients.push(ingredient);
        //we will emit above event , whenever the ingredients array is changed
        this.ingredientsChanged.next(this.ingredients.slice());
    }                                              //copy of new ingredients array

    addIngredients(ingData:Ingredient[])
    {
        // for(let ing of ingData)
        // {
        //     this.addIngredient(ing);
        // }
        //Instead of above option , we will use SPREAD operator(it alows us to turn array of elements into a list of elements)

        this.ingredients.push(...ingData);
        this.ingredientsChanged.next(this.ingredients.slice());

    }         

    updateIngredient(index:number, newIngredient:Ingredient)
    {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    delIngredient(index:number)
    {
                //removing 1 element starting from position 'index'
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}