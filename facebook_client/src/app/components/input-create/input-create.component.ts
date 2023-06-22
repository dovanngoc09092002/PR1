import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage"
import { NotificationsService } from 'angular2-notifications';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-input-create',
  templateUrl: './input-create.component.html',
  styleUrls: ['./input-create.component.scss'],
})
export class InputCreateComponent {
  @Input() userProfile: any = {};
  // @Input() item: any = {};
  @Output() voteSize = new EventEmitter();
  displayModal: boolean = false;
  value: string = '';
  noloadding: boolean = true;
  isloadding: boolean = false;
  viewImage: string = '';
  // value : string = '';

  constructor(
    private firebaseStorage: AngularFireStorage,
    private postService: PostService,
    private notificationsService : NotificationsService
  ) {}

  async onfileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.noloadding = false;
      this.isloadding = true;

      const path = `yt/${file.name}`;
      const upload = await this.firebaseStorage.upload(path, file);
      const url = await upload.ref.getDownloadURL();
      // console.log('this is url', url);
      this.viewImage = url;
      this.noloadding = false;
      this.isloadding = false;
    }
  }

  showModal() {
    this.displayModal = true;
  }

  hideModal() {
    this.displayModal = false;
  }

  createPost() {
    const data = {
      postText: this.value,
      postImage: this.viewImage,
    };
    this.postService.createPostService(data).subscribe(
      (res) => {
        // console.log('this is data post ', res);
        this.voteSize.emit(res.data);

        this.notificationsService.info('Thông báo : ', `Tạo bài viết thành công`, {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        });

        if (res.errCode === 0) {
          this.value = '';
          this.viewImage = '';
          this.displayModal = false;
        }
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }
}
