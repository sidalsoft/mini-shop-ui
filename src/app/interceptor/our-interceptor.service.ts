import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from "../services/app.service";
import { map, tap } from "rxjs/operators";
import { SpinnerService } from "../services/spinner.service";

@Injectable()
export class OurInterceptor implements HttpInterceptor {

  constructor(private appService: AppService,
              private spinnerService: SpinnerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner = true;
    return next.handle(request).pipe(
      map((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse){
          this.spinnerService.showSpinner = false;
        }
        return evt
      }));
  }
}
