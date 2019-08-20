import { TestBed } from '@angular/core/testing';

import { EntrepotService } from './entrepot.service';

describe('EntrepotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntrepotService = TestBed.get(EntrepotService);
    expect(service).toBeTruthy();
  });
});
