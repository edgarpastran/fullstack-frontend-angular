import { ProductService } from './../../../_service/product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/_model/product';
import { messages } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  product: Product;

  constructor(
    private dialogRef: MatDialogRef<ProductDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: Product, 
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.product = new Product();
    this.product.idProduct = this.data.idProduct;
    this.product.name = this.data.name;
    this.product.brand = this.data.brand;
    this.product.price = this.data.price;
  }

  cancel() {
    this.dialogRef.close();
  }

  process() {
    let message = (this.product != null && this.product.idProduct > 0)?messages.DATA_UPDATED:messages.DATA_REGISTERED;
    this.productService.update(this.product).pipe(switchMap(() => {
      return this.productService.list();
    })).subscribe(data => {
      this.productService.dataChange.next(data);
      this.productService.messageInfoChange.next(message);
    });

    this.dialogRef.close();
  }
}
