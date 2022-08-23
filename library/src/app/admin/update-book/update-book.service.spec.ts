import { TestBed } from '@angular/core/testing';

import { UpdateBookService } from './update-book.service';

describe('UpdateBookService', () => {
  let service: UpdateBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
