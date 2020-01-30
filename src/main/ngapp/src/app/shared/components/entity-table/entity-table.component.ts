import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, AfterContentChecked } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss']
})
export class EntityTableComponent implements OnInit {

  @Input()
  data: any[] = [];

  @Input()
  buttonLabel = 'View';

  @Input()
  deleteLabel = 'Delete';

  @Input()
  showDelete = true;

  @Input()
  filter: string[] = [];

  @Input()
  mapper: (entity: any) => Observable<any>;

  @Output()
  selectEntity = new EventEmitter<any>();

  @Output()
  deleteEntity = new EventEmitter<any>();

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

  dataSource: MatTableDataSource<any>;

  additionalColumns = [
    'actions'
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.filter.push('tableIndex');
  }

  initDataSource(data: any[]) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource(data);
    } else {
      this.dataSource.data = data;
    }
    return true;
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
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  buttonClick(index: number) {
    this.selectEntity.emit(this.data[index]);
  }

  deleteClick(index: number) {
    this.deleteEntity.emit(this.data[index]);
  }

  dataFilter(query: string) {
    this.dataSource.filter = query;
  }

  createAsyncData(data: any[]) {
    return forkJoin(data.map(this.mapper));
  }

  createIndexedData(data: any[]): TableElement[] {
    return data.map((d, i) => {
      d.tableIndex = i;
      return d;
    });
  }

  sortData(sort: Sort, indexedData: any[]) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.data = this.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

export interface TableElement {
  data: any;
  index: number;
}
