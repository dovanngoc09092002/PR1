import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent {
  image: string = '';
  video: string = '';
  idVideo: number = 0;
  arrVideos: any = [];
  objectArray: any = [];
  isLoadding1: boolean = false;
  isLoadding2: boolean = false;
  sidebarVisible3: boolean = false;
  sidebarVisible: boolean = false;
  visible : boolean = false;
  urlSafe: SafeResourceUrl | undefined;

  constructor(
    private firebaseStorage: AngularFireStorage,
    private videoService: VideoService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.getVideosByUserId();
  }

  getVideosByUserId() {
    this.videoService.getVideoByUserId().subscribe(
      (res) => {
        console.log('this is res ', res);
        this.arrVideos = res.data;
        this.objectArray = this.arrVideos.map((i: any) => {
          return { video: i.video, posterImage: i.image };
        });
      },
      (err) => console.log('err is', err)
    );
  }

  handleClickImage(e: any) {
    this.sidebarVisible3 = true;
    console.log('this is a test : ', this.arrVideos[e]);
    this.image = this.arrVideos[e].image;
    this.video = this.arrVideos[e].video;
    this.idVideo = this.arrVideos[e].id;
  }

  updateVideo() {
    this.sidebarVisible3 = false;

    this.sidebarVisible = true;
  }

  submitUpdateVideo() {
    // console.log("this is data " , { video : this.video , image : this.image , id : this.idVideo });
    const data = {
      video: this.video,
      image: this.image,
      id: this.idVideo,
    };
    this.videoService.updateVideoByUserId(data).subscribe(
      (res) => {
        console.log('this is data res ', res);
           window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  urlToSafe(data: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }

  async onfileChange(event: any, id: number) {
    if (id === 1) {
      this.isLoadding1 = true;
    }
    if (id === 2) {
      this.isLoadding2 = true;
    }

    const file = event.target.files[0];
    if (file) {
      const path = `yt/${file.name}`;
      const upload = await this.firebaseStorage.upload(path, file);
      const url = await upload.ref.getDownloadURL();
      if (id === 1) {
        this.image = url;
        this.isLoadding1 = false;
      }
      if (id === 2) {
        this.video = url;
        this.isLoadding2 = false;
      }
    }
  }

openModal(){
  this.visible = true;
}

  deleteVideo() {
    console.log("this is");
    
    
    console.log(this.idVideo);
    this.videoService.deleteVideo({ id: this.idVideo }).subscribe(
      (res) => {
        console.log('this is res', res);
        if (res.errCode === 0){
            window.location.reload();
        } 
      },
      (err) => {
        console.log('this is err :', err);
      }
    );
  }





}

// {
//    	video: 'assets/video/movie2.mp4',
//        posterImage: 'assets/img/slider/2_min.jpeg', //Optional: You can use this key if you want to show video poster image in slider
//        title: 'Image title'
//    },
