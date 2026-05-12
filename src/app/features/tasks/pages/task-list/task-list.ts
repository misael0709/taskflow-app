import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './task-list.html'
})

export class TaskListComponent {

    private taskService = inject(TaskService);

    tasks = this.taskService.tasks$;

    deleteTask(id: number): void {
        this.taskService.delete(id);
    }
}
