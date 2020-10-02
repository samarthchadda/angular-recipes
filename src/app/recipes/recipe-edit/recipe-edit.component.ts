import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray , Validators} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, private recService:RecipeService, private routerBtn:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((paramsData:Params)=>{
        this.id = +paramsData['id'];
        this.editMode = paramsData['id']!=null;  // id will only be not undefined, if we are in edit mode
        console.log(this.editMode);   //true -- edit mode,  false -- new mode

        this.initForm();

    });
  }

  onSubmit()
  {
    console.log(this.recipeForm.value);

    const newRecipe = new Recipe(this.recipeForm.value['name'],
                                this.recipeForm.value['desc'],
                                this.recipeForm.value['imgPath'],
                                this.recipeForm.value['ingredients']);

    if(this.editMode){
      this.recService.updateRecipe(this.id,newRecipe);
    }
    else{
      this.recService.appRecipe(newRecipe);
    }

    // this.routerBtn.navigate(['/recipes',this.id]);
    this.onCancel();

  }

  private initForm()
  {    
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngredients= new FormArray([]);
    if(this.editMode)
    {
      const recipe = this.recService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDesc = recipe.description;
      if(recipe['ingredients']){
        for(let ing of recipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ing.name,Validators.required),
              'amount':new FormControl(ing.amount,[
                 Validators.required,
                 Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imgPath' : new FormControl(recipeImgPath, Validators.required),
      'desc' : new FormControl(recipeDesc,Validators.required),
      'ingredients':recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient()
  {
    //accessing ingredeints control from recipeForm
          //aftercasting, the following is an FormArray
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null, Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
         ])
      })
    );
  }

  onDelIngredient(index:number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel()
  {
    // this.routerBtn.navigate(['/recipes',this.id]);
    //OR
    this.routerBtn.navigate(['../'],{relativeTo:this.route});  //going up one level
  }

}
