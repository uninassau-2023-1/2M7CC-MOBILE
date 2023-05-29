import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Senha2Page } from './senha2.page';

describe('Senha2Page', () => {
  let component: Senha2Page;
  let fixture: ComponentFixture<Senha2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Senha2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
