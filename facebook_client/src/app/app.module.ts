//modules
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgImageSliderModule } from 'ng-image-slider';
import { environment } from '../environments/environments';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import { CarouselModule } from 'primeng/carousel';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
// import { ReactiveFormsModule } from '@angular/forms';
// import { VideoModule } from 'primeng';
// import { NguCarouselModule } from '@ngu/carousel';

// import { SimpleModalModule } from 'ngx-simple-modal';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BoxPersonComponent } from './components/box-person/box-person.component';
import { InputTextModule } from 'primeng/inputtext';
import { MenuComponent } from './components/menu/menu.component';
import { InputCreateComponent } from './components/input-create/input-create.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NeedLoginComponent } from './components/need-login/need-login.component';

//services
import { CookieService } from 'ngx-cookie-service';
import { loginGuard, loginRegisterDontEnterGuard } from './guards/login.guard';
import { FriendsComponent } from './components/friends/friends.component';
import { ImagesComponent } from './components/images/images.component';
import { VideosComponent } from './components/videos/videos.component';
import { BoxFriendComponent } from './components/box-friend/box-friend.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddfriendComponent } from './components/addfriend/addfriend.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListvideoComponent } from './components/listvideo/listvideo.component';
import { SendRequestComponent } from './components/send-request/send-request.component';
import { BoxUserComponent } from './components/box-user/box-user.component';
import { ViewVideoComponent } from './pages/view-video/view-video.component';
import { MessageComponent } from './pages/message/message.component';

// khởi tạo biến
const config: SocketIoConfig = { url: 'http://localhost:5555', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    HeaderComponent,
    FooterComponent,
    BoxPersonComponent,
    MenuComponent,
    InputCreateComponent,
    LoginComponent,
    RegisterComponent,
    NeedLoginComponent,
    FriendsComponent,
    ImagesComponent,
    VideosComponent,
    BoxFriendComponent,
    PostComponent,
    ProfileComponent,
    AddfriendComponent,
    HomePageComponent,
    ListvideoComponent,
    SendRequestComponent,
    BoxUserComponent,
    ViewVideoComponent,
    MessageComponent,
    
  ],
  imports: [
    PasswordModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenubarModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    InputTextareaModule,
    OverlayPanelModule,
    PickListModule,
    NgImageSliderModule,
    CarouselModule,
    TooltipModule,
    SidebarModule,
    // NguCarouselModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    SocketIoModule.forRoot(config),
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [CookieService, loginGuard, loginRegisterDontEnterGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
