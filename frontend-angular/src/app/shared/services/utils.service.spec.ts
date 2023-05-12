import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return application title', function () {
    expect(service.getAppTitle()).toEqual("Miniatures-Vault");
  });

  it('should contain the version', function () {
    expect(service.getAppVersion()).toContain("v");
  });
});
