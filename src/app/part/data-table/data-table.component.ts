import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _list = [];
  oldList = [];
  phraseString = '';
  phraseKey: string = 'notset';//...?..//
  newRow: any = {};
  displayedColumns = [];
  colsOld = [];//régi sorok értéke//
  datasource: MatTableDataSource<any>;// ......   //
  constructor(private baseservice: BaseService) {} //dependency injection//

  ngOnInit() {
    
  } //inicailálás során kiolvassuk//

  @Input()
  set cols(array: any[]){//oszlopokat ill.megadjuk a disp.dat...értékét//
    this.displayedColumns = array.map(obj=>obj?.text);
    this.displayedColumns.push('action');
    this.colsOld = array;// régi sorok értéke//
  }

  get cols(){//set párja    //
    return this.colsOld;
  }

  applyFilter(event: Event) {//a szűrönk függvénye filterValue áll.értékkel és...//
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  @Input()
  set list(array: any[]){//beállítunk egy uj listát amibe...sorokat//
    this.datasource = new MatTableDataSource([this.newRow, ...array]);//egy uj objektumba létrehozzuk egy új tömböt //
    this.oldList = array;//uj változót hoztunk létre a régi adatoknak//
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;//azért felel hogy a hány elemet jelenítsen meg az olalon//
  }

  onCreate(row): void {
    this.create.emit(row);
  }

  onUpdate(row): void {
    this.update.emit(row);
  }
  onDelete(row): void {
    console.log(row)
    if (confirm('Are you sure')) this.delete.emit(row);
  }
}
