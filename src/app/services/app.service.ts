import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../product";
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl: string = `${environment.serverUrl}/api/product`

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
  }

  getProductById(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/' + id)
  }

  addProduct(product: Product): Observable<number> {
    return this.http.post<{ id: number }>(this.apiUrl, product)
      .pipe(
        map((res: { id: number }) => res.id),
      )
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.apiUrl + '/' + product.id, product)
  }

  deleteProduct(id: number): Observable<string> {
    return this.http.delete<string>(this.apiUrl + '/' + id)
  }
}
