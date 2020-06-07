import { Contact } from './../../shared/contact';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit {
  ContactData: any = [];
  dataSource: MatTableDataSource<Contact>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'contact_name', 'contact_surname', 'contact_plz', 'contact_city', 'contact_street', 'contact_number', 'contact_phonenumber', 'action'];

  constructor(private contactApi: ApiService) {
    this.contactApi.GetContacts().subscribe(data => {
      this.ContactData = data;
      this.dataSource = new MatTableDataSource<Contact>(this.ContactData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() { }

  deleteContact(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.contactApi.DeleteContact(e._id).subscribe()
    }
  }

}
