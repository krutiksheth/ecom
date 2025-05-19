import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../../../core/services/account.service";
import {Router} from "@angular/router";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {SnackbarService} from "../../../core/services/snackbar.service";
import {JsonPipe} from "@angular/common";
import {TextInputComponent} from "../../../shared/components/text-input/text-input.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    JsonPipe,
    TextInputComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  passwordValidation = new RegExp(
    /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
  );
  validationErrors?: string[];
  private fb = inject(FormBuilder);
  registerForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })
  private accountService = inject(AccountService);
  private router = inject(Router);
  private snack = inject(SnackbarService);

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snack.success('Register successfully - you can now login');
        this.router.navigateByUrl('/login');
      },
      error: errors => {
        this.validationErrors = errors;
      }
    });
  }
}
