import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task';
import { Router } from '@angular/router';
import { TaskApi } from '../../services/task-api';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './task-list.html'
})

export class TaskListComponent implements OnInit {
    private api = inject(TaskApi);
    private taskService = inject(TaskService);
    private router = inject(Router);
    tasks = signal<Task[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);
    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.loading.set(true);
        this.error.set(null);
        this.api.getAll().subscribe({
            next: (data) => { this.tasks.set(data); this.loading.set(false); },
            error: () => {
                this.error.set('Error al cargar tareas');
                this.loading.set(false);
            }
        });
    }

    irAgregar() {
        // Lógica adicional aquí
        this.router.navigate(['/form']);
    }
}