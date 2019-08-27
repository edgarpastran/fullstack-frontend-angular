import { MatTableDataSource } from '@angular/material/table';
import { Product } from './../../_model/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { ProductService } from 'src/app/_service/product.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { messages } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['idProduct', 'name', 'brand', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  recordsCounter: number;

  constructor(
    private productService: ProductService, 
    private dialog: MatDialog, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productService.dataChange.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.productService.messageInfoChange.subscribe(data => {
      this.snackBar.open(data, messages.INFO_TITLE, {
        duration: 2000
      });
    });

    /*
    this.productService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    */

    this.productService.listPageable(0, 5).subscribe(data => {
      this.recordsCounter = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openDialog(product?: Product) {
    let object = product != null ? product : new Product();
    this.dialog.open(ProductDialogComponent, {
      width: '250px', 
      data: object
    });
  }

  delete(id: number) {
    this.productService.delete(id).pipe(switchMap(() => {
      return this.productService.list();
    })).subscribe(data => {
      this.productService.dataChange.next(data);
      this.productService.messageInfoChange.next(messages.DATA_DELETED);
    });
  }

  showMore(e: any) {
    this.productService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.recordsCounter = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }
}
