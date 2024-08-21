import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>© 2024 Pokémon App. Todos los derechos reservados.</span>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 40px;
      font-size: 14px;
      justify-content: center;
    }
  `]
})
export class FooterComponent {}