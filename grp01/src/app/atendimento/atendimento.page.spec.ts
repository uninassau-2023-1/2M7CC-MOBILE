import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtendimentoPage } from './atendimento.page';

describe('AtendimentoPage', () => {
  let component: AtendimentoPage;
  let fixture: ComponentFixture<AtendimentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AtendimentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
