import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MiniaturesComponent} from './miniatures.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatCardModule} from "@angular/material/card";
import {MatCardHarness} from "@angular/material/card/testing";

describe('MiniaturesComponent', () => {
  let component: MiniaturesComponent;
  let fixture: ComponentFixture<MiniaturesComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [
        MiniaturesComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MiniaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness', async () => {
    const harnesses = await loader.getAllHarnesses(MatCardHarness);
    expect(harnesses.length).toBe(1);
  });

  it('should render one placeholder miniature', async () => {
    const card = await loader.getAllHarnesses(MatCardHarness.with({selector: '#card'}));
    const cardTitle = await card[0].getTitleText();
    const cardSubtitle = await card[0].getSubtitleText();

    fixture.whenStable().then(async () => {
      expect(card).toBeTruthy();
      expect(card.length).toBe(1);
      expect(cardTitle).toEqual("Test Miniature");
      expect(cardSubtitle).toEqual("Placeholder");
    });
  });

  it('should open the Miniature dialog', function () {
    // TODO: implement test that checks if the miniature dialog was opened
  });
});
