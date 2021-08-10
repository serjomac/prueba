import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ToolsService } from 'src/app/core/services/tools/tools-service.service';
import { from as observableFrom, Observable, of } from 'rxjs';
// import { from, Observable } from "rxjs";
import { Tool } from 'src/app/core/models/tool';
describe('HomeComponent', () => {

  let component: HomeComponent;
  const servicio = new ToolsService(null);

  beforeEach(() => {
    component = new HomeComponent(servicio, null);
  });

  it('Confirmar que se llamo al servicio getTools', () => {
    const espia = spyOn( servicio, 'getAllTools').and.callFake( () => {
      return of();
    });
    component.ngOnInit();
    expect(espia).toHaveBeenCalled();
  });


  it('Confirmar que se llamo al servicio eliminar tool', () => {
    const tool = new Tool();
    tool.id = '1';
    tool.title = 'Prueba';
    tool.description = 'Prueba des';
    tool.link = 'prueba.com';
    tool.tags = [];
    const espia = spyOn( servicio, 'deleteTool').and.callFake( () => {
      return of();
    });
    component.deteleTool(tool);
    expect(espia).toHaveBeenCalled();
  });

});
