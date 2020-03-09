import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { TabViewComponent } from './tab-view/tab-view.component';

const routes: Routes = [
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  // {path:'home',component:UploadImageComponent},
  // {path:'activities',component:TabViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
