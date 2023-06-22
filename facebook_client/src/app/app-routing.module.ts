import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard, loginRegisterDontEnterGuard } from './guards/login.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ViewVideoComponent } from './pages/view-video/view-video.component';
import { MessageComponent } from './pages/message/message.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'login',

    component: LoginComponent,
    canActivate: [loginRegisterDontEnterGuard],
  },
  {
    path: 'register',

    component: RegisterComponent,
    canActivate: [loginRegisterDontEnterGuard],
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'view/videos/:id',
    component: ViewVideoComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'messages/:id',
    component: MessageComponent,
    canActivate: [loginGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [loginGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
