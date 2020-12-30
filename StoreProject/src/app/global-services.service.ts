import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Globals } from './globals';
import { prod } from './random-prods/random-prods.component';


@Injectable({
  providedIn: 'root'
})
export class GlobalServices {

  constructor(public globals: Globals) { }








}
