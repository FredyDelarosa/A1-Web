import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Band } from '../../models/Band';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  form: FormGroup;
  savedBandsA: Array<Band> = []; // Lista para las bandas de categoría A
  savedBandsB: Array<Band> = []; // Lista para las bandas de categoría B
  bandIdCounter = 1;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      zone: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.form.valid) {
      const band = new Band(
        this.bandIdCounter++,
        this.form.get('name')?.value,
        this.form.get('zone')?.value,
        this.form.get('category')?.value
      );

      // Guardar la banda en la lista correspondiente a su categoría
      if (band.category === 'A') {
        this.savedBandsA.push(band);
      } else if (band.category === 'B') {
        this.savedBandsB.push(band);
      }

      this.form.reset(); // Reiniciar el formulario
    }
  }

  // Método para eliminar una banda de una categoría específica
  removeBand(index: number, category: string) {
    if (category === 'A') {
      this.savedBandsA.splice(index, 1);
    } else if (category === 'B') {
      this.savedBandsB.splice(index, 1);
    }
  }
}
