import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';

import { GoogleChartInterface } from 'ng2-google-charts';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vehicleChart: GoogleChartInterface;
  driverChart: GoogleChartInterface;
  dayChart: GoogleChartInterface;
  dateChart:GoogleChartInterface;
  fuelChart:GoogleChartInterface

   pieChartOptions: any = {
    is3D: true,
    chartArea: { width: 400, heigth: 400 },
  };
  columnChartOptions: any = {
    is3D: true,
    chartArea: { width: 800, heigth: 400 },
  };
  error_messages = {
    'name': [
      {type: 'required', message: 'Kötelező megadni a nevet'},
      {type: 'minlength', message: 'Köteleő minimum 4 karaktert beírni'},
    ],
    'email': [
      {type: 'required', message: 'Kötelező megadni az emailt'},
      {type: 'email', message: 'Köteleő email formátumot használni'},
    ]
  }

  
  formGroup: FormGroup;
  constructor(private fb: FormBuilder,private baseService:BaseService, private changeDR: ChangeDetectorRef) {
    this.formGroup = this.fb.group({
      'name': this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      'email': this.fb.control(null, [Validators.required,Validators.email]),
  })};
  ngOnInit() {
  /*   let a = 1;
    let b = a;
    b = 2;
    console.log(a, b);
    let aObject = {a: {b:1}, f : ()=>"asd"};
    let bObject = JSON.parse(JSON.stringify(aObject));
    bObject.a.b = 2;
    console.log(aObject, bObject) objektum referencia szerinti másolása*/
    this.baseService
      .query('fuelings', '_expand-drivers&_expand-vehicles')
      .then(async (data) => {
        await this.getTypeById(data, "vehicles", "vehicleId", "vehicle");
        await this.getTypeById(data, "drivers", "driverId", "driver");
        
        this.initCharts(data), (err) => console.error(err);
      });
  }

  async getTypeById(data: any[], dataType: string, objectKey: string, resultObjectKey: string){
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const result = await this.baseService.query(`${dataType}/${element[objectKey]}`,"");
      element[resultObjectKey] = result;
    }
  }

  initCharts(data: any[]): void {
    let petrol=0;
    let diesel=0;
    data.forEach(row=>{
      if(row.vehicle.engine==="benzin"){
        petrol+=row.amount;
      }else{
        diesel+=row.amount;
      }
    })
    console.log(petrol,diesel)

    let byFuel=[
      ["benzin",petrol],
      ["diesel",diesel]
    ];

console.log(byFuel)

    let byVehicle = this.processByType(
      
      data,
      (row) => row.vehicle.lp,
      (row) => row.amount
    );
    console.log(byVehicle)
    let byDriver = this.processByType(
      data,
      (row) => row.driver.name,
      (row) => row.amount
    );
    let byDay = this.processByType(
      data,
      (row) => row.date,
      (row) => row.amount
    );
    let byDate=this.processByType(
      data,
      (row)=>row.date,
      (row)=>row.amount
    )
    

    this.vehicleChart = this.collectChartData(
      [['Vehicle', 'Consumption']].concat(byVehicle),
      'PieChart',
      this.pieChartOptions
    );
    this.driverChart = this.collectChartData(
      [['Driver', 'Consumption']].concat(byDriver),
      'PieChart',
      this.pieChartOptions
    );
    this.dayChart = this.collectChartData(
      [['Vehicle', 'Consumption']].concat(byDay),
      'ColumnChart',
      this.columnChartOptions
    );
    this.dateChart=this.collectChartData(
      [['Date','Consumption']].concat(byDate),
      'PieChart',
      this.pieChartOptions
    )
     this.fuelChart=this.collectChartData(
      [['Engine','Consumption'],...byFuel],
      'PieChart',
      this.pieChartOptions
    )  
  }

  collectChartData(data: any[], type: string, options: any): any {
    return {
      chartType: type,
      dataTable: data,
      options: options,
    };
  }

  processByType(data: any[], getKey: Function, getValue: Function): any[] {
    let processed: any = {};
    let table: any[] = [];

    for (let row of data) {
      let key = getKey(row);
      if (!processed[key]) {
        processed[key] = 0;
      }
      processed[key] += parseInt(getValue(row));
    }
    for (let k in processed) {
      table.push([k, processed[k]]);
    }
    return table;
  }


}
