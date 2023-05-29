import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Senha1Page } from './senha1.page';

describe('Senha1Page', () => {
  let component: Senha1Page;
  let fixture: ComponentFixture<Senha1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Senha1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
