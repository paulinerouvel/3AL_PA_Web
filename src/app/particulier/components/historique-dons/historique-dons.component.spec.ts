import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueDonsComponent } from './historique-dons.component';

describe('HistoriqueDonsComponent', () => {
  let component: HistoriqueDonsComponent;
  let fixture: ComponentFixture<HistoriqueDonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueDonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
