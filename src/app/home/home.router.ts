import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'music',
        loadChildren: () =>
          import('../pages/music/music.module').then(
            m => m.MusicPageModule
          )
      },
      {
        path: 'playlist',
        loadChildren: () =>
          import('../pages/playlist/playlist.module').then(
            m => m.PlaylistPageModule
          )
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../pages/settings/settings.module').then(
            m => m.SettingsPageModule
          )
      }

    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRouter { }
