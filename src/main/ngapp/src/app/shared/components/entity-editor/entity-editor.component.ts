import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss']
})
export class EntityEditorComponent implements OnInit {

  @Output()
  accept = new EventEmitter<void>();

  @Input()
  valid = true;

  @Input()
  formGroup: FormGroup;

  @Input()
  entityName: string;

  constructor() { }

  ngOnInit() {
  }

}
