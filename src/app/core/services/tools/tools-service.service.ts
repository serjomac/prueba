import { Injectable } from '@angular/core';
import { Tool } from '../../models/tool';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  URL_API = environment.url_api;
  constructor(private http: HttpClient) { }

  getAllTools() {
    const header = new HttpHeaders().set(
      'Content-Type', 'application/json'
    );
    return this.http.get(this.URL_API + '/tools/getTools', {headers: header});
  }

  addTool(tool: any) {
    return this.http.post(this.URL_API + '/tools/addTool', tool);
  }

  updateTool(tool: any, idTool: string) {
    const params = new HttpParams().set('idTool', idTool);
    return this.http.put(this.URL_API + '/tools/editTool', tool, {params});
  }

  deleteTool(idTool: string) {
    const params = new HttpParams().set('idTool', idTool);
    return this.http.delete(this.URL_API + '/tools/deleteTool', {params});
  }
}
