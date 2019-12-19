import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, AfterContentChecked } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent implements OnChanges {

  @Input()
  data: any[];

  @Input()
  buttonLabel = 'View';

  @Input()
  filter: string[] = [];

  @Output()
  selectEntity = new EventEmitter<any>();

  @ViewChild(MatSort, {static: true}) set matSort(sort: MatSort) {
    this.sort = sort;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator, {static: true}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  sort: MatSort;
  paginator: MatPaginator;

  dataSource = new  MatTableDataSource(this.data);

  additionalColumns = [
    'actions'
  ];

  constructor() { }

  ngOnChanges(): void {
    this.dataSource.data = this.data;
  }

  getProperties(o: any) {
    return Object.keys(o).filter(property => {
      return !this.filter.includes(property);
    });
  }

  toUppercase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  buttonClick(entity: any) {
    this.selectEntity.emit(entity);
  }

}
