import { TestBed } from '@angular/core/testing';

import { GuichesService } from './guiches.service';

describe('GuichesService', () => {
  let service: GuichesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuichesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
