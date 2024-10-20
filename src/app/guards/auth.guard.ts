import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Verificando autenticação...');

  if (authService.isAuthenticated()) {
    console.log('Usuário autenticado');
    return true;
  } else {
    console.log('Usuário não autenticado, redirecionando...');
    return router.createUrlTree(['/']);
  }
};
