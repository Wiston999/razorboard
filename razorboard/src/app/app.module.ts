import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpEventsService } from './http-events.service';
import { HttpLoadingInterceptor } from './http-loading.interceptor';
import { HttpErrorInterceptor } from './http-error.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NodeDetailComponent } from './node-detail/node-detail.component';
import { MacAddrPipe } from './mac-addr.pipe';
import { NodeLogViewerComponent } from './node-log-viewer/node-log-viewer.component';
import { NodeReinstallModalComponent } from './node-reinstall-modal/node-reinstall-modal.component';
import { RainbowBracketsPipe } from './rainbow-brackets.pipe';
import { FactsFilterPipe } from './node-detail/facts-filter.pipe';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { TablePolledComponent } from './table-polled/table-polled.component';
import { TableRowDirective } from './table-polled/table-row.directive';
import { NodesListComponent } from './nodes-list/nodes-list.component';
import { NodeListItemComponent } from './nodes-list/node-list-item/node-list-item.component';
import { BrokersListComponent } from './brokers-list/brokers-list.component';
import { BrokerListItemComponent } from './brokers-list/broker-list-item/broker-list-item.component';
import { ReposListComponent } from './repos-list/repos-list.component';
import { RepoListItemComponent } from './repos-list/./repo-list-item/repo-list-item.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagListItemComponent } from './tags-list//tag-list-item/tag-list-item.component';
import { PoliciesListComponent } from './policies-list/policies-list.component';
import { PolicyListItemComponent } from './policies-list/policy-list-item/policy-list-item.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskListItemComponent } from './tasks-list/task-list-item/task-list-item.component';
import { HooksListComponent } from './hooks-list/hooks-list.component';
import { HookListItemComponent } from './hooks-list/hook-list-item/hook-list-item.component';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { ConfigurationListItemComponent } from './configuration-list/configuration-list-item/configuration-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    NodeDetailComponent,
    NodeListItemComponent,
    MacAddrPipe,
    HookListItemComponent,
    TagListItemComponent,
    TaskListItemComponent,
    RepoListItemComponent,
    NodeLogViewerComponent,
    NodeReinstallModalComponent,
    RainbowBracketsPipe,
    FactsFilterPipe,
    BrokerListItemComponent,
    SettingsModalComponent,
    NodesListComponent,
    TableRowDirective,
    BrokersListComponent,
    ReposListComponent,
    TagsListComponent,
    PoliciesListComponent,
    PolicyListItemComponent,
    TasksListComponent,
    HooksListComponent,
    ConfigurationListComponent,
    ConfigurationListItemComponent,
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
      { path: 'nodes', component: NodesListComponent},
      { path: 'nodes/:id', component: NodeDetailComponent},
      { path: 'nodes/:id/log', component: NodeLogViewerComponent},
      { path: 'repos', component: ReposListComponent},
      { path: 'tags', component: TagsListComponent},
      { path: 'policies', component: PoliciesListComponent},
      { path: 'tasks', component: TasksListComponent},
      { path: 'brokers', component: BrokersListComponent},
      { path: 'hooks', component: HooksListComponent},
      { path: 'configuration', component: ConfigurationListComponent},
    ]),
  ],
  providers: [
    HttpEventsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NodeListItemComponent,
    BrokerListItemComponent,
    RepoListItemComponent,
    TagListItemComponent,
    HookListItemComponent,
    TaskListItemComponent,
    PolicyListItemComponent,
    NodeReinstallModalComponent,
    ConfigurationListItemComponent,
    SettingsModalComponent
  ],
})
export class AppModule { }
