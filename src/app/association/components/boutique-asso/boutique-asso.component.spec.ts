import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueAssoComponent } from './boutique-asso.component';

describe('BoutiqueAssoComponent', () => {
  let component: BoutiqueAssoComponent;
  let fixture: ComponentFixture<BoutiqueAssoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoutiqueAssoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutiqueAssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
