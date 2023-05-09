import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  public title: string = "Miniatures-Vault";

  constructor() {
  }

  ngOnInit(): void {
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public openMiniatureDialog(): void {
    // TODO: implement opening the Miniature Dialog
  }

}
