import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpLoadingService } from './http-loading.service';
import { HttpLoadingInterceptor } from './http-loading.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NodeDetailComponent } from './node-detail/node-detail.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NodeListItemComponent } from './node-list-item/node-list-item.component';
import { MacAddrPipe } from './mac-addr.pipe';
import { HookListItemComponent } from './hook-list-item/hook-list-item.component';
import { TagListItemComponent } from './tag-list-item/tag-list-item.component';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';
import { RepoListItemComponent } from './repo-list-item/repo-list-item.component';
import { PolicyListItemComponent } from './policy-list-item/policy-list-item.component';
import { ConfigListItemComponent } from './config-list-item/config-list-item.component';
import { NodesFilterPipe } from './list-view/nodes-filter.pipe';
import { ReposFilterPipe } from './list-view/repos-filter.pipe';
import { TagsFilterPipe } from './list-view/tags-filter.pipe';
import { TasksFilterPipe } from './list-view/tasks-filter.pipe';
import { PoliciesFilterPipe } from './list-view/policies-filter.pipe';
import { HooksFilterPipe } from './list-view/hooks-filter.pipe';
import { ConfigFilterPipe } from './list-view/config-filter.pipe';
import { NodeLogViewerComponent } from './node-log-viewer/node-log-viewer.component';
import { NodeReinstallModalComponent } from './node-reinstall-modal/node-reinstall-modal.component';
import { RainbowBracketsPipe } from './rainbow-brackets.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    NodeDetailComponent,
    ListViewComponent,
    NodeListItemComponent,
    MacAddrPipe,
    HookListItemComponent,
    TagListItemComponent,
    TaskListItemComponent,
    RepoListItemComponent,
    PolicyListItemComponent,
    ConfigListItemComponent,
    NodesFilterPipe,
    ReposFilterPipe,
    TagsFilterPipe,
    TasksFilterPipe,
    PoliciesFilterPipe,
    HooksFilterPipe,
    ConfigFilterPipe,
    NodeLogViewerComponent,
    NodeReinstallModalComponent,
    RainbowBracketsPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    OrderModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: '/nodes', pathMatch: 'full'},
      { path: 'nodes', component: ListViewComponent, data: { kind: 'nodes'}},
      { path: 'nodes/:id', component: NodeDetailComponent},
      { path: 'nodes/:id/log', component: NodeLogViewerComponent},
      { path: 'repos', component: ListViewComponent, data: { kind: 'repos'}},
      { path: 'tags', component: ListViewComponent, data: { kind: 'tags'}},
      { path: 'policies', component: ListViewComponent, data: { kind: 'policies'}},
      { path: 'tasks', component: ListViewComponent, data: { kind: 'tasks'}},
      { path: 'hooks', component: ListViewComponent, data: { kind: 'hooks'}},
      { path: 'configuration', component: ListViewComponent, data: { kind: 'configuration'}},
    ]),
  ],
  providers: [
    HttpLoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [NodeReinstallModalComponent],
})
export class AppModule { }
