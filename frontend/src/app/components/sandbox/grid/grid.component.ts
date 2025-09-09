import { Component, OnInit } from '@angular/core';
import { GridApi, GridOptions, ClientSideRowModelModule, ModuleRegistry, ClientSideRowModelApiModule } from 'ag-grid-community';
import carData from '../data/car-data.json';

@Component({
  selector: 'app-grid',
  standalone: false,
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent implements OnInit {
  gridOptions: GridOptions | undefined;
  modules = [ClientSideRowModelModule];
  private gridApi: GridApi | null = null;

  ngOnInit(): void {
    ModuleRegistry.registerModules([ClientSideRowModelApiModule]);
    this.gridOptions = {
      columnDefs: [
        { headerName: 'Make', field: 'make', suppressMovable: true },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Country', field: 'country' },
        { headerName: 'Body Type', field: 'bodyType' },
        { headerName: 'Year of Production', field: 'year' },
        { headerName: 'Fuel Type', field: 'fuelType' },
        { headerName: 'Price', field: 'price' }
      ],
      defaultColDef: {
        minWidth: 100,
        resizable: true,
        sortable: true
      },
      domLayout: 'autoHeight',
      animateRows: true
    };
  }

  onGridReady(params: { api: GridApi }) {
    this.gridApi = params.api;
    this.simulateGradualLoading()
  }

  simulateGradualLoading() {
    let i = 0;
    const allRows = carData as Record<string, unknown>[];
    setTimeout(() => {
      const interval = setInterval(() => {
        if (this.gridApi && i < allRows.length) {
          this.gridApi.applyTransaction({ add: [allRows[i]] });
          i++;
        }
        if (i >= allRows.length) {
          clearInterval(interval);
        }
      }, 200);
    }, 2000);
  }
}
