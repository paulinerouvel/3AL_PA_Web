import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiquePartiComponent } from './boutique-parti.component';

describe('BoutiquePartiComponent', () => {
  let component: BoutiquePartiComponent;
  let fixture: ComponentFixture<BoutiquePartiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoutiquePartiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutiquePartiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
