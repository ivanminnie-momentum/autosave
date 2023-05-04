import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-save-indicator',
  templateUrl: './save-indicator.component.html',
  styleUrls: ['./save-indicator.component.scss']
})
export class SaveIndicatorComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
