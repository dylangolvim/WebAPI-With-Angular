import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './Company';

const HttpOptions = {
  headers: new HttpHeaders({

    'Content-Type': 'Application/json'
  })

};

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  url="http://localhost:1907/api/Companies"
  constructor(private http: HttpClient) { }

  GetCompanies() : Observable<Company[]>{
    return this.http.get<Company[]>(this.url);
  }

  GetCompanyById(companyId: number): Observable<Company>{
    const apiUrl = `${this.url}/${companyId}`;
    return this.http.get<Company>(apiUrl);
  }

  PostCompany(company: Company ): Observable<any>{
    return this.http.post<Company>(this.url, company, HttpOptions);
  } 

  PutCompany(company: Company ): Observable<any>{
    return this.http.put<Company>(this.url, company, HttpOptions);
  }

  DeleteCompany(companyId: number): Observable<Company>{
    const apiUrl = `${this.url}/${companyId}`;
    return this.http.delete<Company>(apiUrl, HttpOptions);
  }
}
