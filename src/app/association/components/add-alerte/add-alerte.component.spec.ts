import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlerteComponent } from './add-alerte.component';

describe('AddAlerteComponent', () => {
  let component: AddAlerteComponent;
  let fixture: ComponentFixture<AddAlerteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlerteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
