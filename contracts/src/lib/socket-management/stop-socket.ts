export namespace StopSocket {
  export const topic = 'socket.stop-socket.query';

  export class Request {
    proxyToAbonentProjectId: string;
  }

  export class Response {}
}
