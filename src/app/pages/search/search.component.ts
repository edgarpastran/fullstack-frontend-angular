import { MatTableDataSource } from '@angular/material/table';
import { FilterPurchaseDTO } from './../../_dto/filterPurchaseDTO';
import { PurchaseService } from 'src/app/_service/purchase.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { Purchase } from 'src/app/_model/purchase';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchComponent implements OnInit {

  form: FormGroup;

  dataSource: MatTableDataSource<Purchase>;
  displayedColumns: string[] = ['driverLicense', 'fullName', 'date', 'amount'];
  expandedElement: Purchase | null;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'driverLicense': new FormControl(''),
      'fullName': new FormControl(''),
      'date': new FormControl('')
    });
  }

  search() {
    let filter = new FilterPurchaseDTO(
      this.form.value['driverLicense'], 
      this.form.value['fullName'], 
      this.form.value['date']
    );    
    filter.fullName = filter.fullName.toLowerCase();
    
    if (filter.date) {
      delete filter.driverLicense;
      delete filter.fullName;

      this.purchaseService.search(filter).subscribe(data => {      
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
    else {
      delete filter.date;
      
      if (filter.driverLicense.length === 0) {
        delete filter.driverLicense;
      }

      if (filter.fullName.length === 0) {
        delete filter.fullName;
      }

      this.purchaseService.search(filter).subscribe(data => {        
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

}
