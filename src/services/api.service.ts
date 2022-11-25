import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Produto } from 'src/model/produtos';
import { Usuario } from 'src/model/usuario';
import { NgForm } from '@angular/forms';

const apiUrl = 'http://localhost:5087/Produto/pegarProduto';
const apiLoginUrl = 'http://localhost:5087/Usuario/Login';
var token = localStorage.getItem("jwt");
var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  montaHeaderToken() {
    token = localStorage.getItem("jwt");
    console.log('jwt header token ' + token);
    httpOptions = {headers: new HttpHeaders({"Authorization": "Bearer " + token,"Content-Type": "application/json"})};
  }

  Login (Usuario: NgForm): Observable<Usuario> {
    return this.http.post<Usuario>(apiLoginUrl, Usuario).pipe(
      tap((Usuario: Usuario) => console.log(`Login usuario com email =${Usuario.Email}`)),
      catchError(this.handleError<Usuario>('Login'))
    );
  }

  getProdutos (): Observable<Produto[]> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Produto[]>(apiUrl, httpOptions)
      .pipe(
        tap(Produto => console.log('leu os produtos')),
        catchError(this.handleError('getProdutos', []))
      );
  }

  getProduto(id: number): Observable<Produto> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Produto>(url, httpOptions).pipe(
      tap(_ => console.log(`leu o produto id=${id}`)),
      catchError(this.handleError<Produto>(`getProduto id=${id}`))
    );
  }

  addProduto (Produto: any): Observable<Produto> {
    this.montaHeaderToken();
    return this.http.post<Produto>(apiUrl, Produto, httpOptions).pipe(
      tap((Produto: Produto) => console.log(`adicionou o Produto com w/ id=${Produto.idProduto}`)),
      catchError(this.handleError<Produto>('addProduto'))
    );
  }

  updateProduto(id: any, Produto: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Produto, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produto com id=${id}`)),
      catchError(this.handleError<any>('updateProduto'))
    );
  }

  deleteProduto (id: any): Observable<Produto> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Produto>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o Produto com id=${id}`)),
      catchError(this.handleError<Produto>('deleteProduto'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
