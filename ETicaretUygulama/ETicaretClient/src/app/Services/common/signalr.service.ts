import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _conntection : HubConnection;

  get conntection():HubConnection{
    return this._conntection;
  }

  start(hubUrl:string){//başlatılmış bir hub verecek
    if(!this.conntection || this._conntection.state==HubConnectionState.Disconnected){
      
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
        this._conntection = hubConnetion;
    }

    this._conntection.onreconnected(conntectionId=>console.log("reconnected"));//eğer kopan bağlantı yeniden sağlanırsa durum yönetimi yapabiliriz
    this._conntection.onreconnecting(err=>console.log("reconneting"))//kopan bağlantının tekrardan sağlanma sürecinde olduğunu söylüyor
    this._conntection.onclose(err=> console.log("close reconnetion"))//kopan bağlantı tekrar bağlanmaya çalışırken bağlanamadığında ortaya çıkan durum yönetimi
  }

  invoke(procedureName:string, message:any, successCallBack?:(value)=>void, errorCallBack?:(err)=>void){//event fırlatma mesajı yollama gibi
    this.conntection.invoke(procedureName,message)
      .then(successCallBack)
      .catch(errorCallBack);
  }
  
  on(procedureName:string, callBack:(...message)=>void){//alıcı fonksiyonlar. serverdan gelen veriler
    this.conntection.on(procedureName,callBack)
  }
}
