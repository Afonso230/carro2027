import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDayDialogComponent } from './show-day-dialog.component';

describe('ShowDayDialogComponent', () => {
  let component: ShowDayDialogComponent;
  let fixture: ComponentFixture<ShowDayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDayDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
