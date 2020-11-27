import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss']
})
export class SecondaryButtonComponent implements OnInit {

  constructor() { }

  @Input() secondaryButtonTitle:String

  ngOnInit(): void {
  }

}
