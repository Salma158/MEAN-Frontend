import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const StorageService = inject(StorageServiceService);
  const router = inject(Router)
  const token= StorageService.getUser()?.token;
  if(!token){
    router.navigate(['/log-in'])
    return false;
  }
  return true;
};
