import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from '../services/product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3002/bp/products';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule para simular HttpClient
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should handle error', () => {
    const errorMessage = 'Failed to load products';

    service.getProducts().subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error) => {
        expect(error.message).toContain(errorMessage);
      }
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' }); // Simula un error del servidor
  });
});
