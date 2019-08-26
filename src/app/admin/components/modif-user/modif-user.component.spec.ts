import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifUserComponent } from './modif-user.component';

describe('ModifUserComponent', () => {
  let component: ModifUserComponent;
  let fixture: ComponentFixture<ModifUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
