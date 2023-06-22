import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.scss'],
})
export class ViewVideoComponent {
  videos: any = [];
  idParam: number = 0;
  dataVideo: any = {};

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.listVideo();

    this.getParam();

    this.loaddingVideo();
  }
  getParam() {
    this.route.params.subscribe((params: Params) => {
      const paramValue = params['id'];
      this.idParam = parseInt(paramValue);
    });
  }
  listVideo() {
    this.videoService.getVideos().subscribe(
      (res) => {
        this.videos = res.results;
        console.log(this.videos);
      },
      (err) => console.log('err ', err)
    );
  }

  loaddingVideo() {
    this.videoService.getVideoById(this.idParam).subscribe(
      (res) => {
        console.log('this is my res', res);
        if (res.errCode === 0) {
          this.dataVideo = res.data;
          console.log('this is my data ', this.dataVideo);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  urlToSafe(data: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  handleClick(data: any) {
    // this.router.navigate([`/view/videos/${data.id}`]);
    this.idParam = data.id;
    // this.getParam();
    this.loaddingVideo();
  }

  handleClickToLeft() {
    console.log('left');
  }
  handleClickToRight() {
    console.log('right');
  }
}
