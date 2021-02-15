import { Component } from '@angular/core';
import { Base } from '../base';
import { BaseService } from '../../service/base.service';
import { ConfigService } from '../../service/config.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-fueling',
  templateUrl: './fueling.component.html',
  styleUrls: ['./fueling.component.css'],
})
export class FuelingComponent extends Base {
  cols = [];
  constructor(baseService: BaseService, config: ConfigService) {
    super(baseService, config);
    super.dataType = 'fuelings';
  }

  ngOnInit() {
    let driverObservable = this.baseService.getAll('drivers');
    let vehicleObservable = this.baseService.getAll('vehicles');
    zip(driverObservable, vehicleObservable).subscribe(
      (valueList) => {
        let driverOptions = this.processOptions(valueList[0], `id`, `name`);
        let vehicleOptions = this.processOptions(valueList[1], 'id', 'lp');

        let newCols = this.config.cols[this.dataType];
        for (let k in newCols) {
          if (newCols[k].key == 'vehicleId') {
            newCols[k].options = vehicleOptions;
            newCols[k].type = 'select';
          }
          if (newCols[k].key == 'driverId') {
            newCols[k].options = driverOptions;
            newCols[k].type = 'select';
          }
        }
        this.cols = newCols;
      },
      (error) => {
        console.log('ez csak akkor ha error van');
      }
    );

    //akkor fusson le ha megjönnek az adatok//

    //lekéri az adatokat a fuelingsből//
    this.listSubscription = this.baseService.getAll(this.dataType).subscribe(
      (list) => {
        this.list = list;
      },
      (err) => console.error(err)
    );
  }
  //valueList metódusa//
  processOptions(list: any[], value: string, text: string): any[] {
    //bejárjuk a listánkat egy for ciklussal//
    let listDone: any[] = [];
    for (let item of list) {
      let row: any = {};
      row.value = item[value];
      row.text = item[text];
      listDone.push(row);
    }
    return listDone;
  }
}
