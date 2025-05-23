import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteUserDialogComponent } from './confirm-delete-user-dialog.component';

describe('ConfirmDeleteUserDialogComponent', () => {
  let component: ConfirmDeleteUserDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteUserDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
