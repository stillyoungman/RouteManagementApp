import { TestBed, inject } from '@angular/core/testing';

import { RouteStorageService } from './route-storage.service';

describe('RouteStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteStorageService]
    });
  });

  it('should be created', inject([RouteStorageService], (service: RouteStorageService) => {
    expect(service).toBeTruthy();
  }));
});
