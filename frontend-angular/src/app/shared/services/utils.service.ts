import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private appTitle: string = "Miniatures-Vault";
  private appVersion: string = environment.appVersion;

  /**
   * get the title of the application
   *
   * @returns string - the title
   */
  public getAppTitle(): string {
    return this.appTitle;
  }

  public getAppVersion(): string {
    return this.appVersion;
  }
}
