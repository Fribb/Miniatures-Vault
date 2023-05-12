import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FooterComponent} from './footer.component';
import {HarnessLoader} from "@angular/cdk/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {environment} from "../../environments/environment";

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let loader: HarnessLoader;
  let component: FooterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('version should start with v and end with -dev', () => {
    const element = fixture.nativeElement as HTMLElement;
    const elementText = element.querySelector('span')?.textContent;

    expect(elementText).toBeTruthy();
    expect(elementText).toContain(environment.appVersion);
  });
});
