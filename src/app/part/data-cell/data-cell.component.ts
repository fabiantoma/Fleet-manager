import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-cell',
  templateUrl: './data-cell.component.html',
  styleUrls: ['./data-cell.component.css'],
})
export class DataCellComponent implements OnInit {
  @Input() row;
  @Input() col;
  formGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      'name': this.fb.control('Jóska', [Validators.required, Validators.minLength(4)]),
      'email': this.fb.control(null, [Validators.required,Validators.email]),
  })};

  ngOnInit(): void {
    
    
  }
}
