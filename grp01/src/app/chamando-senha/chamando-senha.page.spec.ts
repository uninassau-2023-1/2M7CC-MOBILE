import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChamandoSenhaPage } from './chamando-senha.page';

describe('ChamandoSenhaPage', () => {
  let component: ChamandoSenhaPage;
  let fixture: ComponentFixture<ChamandoSenhaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChamandoSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
