import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonPanierAssoComponent } from './mon-panier-asso.component';

describe('MonPanierAssoComponent', () => {
  let component: MonPanierAssoComponent;
  let fixture: ComponentFixture<MonPanierAssoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonPanierAssoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonPanierAssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
