import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotemPage } from './totem.page';

describe('TotemPage', () => {
  let component: TotemPage;
  let fixture: ComponentFixture<TotemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TotemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
