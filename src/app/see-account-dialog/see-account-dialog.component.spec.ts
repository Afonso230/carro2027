import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAccountDialogComponent } from './see-account-dialog.component';

describe('SeeAccountDialogComponent', () => {
  let component: SeeAccountDialogComponent;
  let fixture: ComponentFixture<SeeAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeAccountDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
