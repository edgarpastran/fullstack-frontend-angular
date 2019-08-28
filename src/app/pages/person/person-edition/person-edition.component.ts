import { PersonService } from './../../../_service/person.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, RouterModule, Router } from '@angular/router';
import { Person } from 'src/app/_model/person';
import { messages } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-person-edition',
  templateUrl: './person-edition.component.html',
  styleUrls: ['./person-edition.component.css']
})
export class PersonEditionComponent implements OnInit {

  form: FormGroup;
  currentId: number;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'idPerson': new FormControl(0),
      'firstName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'driverLicense': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      'telephone': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'email': new FormControl('', [Validators.required, Validators.email])
    });

    this.route.params.subscribe((params: Params) => {
      this.currentId = params['id'];
      this.initForm();
    });
  }

  get f() {
    return this.form.controls;
  }

  initForm() {
    if (this.currentId != null) {
      // Load the data from the service to the form
      this.personService.find(this.currentId).subscribe(data => {
        this.form = new FormGroup({
          'idPerson': new FormControl(data.idPerson),
          'firstName': new FormControl(data.firstName),
          'lastName': new FormControl(data.lastName),
          'driverLicense': new FormControl(data.driverLicense),
          'telephone': new FormControl(data.telephone),
          'email': new FormControl(data.email)
        });        
      });
    }
  }

  process() {
    if (this.form.invalid) {
      return;
    }

    let person = new Person();
    person.idPerson = this.form.value['idPerson'];
    person.firstName = this.form.value['firstName'];
    person.lastName = this.form.value['lastName'];
    person.driverLicense = this.form.value['driverLicense'];
    person.telephone = this.form.value['telephone'];
    person.email = this.form.value['email'];
    
    if (this.currentId != null) {
      this.personService.update(person).pipe(switchMap(() => {
        return this.personService.list();
      })).subscribe(data => {
        this.personService.dataChange.next(data);
        this.personService.messageInfoChange.next(messages.DATA_UPDATED);
      });
    }
    else {
      this.personService.register(person).pipe(switchMap(() => {
        return this.personService.list();
      })).subscribe(data => {
        this.personService.dataChange.next(data);
        this.personService.messageInfoChange.next(messages.DATA_REGISTERED);
      });
    }

    this.router.navigate(['person']);
  }

  onlyDigts(e: any) {
    if (e.heyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
      console.log('NV');
    }
  }
}
