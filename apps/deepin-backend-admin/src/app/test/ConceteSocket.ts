import { Socket } from './Socket';

export class ConcreteSocket extends Socket {
  private isCancel = false;

  constructor(private url: string, private delay: number) {
    super();
  }

  async ping() {
    if (this.isCancel) {
      return;
    }
    const res = await fetch(this.url);
    const data = await res.json();
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    await this.ping();
  }

  async stop() {
    this.isCancel = true;
  }

  start(): void {
    this.ping();
  }
}
