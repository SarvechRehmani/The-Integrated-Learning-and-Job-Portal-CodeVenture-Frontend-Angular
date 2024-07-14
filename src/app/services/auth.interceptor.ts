import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private login: LoginService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.login.getToken();
        console.log("inside interceptor");
        console.log(token)
        if (token != null) {
            authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
            console.log("Cloned Request:", authReq);
            console.log("token is not null");
        }
        return next.handle(authReq);
    }

}
export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
];