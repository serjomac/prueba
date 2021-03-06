import { Component, OnInit} from "@angular/core";
import { ToolsService } from "src/app/core/services/tools/tools-service.service";
import { Tool } from 'src/app/core/models/tool';
import { MatDialog } from '@angular/material/dialog';
import { AddToolComponent } from '../add-tool/add-tool.component';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toolsList: Tool[];
  isLoadingTools = false;

  constructor(private toolsService: ToolsService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.toolsList = [];
  }

  ngOnInit() {
    this.getAllTools();
  }

  getAllTools() {
    this.isLoadingTools = true;
    this.toolsService.getAllTools().subscribe((res: any) => {
      this.isLoadingTools = false;
      if (res.tools && res.tools.length > 0) {
        this.toolsList = res.tools as Tool[];
      }
    });
  }

  openDialogAddTool(tool, action) {
    const dialogRef = this.dialog.open(AddToolComponent, {
      width: '550px',
      disableClose: true,
      data: action === 'edit' ? _.cloneDeep(tool) : null
    });
    dialogRef.afterClosed().subscribe(result => {
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

  searchTool(quey) {
    this.isLoadingTools = true;
    let serviceId;
    if (quey.typeQuery === 'tag') {
      serviceId = '/tools/searchToolsByTag';
    } else {
      serviceId = '/tools/searchTools';
    }
    if (quey.value !== '') {
      this.toolsService.serachTool(quey.value, serviceId).subscribe((res: any) => {
        this.isLoadingTools = false;
        if (res.tools.length > 0) {
          this.toolsList = res.tools as Tool[];
        } else {
          this.openSnackBar();
        }
      });
    } else {
      this.getAllTools();
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      data: 'No se encontraron resultados'
    });
  }
}