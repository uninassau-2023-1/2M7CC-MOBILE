import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { Token, TokenType } from '../services/data.service';

@Component({
  selector: 'app-tokens',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class TokenComponent {
  private platform = inject(Platform);
  @Input() token?: Token;
  isIos() {
    return this.platform.is('ios');
  }

  public tokenTypeToString(type: TokenType) {
    switch (type) {
      case TokenType.SE:
        return 'SE\nEXAMES';
      case TokenType.SP:
        return 'SP\nPRIORITÁRIA';
      default:
        return 'SG\nGERAL';
    }
  }
}
