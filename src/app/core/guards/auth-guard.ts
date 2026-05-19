// auth.guard.ts
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {

  const plataformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(plataformId)) {
    const isLoggedIn = localStorage.getItem('taskflow_user');
    if (isLoggedIn) {
      return true;
    }
  }
  return router.parseUrl('/task');

};