import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ApiResponse } from './models/apiresponse.model';

@Injectable({
  providedIn: 'root'
})
export class RazorapiService {
  private endpoint: string;
  private username: string;
  private password: string;
  private refresh: number;

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
  ) {
    this.endpoint = this.getSetting('endpoint', `${window.location.protocol}//${window.location.host}`);
    this.username = this.getSetting('username', '');
    this.password = this.getSetting('password', '');
    this.refresh = +this.getSetting('refresh', '15');
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
  ): void {
    console.log('RazorApiService connect');
    const headers = new HttpHeaders();
    if ( username && password ) {
      console.log('Authentication still not implemented');
    }
    this.endpoint = endpoint;
    this.username = username;
    this.password = password;
    this.refresh = refresh;
    this.setSetting('endpoint', endpoint);
    this.setSetting('username', username);
    this.setSetting('password', password);
    this.setSetting('refresh', refresh.toString());
    // return this.http.get(`{endpoint}/api`);
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
