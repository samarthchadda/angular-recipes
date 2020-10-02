import { Ingredient } from '../shared/ingredient.model';

export class Recipe
{
    //adding properties
    public name:string; 
    public description:string;
    public imagePath:string;   // we will not store the image, but the path pointing to the image
    public ingredients : Ingredient[];

    constructor(nm:string, desc:string, imgPath:string , ingArray:Ingredient[])
    {
        this.name = nm;
        this.description = desc;
        this.imagePath = imgPath;
        this.ingredients = ingArray;
    }

}