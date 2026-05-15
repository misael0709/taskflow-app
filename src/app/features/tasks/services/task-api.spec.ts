import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TaskApi } from './task-api';
import { Task } from '../models/task';
describe('TaskApi', () => {
  let service: TaskApi;
  let httpMock: HttpTestingController;
  const mockTasks: Task[] = [
    {
      id: 1, title: 'HTTP Task', description: '',
      status: 'pending', createdAt: new Date()
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TaskApi);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpMock.verify());

  it('debe obtener todas las tareas vía GET', () => {
    service.getAll().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('HTTP Task');
    });
    const req = httpMock.expectOne('http://localhost:3000/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('debe crear una tarea vía POST', () => {
    const newTask = {
      title: 'Nueva', description: '',
      status: 'pending' as const,
      createdAt: new Date()
    };
    service.create(newTask).subscribe(task => {
      expect(task.id).toBe(99);
    });
    const req = httpMock.expectOne('http://localhost:3000/api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush({ ...newTask, id: 99 });
  });
});