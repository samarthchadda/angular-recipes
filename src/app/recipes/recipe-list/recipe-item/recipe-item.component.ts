import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  
  @Input() index : number;

                                //because it contain no information
  // @Output() recipeSelected = new EventEmitter<void>();
     
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }

}
