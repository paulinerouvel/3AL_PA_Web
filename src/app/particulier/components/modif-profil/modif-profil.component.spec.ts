import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifProfilComponent } from './modif-profil.component';

describe('ModifProfilComponent', () => {
  let component: ModifProfilComponent;
  let fixture: ComponentFixture<ModifProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
