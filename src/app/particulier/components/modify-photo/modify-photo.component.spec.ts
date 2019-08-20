import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPhotoComponent } from './modify-photo.component';

describe('ModifyPhotoComponent', () => {
  let component: ModifyPhotoComponent;
  let fixture: ComponentFixture<ModifyPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
