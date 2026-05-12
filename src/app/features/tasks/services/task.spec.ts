import { TestBed } from '@angular/core/testing';
import { TaskService } from './task';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe retornar las tareas iniciales', () => {
    const tasks = service.getAll();
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('debe agregar una nueva tarea', () => {
    const before = service.getAll().length;
    service.add({
      title: 'Test', description: '',
      status: 'pending'
    });
    expect(service.getAll().length).toBe(before + 1);
  });

  it('debe actualizar el título de una tarea', () => {
    service.add({
      title: 'Original', description: '',
      status: 'pending'
    });
    const tasks = service.getAll();
    const id = tasks[tasks.length - 1].id;
    service.update(id, { title: 'Actualizado' });
    const updated = service.getById(id);
    expect(updated?.title).toBe('Actualizado');
  });

  it('debe eliminar una tarea por id', () => {
    service.add({
      title: 'Para eliminar', description: '',
      status: 'pending'
    });
    const tasks = service.getAll();
    const id = tasks[tasks.length - 1].id;
    const before = tasks.length;
    service.delete(id);
    expect(service.getAll().length).toBe(before - 1);
    expect(service.getById(id)).toBeUndefined();
  });
});