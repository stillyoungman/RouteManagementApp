import { TestBed, inject } from '@angular/core/testing';

import { WebApiService } from './web-api.service';

describe('WebApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebApiService]
    });
  });

  it('should be created', inject([WebApiService], (service: WebApiService) => {
    expect(service).toBeTruthy();
  }));
});
