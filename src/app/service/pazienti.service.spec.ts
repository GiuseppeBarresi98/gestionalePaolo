import { TestBed } from '@angular/core/testing';

import { PazientiService } from './pazienti.service';

describe('PazientiService', () => {
  let service: PazientiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PazientiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
