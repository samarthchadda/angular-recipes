import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  //accessing whole form using ViewChild
  @ViewChild('form') slForm:NgForm;

  subscription:Subscription;
  editMOde = false;
  editedItemIndex:number;
  editedItem:Ingredient;

  // @ViewChild('nameInput',{static:true}) nameInputRef : ElementRef;

  // @ViewChild('amtInput',{static:true}) amtInputRef : ElementRef;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  
  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription =  this.shoppingService.startedEditing.subscribe((index:number)=>{
      this.editMOde = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingService.getIngredient(index);

      this.slForm.setValue({
        name:this.editedItem.name,
        amount :this.editedItem.amount
      })

    });
  }

  onSubmit(form:NgForm)
  {
    // const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value,this.amtInputRef.nativeElement.value);
    // console.log(newIngredient);
    // // this.ingredientAdded.emit(newIngredient);
       
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMOde)
    {
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
    this.shoppingService.addIngredient(newIngredient); 
    }
    this.editMOde = false;
    form.reset();
  }

  onClear()
  {
    this.slForm.reset();
    this.editMOde = false;
  }

  onDelete()
  {
    this.shoppingService.delIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }


}
