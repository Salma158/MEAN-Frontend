import { TestBed } from '@angular/core/testing';

import { CategoriesRequestsService } from './categories-requests.service';

describe('CategoriesRequestsService', () => {
  let service: CategoriesRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
