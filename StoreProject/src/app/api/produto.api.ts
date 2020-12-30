// import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Produto } from '../Models/produto.model';
import { catchError, retry } from 'rxjs/operators';
import { Compras } from '../Models/compras.model';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ProdutoApi{
    //https://localhost:44325/api/Produto/getallproducts

    // baseUrl = "https://localhost:44325/api/";
    baseUrl = environment.storeApiUrl+"Produto/";

    constructor(private http: HttpClient) {
        
    }


    getProdutos(){
        return this.http.get<Produto[]>(this.baseUrl+"getallproducts", httpOptions).pipe(catchError(this.handleError));
    }

    postCompra(content: any){
        // return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
        // .pipe(
        //   catchError(this.handleError('addHero', hero))
        // );

        // var result = this.http.post<>


        let result;
        this.http.post<Compras>(this.baseUrl+"realizarcompra", JSON.stringify(content), httpOptions).pipe(catchError(this.handleError)).subscribe((data) => {
            console.log('requestResult', data);
        });       

        
        return result;
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