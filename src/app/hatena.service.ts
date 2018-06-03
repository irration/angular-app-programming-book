import { Injectable } from "@angular/core";
import { Jsonp, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class HatenaService {
  constructor(private jsonp: Jsonp) {}

  requestGet(url: string): Observable<any> {
    let params = new URLSearchParams();
    params.set("url", url);
    params.set("callback", "JSONP_CALLBACK");

    return this.jsonp
      .get("http://b.hatena.ne.jp/entry/jsonlite/", { search: params })
      .pipe(
        map(
          response => {
            return response.json() || {};
          }
        ),
        catchError(
          error => {
            return Observable.throw(error.statusText);
          }
        )
    );
  }
}
