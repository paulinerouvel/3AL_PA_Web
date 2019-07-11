import { TestBed } from '@angular/core/testing';

import { DonService } from './don.service';

describe('DonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonService = TestBed.get(DonService);
    expect(service).toBeTruthy();
  });
});
