import { Component } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { HatenaService } from './hatena.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HatenaService]
})
export class AppComponent {
  comments: string[] = [];
  count = 0;
  url = 'http://kinokoru.jp/archives/1289';
  result = '';
  name = '';
  title = 'app';

  constructor(private hatena: HatenaService) {
  
  }

  onclick() {
    this.hatena.requestGet(this.url)
      .subscribe(
        data => {
          let result: string[] = [];
          data.bookmarks.forEach(function(value: any) {
            if (value.comment !== '') {
              result.push(value.comment)
            }
          });
          this.comments = result;
          this.count = data.count;
        },
        error => {
          this.count = 0;
          this.comments = [];
          console.log('Failed to access Hatena server.');
        }
      );
  }
  

}
