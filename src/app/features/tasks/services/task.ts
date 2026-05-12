import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Diseñar la BD',
      description: '',
      status: 'pending',
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Configurar proyecto',
      description: '',
      status: 'done',
      createdAt: new Date()
    },
    {
      id: 3,
      title: 'Prueba',
      description: 'Esto es una prueba',
      status: 'done',
      createdAt: new Date()
    }
  ]);

  readonly tasks$ = this.tasks.asReadonly();

  getAll(): Task[] {
    return this.tasks();
  }


  add(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      createdAt: new Date()
    };
    this.tasks.update(t => [...t, newTask]);
  }

  update(
    id: number,
    changes: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, ...changes } : t)
    );
  }


  delete(id: number): void {
    this.tasks.update(tasks =>
      tasks.filter(t => t.id !== id)
    );
  }


  getById(id: number): Task | undefined {
    return this.tasks().find(t => t.id === id);
  }
}