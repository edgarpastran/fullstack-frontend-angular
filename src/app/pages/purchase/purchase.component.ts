import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material';
import { ProductService } from 'src/app/_service/product.service';
import { PersonService } from 'src/app/_service/person.service';
import { PurchaseService } from 'src/app/_service/purchase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/_model/person';
import { Product } from 'src/app/_model/product';
import { Purchase } from 'src/app/_model/purchase';
import { PurchaseDetail } from 'src/app/_model/purchaseDetail';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { messages } from 'src/environments/environment';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  form: FormGroup;
  // Lists
  persons: Person[] = [];
  products: Product[] = [];

  dataSource: MatTableDataSource<PurchaseDetail>;
  displayedColumns: string[] = ['productName', 'quantity', 'price', 'subtotal', 'actions'];

  myControlPerson: FormControl = new FormControl();
  myControlProduct: FormControl = new FormControl();
  
  maximumDate: Date = new Date();  
  quantity: number;
  purchaseDetails: PurchaseDetail[] = [];    
  
  filteredPersons: Observable<any[]>;
  filteredProducts: Observable<any[]>;

  constructor(
    private personService: PersonService,
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'person': this.myControlPerson,
      'date': new FormControl(new Date()),
      'product': this.myControlProduct,
      'quantity': new FormControl('')
    });

    this.personList();
    this.productList();

    this.filteredPersons = this.myControlPerson.valueChanges.pipe(map(val => this.filterPersons(val)));
    this.filteredProducts = this.myControlProduct.valueChanges.pipe(map(val => this.filterProducts(val)));
  }

  personList() {
    this.personService.list().subscribe(data => {
      this.persons = data;
    });
  }

  productList() {
    this.productService.list().subscribe(data => {
      this.products = data;
    });
  }

  filterPersons(val: any) {
    if (val != null && val.idPerson > 0) {
      return this.persons.filter(option => 
        option.firstName.toLocaleLowerCase().includes(val.firstName.toLowerCase()) ||
        option.lastName.toLocaleLowerCase().includes(val.lastName.toLowerCase()) ||
        option.driverLicense.toLocaleLowerCase().includes(val.driverLicense.toLowerCase())
      );
    }
    else {
      return this.persons.filter(option => 
        option.firstName.toLocaleLowerCase().includes(val.toLowerCase()) ||
        option.lastName.toLocaleLowerCase().includes(val.toLowerCase()) ||
        option.driverLicense.toLocaleLowerCase().includes(val.toLowerCase())
      );
    }    
  }

  filterProducts(val: any) {
    if (val != null && val.idProduct > 0) {
      return this.products.filter(option => 
        option.name.toLocaleLowerCase().includes(val.name.toLowerCase()) ||
        option.brand.toLocaleLowerCase().includes(val.brand.toLowerCase())
      );
    }
    else {
      return this.products.filter(option => 
        option.name.toLocaleLowerCase().includes(val.toLowerCase()) ||
        option.brand.toLocaleLowerCase().includes(val.toLowerCase())
      );
    }    
  }

  displayPerson(person: Person) {
    return person ? `${person.driverLicense} - ${person.firstName} ${person.lastName}`: person;
  }
  
  displayProduct(product: Product) {
    return product ? `${product.name} (${product.brand})`: product;
  }

  addPurchaseDetail() {
    if (this.addPurchaseDetailStatus()) {
      let included: boolean = false;
      for (let i=0; i<this.purchaseDetails.length; i++) {
        if (this.purchaseDetails[i].product.idProduct == this.form.value['product'].idProduct) {
          this.purchaseDetails[i].quantity += this.quantity;
          this.purchaseDetails[i].amount = this.form.value['product'].price;
          included = true;
          break;
        }
      }
      if (!included) {
        let purchaseDetail = new PurchaseDetail();
        purchaseDetail.product = this.form.value['product'];
        purchaseDetail.quantity = this.quantity;
        purchaseDetail.amount = this.form.value['product'].price;
        this.purchaseDetails.push(purchaseDetail);        
      }
      this.dataSource = new MatTableDataSource(this.purchaseDetails);
      // Clear the inputs
      this.form.value['product'] = null;
      this.quantity = null;
      this.myControlProduct.setValue('');
    }
    else {
      this.snackBar.open(messages.DATA_REQUIRED, messages.INFO_TITLE, {
        duration: 2000
      });
    }
  }

  addPurchaseDetailStatus() {
    return (this.form.value['product'] != null && this.quantity != null);
  }
  removePurchaseDetail(index: number) {
    this.purchaseDetails.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.purchaseDetails);
  }

  getTotalItems() {
    return this.purchaseDetails.map(detail => detail.quantity).reduce((acc, value) => acc + value, 0);
  }

  getTotalAmount() {
    return this.purchaseDetails.map(detail => (detail.product.price * detail.quantity)).reduce((acc, value) => acc + value, 0);    
  }

  processStatus() {
    return (
      this.form.value['person'] === null ||
      this.form.value['date'] === null ||
      this.purchaseDetails.length === 0
    );
  }  

  process() {
    let purchase = new Purchase();
    purchase.person = this.form.value['person'];
    let tzoffset = (this.form.value['date']).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    purchase.date = localISOTime;
    purchase.amount = this.getTotalAmount();
    purchase.purchaseDetails = this.purchaseDetails;
    
    this.purchaseService.register(purchase).subscribe(() => {
      this.snackBar.open(messages.DATA_REGISTERED, messages.INFO_TITLE, {
        duration: 2000
      });

      setTimeout(() => {
        this.resetControls()
      }, 2000);
    });
  }

  resetControls() {    
    this.form.value['person'] = null;
    this.myControlPerson.setValue('');
    this.maximumDate = new Date();
    this.form.value['product'] = null;    
    this.myControlProduct.setValue('');  
    this.quantity = null;    
    this.purchaseDetails = [];
    this.dataSource = new MatTableDataSource(this.purchaseDetails);
  }
}
