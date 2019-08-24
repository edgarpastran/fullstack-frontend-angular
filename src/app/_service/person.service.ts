import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Person } from '../_model/person';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  dataChange = new Subject<Person[]>();
  messageInfoChange = new Subject<string>();
  messageErrorChange = new Subject<string>();
  url: string = `${environment.HOST}/persons`; 

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Person[]>(this.url);
  }

  listPageable(page: number, size: number)  {
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  find(id: number) {
    return this.http.get<Person>(`${this.url}/${id}`);
  }

  register(person: Person) {
    return this.http.post(this.url, person);
  }

  update(person: Person) {
    return this.http.put(this.url, person);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
