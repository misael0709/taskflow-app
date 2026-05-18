import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
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
},

{
    path: 'tasks/new',
    loadComponent: () => import('./features/tasks/pages/task-create/task-create/task-create')
        .then(m => m.TaskCreate),
        canActivate: [authGuard]
},

{
    path: 'tasks/:id/edit',
    loadComponent: () => import('./features/tasks/pages/task-edit/task-edit/task-edit')
        .then(m => m.TaskEdit)
},


{
    path: 'tasks/:id',
    loadComponent: () => import('./features/tasks/pages/task-detail/task-detail/task-detail')
        .then(m => m.TaskDetail)
},

{ path: '**', redirectTo: 'tasks' }
];
