import { Injectable } from '@angular/core';
import { HistorioComprasApi } from '../api/historiocompra.api';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private _apiHistorico: HistorioComprasApi) { }


  getAllHistory(userId: string){
    return this._apiHistorico.getallHistory(userId);
  }
}
