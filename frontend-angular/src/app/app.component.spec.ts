import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HarnessLoader} from "@angular/cdk/testing";
import {Routes} from "@angular/router";
import {MiniaturesComponent} from "./content/miniatures/miniatures.component";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;
  let component: AppComponent;

  const routes: Routes = [
    {path: '', component: MiniaturesComponent},
    {path: 'miniatures', component: MiniaturesComponent},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'frontend-angular'`, () => {
    expect(component.title).toEqual('frontend-angular');
  });
});
