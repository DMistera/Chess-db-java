import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  options: PickerOption[];

  @Output()
  picked = new EventEmitter<any>();

  activeOption: PickerOption;

  constructor() { }

  ngOnInit() {
  }

  select(option: PickerOption) {
    this.activeOption = option;
  }

  accept() {
    this.picked.emit(this.activeOption.id);
  }

}

export interface PickerOption {
  id: any;
  name: string;
}
