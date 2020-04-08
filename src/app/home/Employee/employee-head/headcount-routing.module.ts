import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeadcountSearchComponent } from './headcount-search.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';
import {
  AuthGuardService as AuthGuard
} from '../../../../services/auth-guard.service';

const routes: Routes = [
  {
      path: 'homesearch',
      component: HeadcountSearchComponent,
       canActivate: [AuthGuard],
       children: [
        { path: 'search', component: SearchComponent,pathMatch: 'full' },
        { path: 'upload', component: UploadComponent,pathMatch: 'full' },
        { path: 'download', component: DownloadComponent,pathMatch: 'full'},
      ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HeadroutingModule { }