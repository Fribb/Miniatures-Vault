import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatorsComponent} from './creators.component';
import {HarnessLoader, parallel} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatTableHarness} from "@angular/material/table/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatTableModule} from "@angular/material/table";

describe('CreatorsComponent', () => {
  let component: CreatorsComponent;
  let fixture: ComponentFixture<CreatorsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [
        CreatorsComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness', async () => {
    const harnesses = await loader.getAllHarnesses(MatTableHarness);
    expect(harnesses.length).toBe(1);
  });

  it('should get the rows in the table', async () => {
    const table = await loader.getHarness(MatTableHarness.with({selector: '#creatorsTable'}));
    const headerRows = await table.getHeaderRows();
    const rows = await table.getRows();

    fixture.whenStable().then(async () => {
      expect(table).toBeTruthy();
      expect(headerRows.length).toBe(1);
      expect(rows.length).toBe(1);
    });
  });

  it('should get the first row', async () => {
    const table = await loader.getHarness(MatTableHarness.with({selector: '#creatorsTable'}));
    const firstRow = (await table.getRows())[0];
    const cells = await firstRow.getCells();
    const cellText = await parallel(() => cells.map(cell => cell.getText()));

    fixture.whenStable().then(async () => {
      expect(cellText).toEqual(['', 'Test Creator 01', '', 'edit', 'delete']);
    })
  });

});
