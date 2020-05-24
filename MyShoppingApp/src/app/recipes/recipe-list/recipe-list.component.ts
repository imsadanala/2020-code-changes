import { Component, OnInit } from '@angular/core';
import { Recipe } from '../receipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A', 'A for Apple', 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/Kia-Seltos/6232/1562746799300/front-left-side-47.jpg?tr=w-880,h-495,e-sharpen'),
    new Recipe('B', 'B for Boy', 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/Kia-Seltos/6232/1562746799300/front-left-side-47.jpg?tr=w-880,h-495,e-sharpen')
  ];

  constructor() { }

  ngOnInit() {
  }

}
