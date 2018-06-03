import { Component } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments: string[] = [];
  count = 0;
  url = 'http://kinokoru.jp/archives/1289';
  result = '';
  name = '';
  title = 'app';

  constructor(private jsonp: Jsonp) {
  
  }

  onclick() {
    let params = new URLSearchParams();
    params.set('url', this.url);
    params.set('callback', 'JSONP_CALLBACK');

    this.jsonp.get('http://b.hatena.ne.jp/entry/jsonlite/', 
      { search: params })
      .subscribe(
        response => {
          let data = response.json() || {};
          this.count = data.count;
          let result: string[] = [];
          data.bookmarks.forEach((value: any) => {
            if (value.comment !== '') {
              console.log(value);
              result.push(value.comment);
            }
          });
          this.comments = result;
        },
        error =>  { 
          console.log(error);
          this.count = 0;
          this.comments = [];
          console.log('Failed to access to the hatena server.');
        }
      )

  }
  

}
