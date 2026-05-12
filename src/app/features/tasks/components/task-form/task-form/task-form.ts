// task-form.component.ts
import { Component, inject, output, input } from '@angular/core';
import {ReactiveFormsModule, FormBuilder,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.html'
})

export class TaskFormComponent {
  private fb = inject(FormBuilder);
  taskToEdit = input<Task | null>(null);
  formSubmit = output<Partial<Task>>();
  formCancel = output<void>();
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    status: ['pending', Validators.required]
  });

  ngOnInit(): void {
    if (this.taskToEdit()) {
      this.form.patchValue(this.taskToEdit()!);
    }
  }
  onSubmit(): void {
    console.log("En metodo Onsubmit: ");
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value as Partial<Task>);
      this.form.reset({ status: 'pending' });
    }
  }

  onCancel(): void {
    this.formCancel.emit();
    this.form.reset({ status: 'pending' });
  }

  get titleError(): string {
    const ctrl = this.form.get('title');
    if (ctrl?.hasError('required')) return 'El título es obligatorio';
    if (ctrl?.hasError('minlength')) return 'Mínimo 3 caracteres';
    return '';
  }
} 