import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit() {
    console.log(`socket init`);
  }

  handleConnection(client: WebSocket, ..._args: any[]) {
    console.log(`Client connected`);
  }

  handleDisconnect(client: WebSocket) {
    console.log(`Client disconnected`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, _client: WebSocket): void {
    console.log('Message received:', data);
    this.server.emit('message', data); // Broadcast message to all clients
  }
}
