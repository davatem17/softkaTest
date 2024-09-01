import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { catchError, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {
  formCreateProduct: FormGroup | any;
  viewMessage: Boolean = false;
  product: any;
  message: String = '';
  idProduct: any = this.activeRoute.snapshot.paramMap.get('id');
  constructor(private _productService: ProductService,
    private activeRoute: ActivatedRoute,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.createEditForm();
    if(this.idProduct!==null){
      this.formCreateProduct.get('id').disable();
      this.findProductID();
    }
  }
  findProductID(){
    this._productService.getProductID(this.idProduct).subscribe({
      next:(resp: any) => {
        this.product = resp;
        this.fillProductData()
        console.log('ver si trajo',resp)
      },
    });
  }
  fillProductData(){
    const fieldForm = ['id','name','description','logo','date_release','date_revision']
    fieldForm.forEach((e:any)=>{
      this.formCreateProduct.controls[e].setValue(this.product[e])
    })
    
  }
  createEditForm() {
    this.formCreateProduct = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]),
      logo: new FormControl('', Validators.required),
      date_release: new FormControl('', Validators.required),
      date_revision: new FormControl('', Validators.required),
    })
    this.formCreateProduct.get('date_release').valueChanges.subscribe(
      (date:any)=>{
        if(this.formCreateProduct.controls.date_release!==''){
          const dateOld = new Date(date);
          const yearOld = dateOld.getFullYear() - 1;
          dateOld.setFullYear(yearOld);
          this.formCreateProduct.controls.date_revision.setValue(this.formatearFecha(dateOld))
        }
      }
    )
  }
  formatearFecha(dateOld: any) {
    const date = new Date(dateOld);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  sendProduct() {
    let form = this.formCreateProduct.value
    let body = {
      "id": form.id,
      "name": form.name,
      "description": form.description,
      "logo": form.logo,
      "date_release": form.date_release,
      "date_revision": form.date_revision
    }
    if(this.idProduct!==null){
      delete body.id;
      this._productService.updateProduct(this.idProduct,body).subscribe({
        next:(resp:any)=> {
          console.log('si edito');
          this.message = 'Editado con exito';
          this.createEditForm();
          this.showModal();
          
        },
      });
    }else{
      this._productService.validateID(form.id).pipe(
        switchMap(resultadoValidacion => {
          if (!resultadoValidacion) {
            // Si la validación es exitosa, llamamos al otro servicio
            return this._productService.addProduct(body);
          } else {
            this.message = 'ID duplicado'
            this.showModal();
            // Si la validación falla, devolvemos un observable vacío o algún mensaje de error
            return of('ID duplicado');
          }
        }),
        catchError(error => {
          // Manejo de errores globales
          console.error('Error en la operación:', error);
          return of(`Error en la operación: ${error.message}`);
        })
      ).subscribe({
        next: (resp: any) => {
          if(resp.message=="Product added successfully"){
            this.message = 'Guardado con exito';
            this.createEditForm();
            this.showModal();
          }
        },
        error: error => {
          console.error('Error capturado en el subscribe:', error);
        }
      });
    }
    console.log('ver el formulario',form)
    
  }
  showModal(): void {
    this.viewMessage = true;
    setTimeout(() => {
      this.viewMessage = false;
      this.router.navigate(['/']);
    }, 1000);
   
  }
}
