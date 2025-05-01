import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import carData from '../data/car-data.json';

@Component({
  selector: 'app-grid',
  standalone: false,
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})

export class GridComponent implements OnInit {
  gridOptions: GridOptions | undefined;

  ngOnInit(): void {
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
      rowData: carData,
      domLayout: 'autoHeight',
      animateRows: true
    };
  }
}
