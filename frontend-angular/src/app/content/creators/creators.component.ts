import {Component} from '@angular/core';
import {Creator} from "../../shared/interfaces/creator";

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.css']
})
export class CreatorsComponent {

  public displayedColumns: string[] = ['image', 'name', 'link', 'edit', 'delete'];
  dataSource: Creator[] = [
    {name: 'Test Creator 01'}
  ];
}
