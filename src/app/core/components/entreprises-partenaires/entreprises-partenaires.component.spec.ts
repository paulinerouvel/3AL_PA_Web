import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreprisesPartenairesComponent } from './entreprises-partenaires.component';

describe('EntreprisesPartenairesComponent', () => {
  let component: EntreprisesPartenairesComponent;
  let fixture: ComponentFixture<EntreprisesPartenairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntreprisesPartenairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntreprisesPartenairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
