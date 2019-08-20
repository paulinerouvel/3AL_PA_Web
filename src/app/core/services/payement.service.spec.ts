import { TestBed } from '@angular/core/testing';

import { PayementService } from './payement.service';

describe('PayementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayementService = TestBed.get(PayementService);
    expect(service).toBeTruthy();
  });
});
