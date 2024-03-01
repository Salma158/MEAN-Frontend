import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authreq = req.clone({
    withCredentials:true
  })
  return next(req);
 
};
