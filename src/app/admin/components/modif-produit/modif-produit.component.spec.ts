import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifProduitComponent } from './modif-produit.component';

describe('ModifProduitComponent', () => {
  let component: ModifProduitComponent;
  let fixture: ComponentFixture<ModifProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
