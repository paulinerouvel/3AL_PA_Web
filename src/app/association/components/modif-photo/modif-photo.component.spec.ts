import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifPhotoComponent } from './modif-photo.component';

describe('ModifPhotoComponent', () => {
  let component: ModifPhotoComponent;
  let fixture: ComponentFixture<ModifPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
