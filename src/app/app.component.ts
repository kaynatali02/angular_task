import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name:any;
  registerForm:any;
  submitted: boolean;
  registeredUsers: any[];
  add_form: boolean;
  editedUser: any={};
  constructor(private fb :FormBuilder) {
    this.fb = fb;
    this.name = 'Reactive form example';
    this.submitted = false;
    this.add_form = true;
    this.registeredUsers = [];
    this.editedUser = {};
    this.registeredUsers = [
        {
            id: 'DOB_1403',
            firstName: 'Akhil',
            lastName: 'Kumar',
            email: 'akhil@gmail.com',
            phone: '9959479459',
            company: 'BuzzBoard',
            gender: 'male',
            dob: '14-03-1991',
            password: 'Akhil123',
            confirmPassword: 'Akhil123'
        },
        {
            id: 'DOB_0907',
            firstName: 'Rahul',
            lastName: 'Dev',
            email: 'rahul@gmail.com',
            phone: '8923193993',
            company: 'Infosys',
            gender: 'male',
            dob: '09-07-1990',
            password: 'Nikhil123',
            confirmPassword: 'Nikhil123'
        },
        {
            id: 'DOB_2706',
            firstName: 'Sampath',
            lastName: 'Kumar',
            email: 'sam@gmail.com',
            phone: '9703037744',
            company: 'Cognizant',
            gender: 'male',
            dob: '27-06-1989',
            password: 'Sam123',
            confirmPassword: 'Sam123'
        }
    ];
}
ngOnInit() {
    this.registerForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        phone: ['', [Validators.required,Validators.pattern(/[0-9]{10}/g)]],
        company: ['',[Validators.required]],
        gender: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
    });
}
get formValues() {
    return this.registerForm.controls;
}
addUser() {
    this.add_form = true;
    this.editedUser = {};
    this.submitted = false;
    this.registerForm.reset();
}
submitForm() {
    this.submitted = true;
    console.log(this.registerForm);
    console.log(this.formValues);
    // console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
        return;
    }
    if (this.add_form) {
        let newUser = this.registerForm.value;
        let dob_pass = this.registerForm.value.dob.split('-');
        let newId = `DOB_${dob_pass[2]}${dob_pass[1]}`;
        console.log(newId);
        newUser.id = newId;
        this.registeredUsers.push(newUser);
    }
    else if (this.editedUser) {
        let userIndex = this.registeredUsers.findIndex(item => item.id === this.editedUser.id);
        if (userIndex != -1) {
            this.registeredUsers[userIndex] = this.registerForm.value;
        }
    }
    this.add_form = true;
    this.submitted = false;
    this.registerForm.reset();
}
editUser(editUser:any) {
    this.add_form = false;
    console.log(editUser);
    this.editedUser = editUser;
    this.registerForm.patchValue({
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        email: editUser.email,
        phone: editUser.phone,
        company: editUser.company,
        gender: editUser.gender,
        dob: editUser.dob,
        password: editUser.password,
        confirmPassword: editUser.confirmPassword
    });
}
deleteUser(user:any) {
    this.registeredUsers = this.registeredUsers.filter(item => item.id != user.id);
    this.add_form = true;
    this.registerForm.reset();
}
cancelForm() {
    this.add_form = true;
    this.registerForm.reset();
    this.editedUser = {};
}
changeVal1(e:Event) {
   console.log(e)
}
changeVal2(eve: any) {
   console.log(eve);
}
};

