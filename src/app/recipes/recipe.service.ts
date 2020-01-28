import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()

    private recipes: Recipe[] = [
        new Recipe(
            'Porridge',
            'A breakfast meal',
            'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg',
            [
                new Ingredient('Cucumbers', 2),
                new Ingredient('Eggs', 3),
                new Ingredient('Buckwheat', 1)
            ]),
        new Recipe(
            'Lasagna',
            'A cake with cheese',
            'https://live.staticflickr.com/2575/3716908330_0a5a489309_b.jpg',
            [
                new Ingredient('Cheese', 1),
                new Ingredient('Eggs', 3),
            ]),
        new Recipe(
            'Chocolate cake',
            'A cake with chocolate',
            'https://live.staticflickr.com/3735/11370696464_a355682578_b.jpg',
            [
                new Ingredient('Chocolate', 1),
                new Ingredient('Butter', 1),
            ]),
    ];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }
    
    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}