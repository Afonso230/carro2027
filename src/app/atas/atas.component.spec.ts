import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtasComponent } from './atas.component';

describe('AtasComponent', () => {
  let component: AtasComponent;
  let fixture: ComponentFixture<AtasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
