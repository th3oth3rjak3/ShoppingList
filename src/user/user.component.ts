import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent implements OnInit, OnDestroy {
  userData: User = DataService.newUser;
  sub: Subscription = new Subscription();
  editing: boolean = false;
  editUserFormGroup: FormGroup = new FormGroup({
    name: new FormControl(this.userData.name, Validators.required),
    email: new FormControl(this.userData.email, Validators.required),
    phone: new FormControl(this.userData.phone),
    photoUrl: new FormControl(this.userData.photoUrl),
    theme: new FormControl(this.userData.theme, Validators.required),
  });

  get name(): FormControl {
    return this.editUserFormGroup.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.editUserFormGroup.get('email') as FormControl;
  }

  get phone(): FormControl {
    return this.editUserFormGroup.get('phone') as FormControl;
  }

  get photoUrl(): FormControl {
    return this.editUserFormGroup.get('photoUrl') as FormControl;
  }

  get theme(): FormControl {
    return this.editUserFormGroup.get('theme') as FormControl;
  }

  constructor(public data: DataService) {}

  ngOnInit(): void {
    this.editUserFormGroup.disable();
    this.sub = this.data.userData.subscribe((user: User) => {
      this.userData = user;
      this.updateEditFieldData();
    });
  }

  updateEditFieldData(): void {
    this.editUserFormGroup.get('name')?.setValue(this.userData.name);
    this.editUserFormGroup.get('phone')?.setValue(this.userData.phone);
    this.editUserFormGroup.get('email')?.setValue(this.userData.email);
    this.editUserFormGroup.get('photoUrl')?.setValue(this.userData.photoUrl);
    this.editUserFormGroup.get('theme')?.setValue(this.userData.theme);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
