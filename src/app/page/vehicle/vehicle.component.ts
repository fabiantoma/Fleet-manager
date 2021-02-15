import { Component, OnInit, OnDestroy } from '@angular/core';
import { Base } from '../base';
import { BaseService } from '../../service/base.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent extends Base implements OnInit, OnDestroy {
  constructor(baseService: BaseService, config: ConfigService) {
    super(baseService, config);
    super.dataType = 'vehicles';
  }
  ngOnInit() {
    super.ngOnInit();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
