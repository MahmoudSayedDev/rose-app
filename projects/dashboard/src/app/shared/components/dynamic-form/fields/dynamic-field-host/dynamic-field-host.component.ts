import { Component, input, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFieldConfig } from '../../models/dynamic-field-config.interface';
import { FIELD_COMPONENT_REGISTRY } from '../../registry/field-component.registry';

@Component({
  selector: 'app-dynamic-field-host',
  standalone: true,
  template: `<ng-container #container></ng-container>`,
})
export class DynamicFieldHostComponent implements AfterViewInit {
  readonly field = input.required<DynamicFieldConfig>();
  readonly control = input.required<FormControl>();

  @ViewChild('container', {
    read: ViewContainerRef,
  })
  private readonly container!: ViewContainerRef;

  ngAfterViewInit(): void {
    this.renderField(this.field(), this.control());
  }

  private renderField(field: DynamicFieldConfig, control: FormControl): void {
    const component = FIELD_COMPONENT_REGISTRY[field.type];

    if (!component) {
      throw new Error(`Unsupported field type: ${field.type}`);
    }

    this.container.clear();

    const componentRef = this.container.createComponent(component);

    componentRef.setInput('field', field);
    componentRef.setInput('control', control);
  }
}
