import { Component, OnInit, Inject } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/core/models/tag';
import { ToolsService } from 'src/app/core/services/tools/tools-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Tool } from 'src/app/core/models/tool';
@Component({
  selector: 'app-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.css']
})
export class AddToolComponent implements OnInit {

  selectable = true;
  removable = true;
  addOnBlur = true;
  isLoadingAddTool = false;
  tags: Tag[];
  tagsToDelete: Tag[];
  tagsToAdd: Tag[];
  listTagsForAdd: any[];
  listTagsForRemove: any[];

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  formAddTool: FormGroup;
  constructor(private formBuilder: FormBuilder, private toolService: ToolsService, public dialogRef: MatDialogRef<AddToolComponent>,
              @Inject(MAT_DIALOG_DATA) public toolSelected: Tool) {
    this.buildFormAddTool();
    this.tagsToAdd = [];
    this.tagsToDelete = [];
    this.tags = [];
  }

  ngOnInit() {
    if (this.toolSelected != null) {
      this.formAddTool.setValue({
        name: this.toolSelected.title,
        link: this.toolSelected.link,
        description: this.toolSelected.description,
      });
      this.tags = this.toolSelected.tags;
    }
  }

  buildFormAddTool() {
    this.formAddTool = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      link: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const input = event.input;
    if (value) {
      this.tags.push(new Tag('', value));
    }
    if (input) {
      input.value = '';
    }
  }
  removeTag(tag): void {
    const index = this.tags.indexOf(tag);
    if (this.tags[index].id !== '') {
      this.tagsToDelete.push(this.tags[index]);
    }
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addTool() {
    let toolTmp;
    if (this.toolSelected != null) {
      const listTagsToSend = this.createListTagsToEdit();
      toolTmp = {
        title: this.formAddTool.get('name').value,
        link: this.formAddTool.get('link').value,
        description: this.formAddTool.get('description').value,
        tags: listTagsToSend
      };
    } else {
      const newTagToAdd = [];
      this.tags.forEach(element => {
        newTagToAdd.push(element.description);
      });
      toolTmp = {
        title: this.formAddTool.get('name').value,
        link: this.formAddTool.get('link').value,
        description: this.formAddTool.get('description').value,
        tags: newTagToAdd
      };
    }
    if (this.formAddTool.valid) {
      this.isLoadingAddTool = true;
      this.addOrUpateTool(toolTmp);
    }
  }

  addOrUpateTool(toolTmp) {
    if (this.toolSelected != null) {
      this.toolService.updateTool(toolTmp, this.toolSelected.id).subscribe((res: any) => {
        this.isLoadingAddTool = false;
        if (res) {
          this.dialogRef.close({
            event: 'Aceptar'
          });
        }
      });
    } else {
      this.toolService.addTool(toolTmp).subscribe((res: any) => {
        this.isLoadingAddTool = false;
        if (res) {
          this.dialogRef.close({
            event: 'Aceptar'
          });
        }
      });
    }
  }

  // FUNCION PARA CREAR LA LISTA DE ETIQUETAS QUE SE VAN A CREAR O ELIMINAR
  createListTagsToEdit() {
    const tagsListChip = this.tags;
    const tagsToAdd = this.tags.filter(tag => tag.id === '');
    this.listTagsForAdd = tagsToAdd.map(tag => ({
      id: '',
      description: tag.description,
      idTool: this.toolSelected.id,
      action: 'A'
    }));
    this.listTagsForRemove = this.tagsToDelete.map(tag => ({
      id: tag.id,
      description: tag.description,
      idTool: this.toolSelected.id,
      action: 'R'
    }));
    return this.listTagsForAdd.concat(this.listTagsForRemove);
  }

  closeDialog() {
    this.dialogRef.close({
      event: 'Cancel',
    });
  }

}
