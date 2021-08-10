import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToolComponent } from './add-tool.component';
import { FormBuilder } from '@angular/forms';
import { Tag } from 'src/app/core/models/tag';
import { MatChipInputEvent } from '@angular/material/chips';

describe('AddToolComponent', () => {
  let component: AddToolComponent;

  beforeEach((() => {
    component = new AddToolComponent(new FormBuilder(), null, null, null);
  }));


  it('Debe de crear un formulario con 3 campos', () => {
    expect(component.formAddTool.contains('name')).toBe(true);
    expect(component.formAddTool.contains('link')).toBe(true);
    expect(component.formAddTool.contains('description')).toBe(true);
  });

  it('El name debe ser obligatorio', () => {
    const control = component.formAddTool.get('name');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('El name link ser obligatorio', () => {
    const control = component.formAddTool.get('link');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('La descripcion debe ser obligatoria', () => {
    const control = component.formAddTool.get('description');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

});
