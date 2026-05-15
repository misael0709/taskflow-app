// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('taskflow_user');

  if (isLoggedIn) {
    return true;
  }
  return router.parseUrl('/tasks');
};