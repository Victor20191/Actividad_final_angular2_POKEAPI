import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-observations-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Observaciones</h2>
    <mat-dialog-content>
      <p> Nombre: <strong>Víctor Rivera </strong>  Grupo: <strong>20</strong></p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-height: 200px;
    }
  `]
})
export class ObservationsDialogComponent {
  constructor(public dialogRef: MatDialogRef<ObservationsDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}