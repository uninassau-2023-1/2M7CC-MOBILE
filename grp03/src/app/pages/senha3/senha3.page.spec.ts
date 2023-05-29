import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Senha3Page } from './senha3.page';

describe('Senha3Page', () => {
  let component: Senha3Page;
  let fixture: ComponentFixture<Senha3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Senha3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
