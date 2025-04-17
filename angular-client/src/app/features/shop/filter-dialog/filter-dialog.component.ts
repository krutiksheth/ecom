import {Component, inject, Inject, OnInit} from '@angular/core';
import {ShopsService} from "../../../core/services/shops.service";
import {MatDivider} from "@angular/material/divider";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss'
})
export class FilterDialogComponent implements OnInit {

  shopService = inject(ShopsService);

  ngOnInit(): void {

  }
}
