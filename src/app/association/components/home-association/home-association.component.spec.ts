import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAssociationComponent } from './home-association.component';

describe('HomeAssociationComponent', () => {
  let component: HomeAssociationComponent;
  let fixture: ComponentFixture<HomeAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
