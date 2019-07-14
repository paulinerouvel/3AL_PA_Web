import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonAssoComponent } from './don-asso.component';

describe('DonAssoComponent', () => {
  let component: DonAssoComponent;
  let fixture: ComponentFixture<DonAssoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonAssoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonAssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
