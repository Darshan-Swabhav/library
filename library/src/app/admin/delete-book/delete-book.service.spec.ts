import { TestBed } from '@angular/core/testing';

import { DeleteBookService } from './delete-book.service';

describe('DeleteBookService', () => {
  let service: DeleteBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
