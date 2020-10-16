import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject, timer, interval, merge } from 'rxjs';
import { takeWhile, takeUntil, startWith, switchMap } from 'rxjs/operators';
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
  private refreshTimer$;
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
    this.refreshTimer$ = interval(this.refresh * 1000).pipe(
      startWith(0)
    );
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
    this.storage.set(key, value);
  }

  connect(
    endpoint: string,
    username: string,
    password: string,
    refresh: number,
    refreshEnabled: boolean,
  ): void {
    console.log('RazorApiService connect');
    const headers = new HttpHeaders();
    let reload = false;
    if ( username && password ) {
      console.log('Authentication still not implemented');
    }
    if (this.endpoint !== endpoint || this.refresh !== refresh || !this.refreshEnabled && refreshEnabled) {
      reload = true;
    }
    this.endpoint = endpoint;
    this.username = username;
    this.password = password;
    this.refresh = refresh;
    this.refreshEnabled = refreshEnabled;
    this.setSetting('endpoint', endpoint);
    this.setSetting('username', username);
    this.setSetting('password', password);
    this.setSetting('refresh', refresh.toString());
    this.setSetting('refreshEnabled', refreshEnabled.toString());

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
    return this.http.get<ApiResponse>(requestUrl);
  }

  private command(command: string, params): Observable<ApiResponse> {
    const requestUrl = `${this.endpoint}/api/commands/${command}`;
    return this.http.post<ApiResponse>(requestUrl, params, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    });
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
    });
  }
}
