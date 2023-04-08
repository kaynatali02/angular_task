import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Validation from '../helper/validation';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  name: any='Employee';
  registerForm: any;
  submitted?: boolean = false;
  registeredUsers: any[];
  add_form?: boolean;
  editedUser: any = {};

  returnedArray!: any[];
  inProgress?: boolean;
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;

  deleteEmployee: any = {};
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    dob: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  constructor(private formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    this.submitted = false;
    this.add_form = true;
    this.registeredUsers = [];
    this.editedUser = {};
    console.log(this.deleteEmployee);

  }

  ngOnInit(): void {
    this.getemply();
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        phone: ['', Validators.required],
        dob: ['', Validators.required],
        lastName: [
          '',
          [
            Validators.required,
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.registeredUsers.slice(startItem, endItem);
  }
  getemply() {
    this.registeredUsers = [
      {
        id: 'DOB_1403',
        firstName: 'Akhil',
        lastName: 'Kumar',
        email: 'akhil@gmail.com',
        phone: '9959479459',
        dob: '1997-09-23',
        password: 'Akhil123',
        confirmPassword: 'Akhil123'
      },
      {
        id: 'DOB_0907',
        firstName: 'Rahul',
        lastName: 'Dev',
        email: 'rahul@gmail.com',
        phone: '8923193993',
        dob: '1997-09-23',
        password: 'Nikhil123',
        confirmPassword: 'Nikhil123'
      },
      {
        id: 'DOB_2706',
        firstName: 'Sampath',
        lastName: 'Kumar',
        email: 'sam@gmail.com',
        phone: '9703037744',
        dob: '1997-09-23',
        password: 'Nikhil123',
        confirmPassword: 'Sam123'
      },
      {
        id: 'DOB_2708',
        firstName: 'kareena',
        lastName: 'ali',
        email: 'K@gmail.com',
        phone: '9703037789',
        dob: '1998-07-09',
        password: 'Nikhil123',
        confirmPassword: 'Sam123'
      },
      {
        id: 'DOB_1403',
        firstName: 'Akhil',
        lastName: 'Kumar',
        email: 'akhil@gmail.com',
        phone: '9959479459',
        dob: '1997-09-23',
        password: 'Akhil123',
        confirmPassword: 'Akhil123'
      },
      {
        id: 'DOB_1403',
        firstName: 'Akhil',
        lastName: 'Kumar',
        email: 'akhil@gmail.com',
        phone: '9959479459',
        dob: '1997-09-23',
        password: 'Akhil123',
        confirmPassword: 'Akhil123'
      },
      {
        id: 'DOB_1403',
        firstName: 'Akhil',
        lastName: 'Kumar',
        email: 'akhil@gmail.com',
        phone: '9959479459',
        dob: '1997-09-23',
        password: 'Akhil123',
        confirmPassword: 'Akhil123'
      },
      {
        id: 'DOB_1403',
        firstName: 'Akhil',
        lastName: 'Kumar',
        email: 'akhil@gmail.com',
        phone: '9959479459',
        dob: '1997-09-23',
        password: 'Akhil123',
        confirmPassword: 'Akhil123'
      },
      {
        id: 'DOB_1403',
        firstName: 'Akhil',
        lastName: 'Kumar',
        email: 'akhil@gmail.com',
        phone: '9959479459',
        dob: '1997-09-23',
        password: 'Akhil123',
        confirmPassword: 'Akhil123'
      },
      {
        id: 'DOB_1403',
        firstName: 'Akhil',
        lastName: 'Kumar',
        email: 'akhil@gmail.com',
        phone: '9959479459',
        dob: '1997-09-23',
        password: 'Akhil123',
        confirmPassword: 'Akhil123'
      },

    ];
    this.returnedArray = this.registeredUsers.slice(0, 5);
    this.inProgress = true;
    return this.returnedArray;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  submitForm() {
    this.submitted = true;

    console.log(this.form.value);


    if (this.add_form) {
      let newUser = this.form.value;
      let dob_pass = this.form.value.dob.split('-');
      let newId = `DOB_${dob_pass[2]}${dob_pass[1]}`;
      console.log(newId);
      newUser.id = newId;
      this.returnedArray.push(newUser);
    }
    else if (this.editedUser) {
      let userIndex = this.returnedArray.findIndex(item => item.id === this.editedUser.id);
      if (userIndex != -1) {
        this.returnedArray[userIndex] = this.form.value;
      }
    }
    this.add_form = true;
    this.submitted = false;
    this.form.reset();
  }

  editUser(emp: any) {
    this.add_form = false;
    console.log(emp);
    this.editedUser = emp;
    this.form.patchValue({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      phone: emp.phone,
      dob: emp.dob,
      password: emp.password,
      confirmPassword: emp.confirmPassword
    });

  }


  deleteUser(delemp: any) {
    this.deleteEmployee = delemp;
    // this.add_form = true;
    // this.form.reset();
  }
  ondel() {
    this.returnedArray = this.returnedArray.filter(item => item.id != this.deleteEmployee.id);
    this.add_form = true;
    this.form.reset();
  }

  cancelForm() {
    this.add_form = true;
    this.form.reset();
    this.editedUser = {};
  }
}
