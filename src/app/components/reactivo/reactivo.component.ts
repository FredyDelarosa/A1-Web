import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule
import { Dialog1Component } from '../dialog/dialog.component'; 
import { Band } from '../../models/Band'; // Asegúrate de importar el modelo correcto
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class ReactivoComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      zone: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog1Component, {
      width: '300px',
      data: { formData: this.form.value }, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El diálogo se cerró con los siguientes datos:', result);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newBand = new Band(
        1, // O manejar el ID de manera dinámica
        this.form.get('name')?.value,
        this.form.get('zone')?.value,
        this.form.get('category')?.value
      );
      console.log('Banda enviada', newBand);
      // Aquí puedes agregar lógica para guardar la banda en una lista o enviarla a un servidor
      this.openDialog(); // Abrir el diálogo de confirmación después de enviar
      this.form.reset(); // Opcional: reiniciar el formulario después de enviar
    } else {
      console.log('Formulario no es válido');
    }
  }
}
