import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl : string) { }


  start(hubUrl:string){//başlatılmış bir hub verecek
    hubUrl = this.baseSignalRUrl + hubUrl
    // if(!this.conntection || this._conntection.state==HubConnectionState.Disconnected){
      
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      
      const hubConnetion : HubConnection = builder.withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();
        
      hubConnetion.start()
        .then(()=> console.log("Connect"))
        .catch((err)=>{
          setTimeout(() => {
            this.start(hubUrl)
          }, 2000);
        })
    // }

    hubConnetion.onreconnected(conntectionId=>console.log("reconnected"));//eğer kopan bağlantı yeniden sağlanırsa durum yönetimi yapabiliriz
    hubConnetion.onreconnecting(err=>console.log("reconneting"))//kopan bağlantının tekrardan sağlanma sürecinde olduğunu söylüyor
    hubConnetion.onclose(err=> console.log("close reconnetion"))//kopan bağlantı tekrar bağlanmaya çalışırken bağlanamadığında ortaya çıkan durum yönetimi
    return hubConnetion
  }

  invoke(hubUrl:string ,procedureName:string, message:any, successCallBack?:(value)=>void, errorCallBack?:(err)=>void){//event fırlatma mesajı yollama gibi
    this.start(hubUrl).invoke(procedureName,message)
      .then(successCallBack)
      .catch(errorCallBack);
  }
  
  on(hubUrl:string ,procedureName:string, callBack:(...message)=>void){//alıcı fonksiyonlar. serverdan gelen veriler
    this.start(hubUrl).on(procedureName,callBack)
  }
}
