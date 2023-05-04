import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent implements OnInit {

  public cancelOption: string = 'CANCEL';
  public navigateOption: string = 'NAVIGATE';


  constructor() {
  }

  ngOnInit(): void {
  }

}
