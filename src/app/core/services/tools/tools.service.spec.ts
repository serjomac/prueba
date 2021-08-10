import { TestBed } from '@angular/core/testing';

import { ToolsService } from './tools-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

let http: HttpClient;
let httpTestingController: HttpTestingController;
let service: ToolsService;

describe('ToolsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ToolsService);
  });

  it('Debe crear un servicio Tool', () => {
    expect(service).toBeTruthy();
  });

  it('Test para GetAllTools', () => {

    // ARREANGE
    const expectData = [
      {
        id: '1',
        title: 'Prueba1',
        link: 'prueba.com',
        description: 'Esta es una prueba',
        tags: [
          {
            id: '1',
            description: 'Organizacion'
          }
        ]
      },
      {
        id: '2',
        title: 'Prueba2',
        link: 'prueba.com',
        description: 'Esta es una prueba',
        tags: [
          {
            id: '2',
            description: 'Planificacion'
          }
        ]
      }
    ];
    let dataError;
    let dataResponse;

    // ACT - actuacion
    service.getAllTools().subscribe(
      (response) => {
        dataResponse = response;
      },
      (err) => {
        dataError = err;
      }
    );
    const req = httpTestingController.expectOne(
      `${environment.url_api}/tools/getTools`
    );
    req.flush(expectData);

    // ASSERT
    expect(dataResponse.length).toEqual(2);
    expect(req.request.method).toEqual('GET');
    expect(dataError).toBeUndefined();
  });


  it('Test para AddTool', () => {

    // ARREANGE
    const toolToAdd = {
        id: '1',
        title: 'Prueba1',
        link: 'prueba.com',
        description: 'Esta es una prueba',
        tags: [
          {
            id: '1',
            description: 'Organizacion'
          }
        ]
      };

    const expectMessage = 'ok';
    let dataError;
    let dataResponse;

    // ACT - actuacion
    service.addTool(toolToAdd).subscribe(
      (response) => {
        dataResponse = response;
      },
      (err) => {
        dataError = err;
      }
    );
    const req = httpTestingController.expectOne(
      `${environment.url_api}/tools/addTool`
    );
    req.flush(expectMessage);

    // ASSERT
    expect(dataResponse).toEqual('ok');
    expect(req.request.method).toEqual('POST');
    expect(dataError).toBeUndefined();
  });

});
