import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateEditComponent } from './create-edit.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';

class ActivatedRouteStub {
  
  snapshot = { params: {} };
  params = of({}); // Simula el observable params
}
describe('CreateEditComponent', () => {
  let component: CreateEditComponent;
  let fixture: ComponentFixture<CreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CreateEditComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  // Simula el valor que desees para el parámetro 'id'
                  return key === 'id' ? '123' : null;
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
