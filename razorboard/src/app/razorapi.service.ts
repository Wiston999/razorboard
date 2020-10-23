import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject, timer, interval, merge } from 'rxjs';
import { tap, takeWhile, takeUntil, startWith, switchMap } from 'rxjs/operators';
import { ApiResponse } from './models/apiresponse.model';

@Injectable({
  providedIn: 'root'
})
export class RazorapiService {
  private endpoint: string;
  private username: string;
  private password: string;
  private refresh: number;
  private refreshEnabled: boolean;
  private readonly refreshAsync$ = new BehaviorSubject(undefined);
  reload$: Observable<any>;

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {
    this.endpoint = this.getSetting('endpoint', `${window.location.protocol}//${window.location.host}`);
    this.username = this.getSetting('username', '');
    this.password = this.getSetting('password', '');
    this.refresh = +this.getSetting('refresh', '15');
    this.refreshEnabled = this.getSetting('refreshEnabled', 'true') === 'true';
    this.reload$ = merge(
      this.refreshAsync$
    ).pipe(
      switchMap(() => {
        return interval(this.refresh * 1000).pipe(
          startWith(0),
          takeWhile(() => this.refreshEnabled)
        );
      })
    );
  }

  getSetting(key: string, def: string) {
    if (this.storage.has(key)) {
      return this.storage.get(key);
    } else {
      return def;
    }
  }

  setSetting(key: string, value: string) {
    const diff = this.storage.get(key) !== value;
    this.storage.set(key, value);
    return diff;
  }

  connect(
    endpoint: string,
    username: string,
    password: string,
    refresh: number,
    refreshEnabled: boolean,
  ): void {
    console.log('RazorApiService connect');
    let reload = false;
    this.endpoint = endpoint;
    this.username = username;
    this.password = password;
    this.refresh = refresh;
    this.refreshEnabled = refreshEnabled;
    reload = reload || this.setSetting('endpoint', endpoint);
    reload = reload || this.setSetting('username', username);
    reload = reload || this.setSetting('password', password);
    this.setSetting('refresh', refresh.toString());
    reload = reload || this.setSetting('refreshEnabled', refreshEnabled.toString());

    if (reload) {
      this.refreshAsync$.next(undefined);
    }
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getEndpoint(): string {
    return this.endpoint;
  }

  getRefresh(): number {
    return this.refresh;
  }

  getRefreshEnabled(): boolean {
    return this.refreshEnabled;
  }

  private request(collection: string): Observable<ApiResponse> {
    const requestUrl = `${this.endpoint}/api/collections/${collection}?depth=1`;
    let headers = new HttpHeaders();
    if ( this.username && this.password ) {
      const encodedAuth = btoa(`${this.username}:${this.password}`);
      headers = headers.set('Authorization', `Basic ${encodedAuth}`);
    }
    return this.http.get<ApiResponse>(requestUrl, {headers});
  }

  private command(command: string, params): Observable<ApiResponse> {
    const requestUrl = `${this.endpoint}/api/commands/${command}`;
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    if ( this.username && this.password ) {
      const encodedAuth = btoa(`${this.username}:${this.password}`);
      headers = headers.set('Authorization', `Basic ${encodedAuth}`);
    }
    return this.http.post<ApiResponse>(requestUrl, params, {headers});
  }

  getNodes(): Observable<ApiResponse> {
    return this.request('nodes');
  }

  getHooks(): Observable<ApiResponse> {
    return this.request('hooks');
  }

  getPolicies(): Observable<ApiResponse> {
    return this.request('policies');
  }

  getTags(): Observable<ApiResponse> {
    return this.request('tags');
  }

  getTasks(): Observable<ApiResponse> {
    return this.request('tasks');
  }

  getEvents(): Observable<ApiResponse> {
    return this.request('events');
  }

  getRepos(): Observable<ApiResponse> {
    return this.request('repos');
  }

  getCommands(): Observable<ApiResponse> {
    return this.request('commands');
  }

  getConfiguration(): Observable<ApiResponse> {
    return this.request('config');
  }

  getNode(id: string): Observable<any> {
    return this.request(`nodes/${id}`);
  }

  getNodeLogs(id: string): Observable<ApiResponse> {
    return this.request(`nodes/${id}/log`);
  }

  reinstallNode(id: string, keepPolicy: boolean) {
    return this.command('reinstall-node', {
      name: id,
      same_policy: keepPolicy,
    }).pipe(
      // Refresh view on success
      tap(() => this.refreshAsync$.next(undefined)),
    );
  }

  modifyNodeMetadata(id: string, update: {string: any}, remove: string[]) {
    return this.command('modify-node-metadata', {
      node: id,
      update,
      remove,
    }).pipe(
      // Refresh view on success
      tap(() => this.refreshAsync$.next(undefined)),
    );
  }
}
