import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  api_url='https://conduit.productionready.io/api/';
  
  constructor(private http:HttpClient) { }
  headers:HttpHeaders;
  getToken(){
    this.headers=new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`

    })
  }
  getData(endpoint,params={}):Observable<any>{
    return this.http.get(this.api_url+endpoint,{
      params:params,
      headers:this.headers

    })
  }
  postData(endpoint,postData={}):Observable<any>{
    return this.http.post(this.api_url+endpoint,postData,{
      headers:this.headers
    })
  }
  putData(endpoint,dataUpdate={}):Observable<any>{
    return this.http.put(this.api_url+endpoint,dataUpdate,{
      headers:this.headers
    })
  }

  deleteData(endpoint):Observable<any>{
    return this.http.delete(this.api_url+endpoint,{
      headers:this.headers
    })

  }


}
