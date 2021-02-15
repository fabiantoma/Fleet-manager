import { Component, OnInit } from '@angular/core';
import { Base } from '../base';
import { BaseService } from '../../service/base.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent extends Base {
  constructor(baseService: BaseService, config: ConfigService) {
    super(baseService, config);
    super.dataType = 'drivers';
  }
}
