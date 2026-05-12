import { Routes } from '@angular/router';
export const routes: Routes = [{
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
},

{
    path: 'tasks',
    loadComponent: () =>
        import('./features/tasks/pages/task-list/task-list')
            .then(m => m.TaskListComponent)
},
{
    path: 'form',
    loadComponent: () =>
        import('./features/tasks/components/task-form/task-form/task-form')
            .then(m => m.TaskFormComponent)
}];
