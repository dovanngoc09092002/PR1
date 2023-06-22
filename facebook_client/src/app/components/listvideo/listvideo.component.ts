// import { Component } from '@angular/core';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {  Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

// import html2canvas from 'html2canvas';
// import { flatMap } from 'rxjs';
// import { NguCarouselConfig } from '@ngu/carousel';
@Component({
  selector: 'app-listvideo',
  templateUrl: './listvideo.component.html',
  styleUrls: ['./listvideo.component.scss'],
})
export class ListvideoComponent {
  @Input() userProfile: any = {};

  @ViewChild('videoElement')
  videoElement!: ElementRef;
  thumbnailUrl: string = '';
  products: any = [];
  displayModal: boolean = false;

  isVideo: boolean = false;
  isImage: boolean = false;

  isCreate: boolean = true;
  isCreate2: boolean = true;

  isLoadding: boolean = false;
  isLoadding2: boolean = false;

  viewVideo: any = '';

  viewImage: any = '';

  urlSafe: SafeResourceUrl | undefined;

  urlSafe2: SafeResourceUrl | undefined;

  listVideo: any = [];

  idParam : number = 0;

  constructor(
    private firebaseStorage: AngularFireStorage,
    public sanitizer: DomSanitizer,
    private videoService: VideoService, // private imageCompress: NgxImageCompressService,
    private router: Router,
   
  ) {
    this.getFullVideos();
  }

  ngOnInit() {
  
  }

  showModal() {
    this.displayModal = true;
  }

  hideModal() {
    this.displayModal = false;
  }

  async onfileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('this is file ', file);
      this.isLoadding = true;

      const path = `vd/${file.name}`;

      const upload = await this.firebaseStorage.upload(path, file);

      const url = await upload.ref.getDownloadURL();
      this.viewVideo = url;

      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.viewVideo
      );

      this.isLoadding = false;
      this.isCreate = false;
      this.isVideo = true;
    }
  }

  async onfileChange2(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('this is file ', file);
      this.isLoadding2 = true;

      const path = `img/${file.name}`;

      const upload = await this.firebaseStorage.upload(path, file);

      const url = await upload.ref.getDownloadURL();
      this.viewImage = url;

      // this.urlSafe2 = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   this.viewImage
      // );

      this.isLoadding2 = false;
      this.isCreate2 = false;
      this.isImage = true;
    }
  }

  createVideo() {
    const data = {
      video: this.viewVideo,
      image: this.viewImage,
    };

    if (!data.video || !data.image) {
      alert('Cần up đủ thông tin');
    } else {
      this.videoService.createVideo(data).subscribe(
        (res) => {
          console.log('this is data video ', res);
          if (res.errCode === 0) {
            this.products = [res.data, ...this.products];

            this.viewImage = '';
            this.isVideo = false;
            this.isImage = false;
            this.isCreate = true;
            this.isCreate2 = true;
            this.viewVideo = '';
            // this.urlSafe = "";
            this.hideModal();
          }
        },
        (err) => {
          console.log('this iss err', err);
        }
      );
    }
  }

  getFullVideos() {
    this.videoService.getVideos().subscribe(
      (data) => {
        // console.log('this is data', data);
        if (data.errCode === 0) {
          this.products = data.results;
          // console.log('this is listvd', this.products);
        }
      },

      (err) => {
        console.log(err);
      }
    );
  }

  handleClickViewVideo(id: number) {
    console.log('this is id video', id);
    this.router.navigate([`/view/videos/${id}`]);
  }

  responsiveOptions: any = [];
}
