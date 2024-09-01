import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products: any[] = [];
  pageSize = 5;
  totalPages = 0;
  totalProducts = 0;
  currenttPage = 0;
  currentPage = 1;
  mostrarMensaje = true
  productsOnDisplay: any[] = [];
  constructor(private _productService: ProductService,
    public router: Router
  ){}
  ngOnInit(){
    
    this.findProducts();
    setTimeout(() => {
      this.mostrarMensaje= false;
    }, 3000);
  }
  findProducts(){
    this._productService.getProducts().subscribe({
      next: (resp: any) => {
        console.log('ver la respuesta',resp.data)
        this.products = resp.data;
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        this.viewProductsOnDisplay(this.products);
      },
      error(err) {
        
      },
    });
  }
  changePageSize(event: any){
    console.log('ver el evento',event.value)
    this.pageSize = event.value;
    this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
    this.viewProductsOnDisplay(this.products);
  }
  viewProductsOnDisplay(products: any){
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.productsOnDisplay = products.slice(startIndex,endIndex)
  }
  editProductPage(id:any){
    this.router.navigate(['/edit/'+id]);
  }
  changePage(page: any){
    this.currentPage = page;
    this.viewProductsOnDisplay(this.products);
  }
  probar(evt: any){
    console.log('ver lo que cambia',evt.value)
  }
  onSearch(query: any) {
    let product
    product = this.products.filter(product =>
      product.name.toLowerCase().includes(query.value.toLowerCase()) ||
      product.description.toLowerCase().includes(query.value.toLowerCase())
    );
    this.viewProductsOnDisplay(product)
  }
  changePageCreate(){
    this.router.navigate(['/create']);
  }
}
