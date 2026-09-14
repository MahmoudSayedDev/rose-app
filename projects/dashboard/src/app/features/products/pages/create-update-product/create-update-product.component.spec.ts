import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUpdateProductComponent } from './create-update-product.component';

describe('CreateUpdateProductComponent', () => {
  let component: CreateUpdateProductComponent;
  let fixture: ComponentFixture<CreateUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUpdateProductComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
