import { TestBed } from '@angular/core/testing';

import { AlerteService } from './alerte.service';

describe('AlerteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlerteService = TestBed.get(AlerteService);
    expect(service).toBeTruthy();
  });
});
