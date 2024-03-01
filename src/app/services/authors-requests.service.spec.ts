import { TestBed } from '@angular/core/testing';

import { AuthorsRequestsService } from './authors-requests.service';

describe('AuthorsRequestsService', () => {
  let service: AuthorsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
