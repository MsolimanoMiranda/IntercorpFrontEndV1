import { TestBed, inject } from '@angular/core/testing';

import { Service} from './service';

describe('ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Service]
    });
  });

  it('should be created', inject([Service], (service: Service) => {
    expect(service).toBeTruthy();
  }));
});
