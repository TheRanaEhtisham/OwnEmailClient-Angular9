import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";

@Injectable()

export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            withCredentials: true
        })
        // req.withCredentials = true
        return next.handle(modifiedReq).pipe(
            // To check only specific type use filter
            // filter(val => val.type === HttpEventType.Sent),
            tap((val) => {
                if (val.type === HttpEventType.Sent) {
                    console.log('Request was sent to the server');
                }
                if (val.type === HttpEventType.Response) {
                    console.log('Got the response from the API', val)
                }
            }))
    }
}
