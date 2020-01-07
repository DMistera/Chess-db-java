import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {

  @Input()
  entityName: string;

  @Output()
  create = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
