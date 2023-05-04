import { TestBed } from '@angular/core/testing';

import { CanSaveGuard } from './can-save.guard';

describe('CanSaveGuard', () => {
  let guard: CanSaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanSaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
