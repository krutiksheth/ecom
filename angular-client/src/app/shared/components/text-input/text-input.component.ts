import {Component, Input, Self} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatError
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = "";
  @Input() type = "text";

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  get control() {
    return this.controlDir.control as FormControl;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {

  }
}
