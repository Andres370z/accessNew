import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  private api = environment.api
  private apiLocal = environment.apiLocal
  constructor( 
    private http: HttpClient) { }
    public headers=new HttpHeaders().set('Content-Type','multipart/form-data');
    POST =async (sub: string, obj: any) => await this.http.post<any>(this.api + sub , obj).toPromise();
    POSTS =async (sub: string, obj: any,dat:object,) => await this.http.post<any>(this.apiLocal + sub , obj, dat).toPromise();
    POSTDATA =async (sub: string, obj: any) => await this.http.post<any>(this.api + sub , obj, {headers: this.headers}).toPromise();
    GET = async (sub: string) => await this.http.get<any>(this.api + sub).toPromise();
    GETER = async (sub: string, obj: any) => await this.http.get<any>(this.apiLocal + sub, obj).toPromise();
    PUT = async (sub: string,obj:any) => await this.http.put<any>(this.api + sub, obj).toPromise();
    DELETE = async(sub: string) => await this.http.delete<any>(this.api + sub).toPromise();
}
