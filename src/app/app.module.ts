import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AppComponent } from './app.component';
import { MenuComponent } from './part/menu/menu.component';
import { DataTableComponent } from './part/data-table/data-table.component';
import { DataRowComponent } from './part/data-row/data-row.component';
import { DataCellComponent } from './part/data-cell/data-cell.component';
import { ObjectArrayPipe } from './pipe/object-array.pipe';
import { HomeComponent } from './page/home/home.component';
import { DriverComponent } from './page/driver/driver.component';
import { VehicleComponent } from './page/vehicle/vehicle.component';
import { FuelingComponent } from './page/fueling/fueling.component';
import { TestGuard } from './test.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';

const appRouting: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fueling', component: FuelingComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'driver', component: DriverComponent,canActivate:[TestGuard] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DataTableComponent,
    DataRowComponent,
    DataCellComponent,
    ObjectArrayPipe,
    HomeComponent,
    DriverComponent,
    VehicleComponent,
    FuelingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    RouterModule.forRoot(appRouting),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,//Material modulok//
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
