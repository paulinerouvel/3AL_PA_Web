import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsPartenairesComponent } from './associations-partenaires.component';

describe('AssociationsPartenairesComponent', () => {
  let component: AssociationsPartenairesComponent;
  let fixture: ComponentFixture<AssociationsPartenairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationsPartenairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationsPartenairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
