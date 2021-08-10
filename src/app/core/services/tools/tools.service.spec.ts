import { TestBed } from '@angular/core/testing';

import { ToolsService } from './tools-service.service';

xdescribe('ToolsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolsService = TestBed.get(ToolsService);
    expect(service).toBeTruthy();
  });
});
