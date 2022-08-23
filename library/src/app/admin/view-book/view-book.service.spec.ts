import { TestBed } from '@angular/core/testing';

import { ViewBookService } from './view-book.service';

describe('ViewBookService', () => {
  let service: ViewBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
