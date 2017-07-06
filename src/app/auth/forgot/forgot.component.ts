import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  resetForm: FormGroup;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, this.checkEmail]),
    });
  }

  checkEmail(control: FormControl): {[s: string]: boolean} {
    if (control.value) {
      const mailDomen = control.value.split('@')[1];
      if (mailDomen !== 'fusionworks.md') {
        return {'notCorporateEmail': true};
      }
    }
    return null;
  }

  onSubmit() {
    this.authService.reset(this.resetForm.value).subscribe(
      (response) => {console.log(response); },
      (error) => {console.log(error); }
    );
  }
}
