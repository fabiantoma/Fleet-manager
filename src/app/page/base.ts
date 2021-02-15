import { OnInit, OnDestroy, Component } from '@angular/core';
import { BaseService } from '../service/base.service';
import { ConfigService } from '../service/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'base',
  templateUrl: 'app-base.html',
})
export class Base implements OnInit, OnDestroy {
  list: any = [];
  cols: any[];
  listSubscription: Subscription;
  dataType: any;

  constructor(
    protected baseService: BaseService,
    protected config: ConfigService
  ) {}

  ngOnInit() {
    this.cols = this.config.cols[this.dataType];
    this.listSubscription = this.baseService.getAll(this.dataType).subscribe(
      (list) => {
        this.list = list;
      },
      (err) => console.error(err),
      () => console.log('unsubscribed')
    );
  }
  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }
  onCreate(row: any): void {
    this.baseService.create(this.dataType, row);
  }
  onUpdate(row: any): void {
    this.baseService.update(this.dataType, row);
  }
  onDelete(row: any): void {
    this.baseService.delete(this.dataType, row);
  }
}
