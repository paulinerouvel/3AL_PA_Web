import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonPanierPartComponent } from './mon-panier-part.component';

describe('MonPanierPartComponent', () => {
  let component: MonPanierPartComponent;
  let fixture: ComponentFixture<MonPanierPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonPanierPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonPanierPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
