import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form';

describe('TaskForm', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debe ser inválido cuando está vacío', () => {
    expect(component.form.valid).toBeFalsy();
  });
  
  it('debe mostrar error cuando el título tiene menos de 3 chars', () => {
    component.form.get('title')?.setValue('AB');
    component.form.get('title')?.markAsTouched();
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.error');
    expect(error?.textContent).toContain('3 caracteres');
  });

  it('debe emitir formSubmit cuando el formulario es válido', () => {
    let emitted: any = null;
    component.formSubmit.subscribe((val: any) => emitted = val);
    component.form.setValue({
      title: 'Tarea válida',
      description: 'Descripción',
      status: 'pending'
    });
    component.onSubmit();
    expect(emitted).toBeTruthy();
    expect(emitted.title).toBe('Tarea válida');
  });

  it('no debe emitir si el formulario es inválido', () => {
    let emitted = false;
    component.formSubmit.subscribe(() => emitted = true);
    component.form.setValue({
      title: '',
      description: '',
      status: 'pending'
    });
    component.onSubmit();
    expect(emitted).toBeFalsy;
  });
});
