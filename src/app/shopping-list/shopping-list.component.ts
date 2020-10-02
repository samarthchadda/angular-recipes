import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers:[ShoppingListService]
  //We will provide it in AppMOdule, because we want to use that service in RecipeComponent also(and also in other services)
})
export class ShoppingListComponent implements OnInit ,OnDestroy{

  ingredients:Ingredient[];
  private igChangeSub:Subscription;

  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getShoppingList();
    this.igChangeSub = this.shoppingService.ingredientsChanged.subscribe((ingredientsArr:Ingredient[])=>{
      this.ingredients = ingredientsArr;
    });
  }

  onEditItem(index:number)
  {
    this.shoppingService.startedEditing.next(index);
  }
  
  ngOnDestroy()
  {
    this.igChangeSub.unsubscribe();
  }

}
