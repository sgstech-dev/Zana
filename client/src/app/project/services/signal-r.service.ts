import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ConfigService } from './config.service';
import { HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private static connections: Map<string, signalR.HubConnection> = new Map<string, signalR.HubConnection>;

  constructor() { }
  public static startConnection(hubURL: string = "serverHub"): Promise<void> {
    let connection: signalR.HubConnection;
    if (!SignalRService.connections.has(hubURL)) {
      connection = new signalR.HubConnectionBuilder()
        .withUrl(ConfigService.apiBaseUrl + "/" + hubURL, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
        .withAutomaticReconnect()
        .build();
      this.connections.set(hubURL, connection);
      return connection.start();
    }
    else{
      connection = SignalRService.connections.get(hubURL);
    }
    if (connection.state === HubConnectionState.Connected) {
      // Connection is already established
      return Promise.resolve();
    }
    else if (connection.state === HubConnectionState.Disconnected) {
      connection
        .start()
        .then(() => {
          console.log('Connection started successfully');
          return Promise.resolve();
        })
        .catch(err => {
          console.error('Error while starting connection: ', err);
          return Promise.reject(new Error('Error while starting connection.'));
        });
    }
    else {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Unnkown Error!'));
  }

  public static getConnection(hubURL: string = "serverHub"): signalR.HubConnection {
    return SignalRService.connections.get(hubURL);
  }
}
