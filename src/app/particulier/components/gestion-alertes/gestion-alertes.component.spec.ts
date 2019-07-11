import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAlertesComponent } from './gestion-alertes.component';

describe('GestionAlertesComponent', () => {
  let component: GestionAlertesComponent;
  let fixture: ComponentFixture<GestionAlertesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAlertesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAlertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
