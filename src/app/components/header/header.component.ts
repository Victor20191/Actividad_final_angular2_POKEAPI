import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ObservationsDialogComponent } from '../observations-dialog/observations-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/" class="logo-link">
        <img src="/assets/images/pokeapi.png" alt="PokéAPI logo" class="logo-image">
      </a>
      <span class="app-title">Pokémon App</span>
      <span class="spacer"></span>
      <button mat-button (click)="openObservationsDialog()">
        <mat-icon>note</mat-icon>
        Observaciones
      </button> 
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      display: flex;
      align-items: center;
      padding: 0 16px;
      height: 64px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      height: 100%;
    }
    .logo-image {
      height: 80%;
      width: auto;
      object-fit: contain;
      margin-right: 0.5rem;
    }
    .app-title {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      white-space: nowrap;
    }
    @media (max-width: 600px) {
      .app-title {
        font-size: 1rem;
      }
      .logo-image {
        height: 70%;
      }
    }
  `]
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) {}

  openObservationsDialog(): void {
    const dialogRef = this.dialog.open(ObservationsDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}