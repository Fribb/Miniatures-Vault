import {ComponentFixture, inject, TestBed, waitForAsync} from "@angular/core/testing";
import {HeaderComponent} from "./header.component";
import {HarnessLoader} from "@angular/cdk/testing";
import {MatSidenavModule} from "@angular/material/sidenav";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Router, Routes} from "@angular/router";
import {By} from "@angular/platform-browser";
import {Location} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {MiniaturesComponent} from "../content/miniatures/miniatures.component";
import {CreatorsComponent} from "../content/creators/creators.component";
import {MatButtonHarness} from "@angular/material/button/testing";

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let loader: HarnessLoader;
  let component: HeaderComponent;

  const routes: Routes = [
    {path: '', component: MiniaturesComponent},
    {path: 'miniatures', component: MiniaturesComponent},
    {path: 'creators', component: CreatorsComponent},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        HeaderComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent).toContain('Miniatures-Vault');
  });

  it('should go to url miniatures',
    waitForAsync(inject([Router, Location], (router: Router, location: Location) => {

      fixture.debugElement.query(By.css('a[routerLink="/miniatures"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/miniatures');
      });
    })));

  it('should go to url creators',
    waitForAsync(inject([Router, Location], (router: Router, location: Location) => {

      fixture.debugElement.query(By.css('a[routerLink="/creators"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/creators');
      });
    })));

  it('should emit sidenavToggle', async () => {

    spyOn(component.sidenavToggle, 'emit');

    const menuButton = await loader.getHarness(MatButtonHarness.with({selector: '.menu-button'}));
    await menuButton.click();

    expect(component.sidenavToggle.emit);
  });

  it('should open Miniature Dialog', async () => {
    // TODO: implement test that checks if the miniature dialog was opened
    //const openDialogSpy = spyOn(component.openMiniatureDialog(), 'open');
    //const miniatureDialogButton = await loader.getHarness(MatButtonHarness.with({selector: '.miniature-dialog'}));
    //await miniatureDialogButton.click();
  });
});
