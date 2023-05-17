import { Component, OnInit } from '@angular/core';
import {Miniature} from "../../shared/interfaces/miniature";

@Component({
  selector: 'app-miniatures',
  templateUrl: './miniatures.component.html',
  styleUrls: ['./miniatures.component.css']
})
export class MiniaturesComponent implements OnInit {

  public miniatureList: Miniature[] = [];

  constructor() { }

  ngOnInit(): void {
    const miniature: Miniature = { name: "Test Miniature" };
    this.miniatureList.push(miniature);
  }

  openMiniatureEditDialog(miniature: Miniature): void {
    // TODO: open dialog to edit miniature
  }

}
