import { Inject, Injectable } from '@angular/core';
import { RequestParameters } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {

  constructor(@Inject("baseUrl") private baseUrl:string) { }

  generateUploadImageUrl(requestParameters:Partial<RequestParameters>):string{
    let url:string;
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
      url=`${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}${requestParameters.queryString?`?${requestParameters.queryString}`:""}`
    return url
  }
}
