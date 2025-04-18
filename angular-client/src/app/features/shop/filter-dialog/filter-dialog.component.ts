import {Component, inject, OnInit} from '@angular/core';
import {ShopsService} from "../../../core/services/shops.service";
import {MatDivider} from "@angular/material/divider";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule,
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss'
})
export class FilterDialogComponent implements OnInit {

  shopService = inject(ShopsService);
  private dialogRef= inject(MatDialogRef<FilterDialogComponent>);
  data= inject(MAT_DIALOG_DATA);

  selectedBrands: string[] = this.data.selectedBrands;
  selectedTypes: string[] = this.data.selectedTypes;

  ngOnInit(): void {

  }

  applyFilter(): void {
    this.dialogRef.close({
      selectedBrands: this.selectedBrands,
      selectedTypes: this.selectedTypes,
    });
  }
}
