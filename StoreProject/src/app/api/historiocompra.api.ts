import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Produto } from '../Models/produto.model';
import { catchError, retry } from 'rxjs/operators';
import { Compras } from '../Models/compras.model';
import { HistoricoCompras } from '../Models/historicocompras.model';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class HistorioComprasApi{
    //https://localhost:44325/api/Produto/getallproducts

    // baseUrl = "https://localhost:44325/api/HistoricoCompras/";
    baseUrl = environment.storeApiUrl+"HistoricoCompras/";
    
    constructor(private http: HttpClient) {
        
    }

    getallHistory(userId: string){
        console.log('userId: *API: ', userId);
        
        return this.http.get<HistoricoCompras[]>(this.baseUrl+"getallhistorybyId/"+userId, httpOptions).pipe(catchError(this.handleError));
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }

    
}