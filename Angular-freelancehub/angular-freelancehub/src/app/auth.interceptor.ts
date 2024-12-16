// import { HttpInterceptorFn } from '@angular/common/http';

// export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     const clonedReq = req.clone({
//       headers: req.headers.set('Authorization', `Bearer ${token}`)
//     });
//     return next(clonedReq);
//   }
//   return next(req);
// };

