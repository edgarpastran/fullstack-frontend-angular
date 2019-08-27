import { ActivatedRoute } from '@angular/router';
import { Person } from './../../_model/person';
import { PersonService } from './../../_service/person.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { messages } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  dataSource: MatTableDataSource<Person>;
  displayedColumns: string[] = ['idPerson', 'firstName', 'lastName', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  recordsCounter: number;

  constructor(
    private personService: PersonService, 
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.personService.dataChange.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personService.messageInfoChange.subscribe(data => {
      this.snackBar.open(data, messages.INFO_TITLE, {
        duration: 2000
      });
    });

    /*
    this.personService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    */
   
    this.personService.listPageable(0, 5).subscribe(data => {
      this.recordsCounter = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  delete(id: number) {
    this.personService.delete(id).pipe(switchMap(() => {
      return this.personService.list();
    })).subscribe(data => {
      this.personService.dataChange.next(data);
      this.personService.messageInfoChange.next(messages.DATA_DELETED);
    });
  }

  showMore(e: any) {
    this.personService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.recordsCounter = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }
}
