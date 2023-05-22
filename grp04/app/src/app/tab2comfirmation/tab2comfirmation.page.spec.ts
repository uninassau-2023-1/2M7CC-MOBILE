import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab2comfirmationPage } from './tab2comfirmation.page';

describe('Tab2comfirmationPage', () => {
  let component: Tab2comfirmationPage;
  let fixture: ComponentFixture<Tab2comfirmationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Tab2comfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
