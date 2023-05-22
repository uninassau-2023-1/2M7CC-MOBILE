import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourPassIsPage } from './your-pass-is.page';

describe('YourPassIsPage', () => {
  let component: YourPassIsPage;
  let fixture: ComponentFixture<YourPassIsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(YourPassIsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
