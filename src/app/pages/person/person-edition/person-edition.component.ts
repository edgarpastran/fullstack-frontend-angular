import { PersonService } from './../../../_service/person.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'driverLicense': new FormControl(''),
      'telephone': new FormControl(''),
      'email': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.currentId = params['id'];
      this.initForm();
    });
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
      }, 
      error => {        
        this.personService.messageErrorChange.next(error.error.message+' - '+error.error.details);
      });
    }
    else {
      this.personService.register(person).pipe(switchMap(() => {
        return this.personService.list();
      })).subscribe(data => {
        this.personService.dataChange.next(data);
        this.personService.messageInfoChange.next(messages.DATA_REGISTERED);
      }, 
      error => {
        this.personService.messageErrorChange.next(error.error.message+' - '+error.error.details);
      });
    }

    this.router.navigate(['person']);
  }

}
