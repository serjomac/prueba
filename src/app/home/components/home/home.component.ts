import { Component, OnInit } from "@angular/core";
import { ToolsService } from "src/app/core/services/tools/tools-service.service";
import { Tool } from 'src/app/core/models/tool';
import { MatDialog } from '@angular/material/dialog';
import { AddToolComponent } from '../add-tool/add-tool.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toolsList: Tool[];
  constructor(private toolsService: ToolsService, public dialog: MatDialog) {this.toolsList = [];}

  ngOnInit() {
    this.getAllTools();
  }

  getAllTools() {
    this.toolsService.getAllTools().subscribe((res: any) => {
      if (res.tools && res.tools.length > 0) {
        this.toolsList = res.tools as Tool[];
        console.log(this.toolsList);
      }
    });
  }

  openDialogAddTool(tool, action) {
    const dialogRef = this.dialog.open(AddToolComponent, {
      width: '450px',
      data: action === 'edit' ? _.cloneDeep(tool) : null
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.event === 'Cancel') {
      } else if (result.event === 'Aceptar') {
        this.toolsList = [];
        this.getAllTools();
      }
    });
  }

  deteleTool(toolSelected: Tool) {
    this.toolsService.deleteTool(toolSelected.id).subscribe(res => {
      if (res) {
        const index = this.toolsList.indexOf(toolSelected);
        this.toolsList.splice(index, 1);
      }
    });
  }
}
