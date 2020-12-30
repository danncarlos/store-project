import { TestBed } from '@angular/core/testing';

import { GlobalServices } from './global-services.service';

describe('GlobalServicesService', () => {
  let service: GlobalServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
