import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog1',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ] // Importa módulos necesarios si es necesario
})
export class Dialog1Component {
  constructor(public dialogRef: MatDialogRef<Dialog1Component>) {}

  onCancel(): void {
    this.dialogRef.close(false);  // Cierra el diálogo y retorna 'false'
  }

  onConfirm(): void {
    this.dialogRef.close(true);  // Cierra el diálogo y retorna 'true'
  }
}

