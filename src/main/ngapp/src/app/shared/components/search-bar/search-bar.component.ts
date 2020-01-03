import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output()
  valueChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onInput(str: string) {
    this.valueChanged.emit(str);
  }

}
