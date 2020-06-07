import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})

export class EditContactComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetContactForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  contactForm: FormGroup;


  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private contactApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.contactApi.GetContact(id).subscribe(data => {
      this.contactForm = this.fb.group({
        contact_name: [data.contact_name, [Validators.required]],
        contact_surname: [data.contact_surname, [Validators.required]],
        contact_phonenumber: [data.contact_phonenumber, [Validators.required]],
        contact_plz: [data.contact_plz, [Validators.required]],
        contact_city: [data.contact_city, [Validators.required]],
        contact_street: [data.contact_street, [Validators.required]],
        contact_number: [data.contact_number, [Validators.required]],
        dob: [data.dob, [Validators.required]]
      })
    })
  }

  /* Reactive book form */
  updateBookForm() {
    this.contactForm = this.fb.group({
      contact_name: ['', [Validators.required]],
      contact_surname: ['', [Validators.required]],
      contact_phonenumber: ['', [Validators.required]],
      contact_plz: ['', [Validators.required]],
      contact_city: ['', [Validators.required]],
      contact_street: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.contactForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateContactForm() {
    console.log(this.contactForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.contactApi.UpdateContact(id, this.contactForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/contacts-list'))
      });
    }
  }

}
