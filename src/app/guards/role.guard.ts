import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const StorageService = inject(StorageServiceService);
  const router = inject(Router)
  const role= StorageService.getUser()?.role;
  if(role!== "admin"){
    router.navigate(['/admin'])
    return false;
  }
 
  return true;
};
