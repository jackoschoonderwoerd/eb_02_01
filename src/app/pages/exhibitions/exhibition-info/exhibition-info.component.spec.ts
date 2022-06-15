import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionInfoComponent } from './exhibition-info.component';

describe('ExhibitionInfoComponent', () => {
  let component: ExhibitionInfoComponent;
  let fixture: ComponentFixture<ExhibitionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
