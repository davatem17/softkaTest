import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProducts(){
    return this.http.get('http://localhost:3002/bp/products')
  }
  getProductID(id: any){
    return this.http.get('http://localhost:3002/bp/products/'+id)
  }
  addProduct(body: any){
    return this.http.post('http://localhost:3002/bp/products',body)
  }
  updateProduct(id:any,body:any){
    return this.http.put('http://localhost:3002/bp/products/'+id,body)
  }
  validateID(id: any){
    return this.http.get('http://localhost:3002/bp/products/verification/'+id)
  }
}
