import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SocketService {
  private activeRequests: Map<number, { cancel: () => void }> = new Map();

  public start(id: number) {
    if (this.activeRequests.has(id)) return;

    let isCancelled = false;
    const controller = {
      cancel: () => {
        isCancelled = true;
        this.activeRequests.delete(id);
      },
    };

    this.activeRequests.set(id, controller);

    const makeRequest = () => {
      if (isCancelled) return;
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts/${
            Math.floor(Math.random() * 10) + 1
          }`
        )
        .then(({ data }) => {
          console.log(`Request ${id} success:`, data);
          return new Promise((resolve) => setTimeout(resolve, 4000));
        })
        .then(makeRequest)
        .catch((error) => {
          console.error(`Request ${id} failed:`, error.message);
          return new Promise((resolve) => setTimeout(resolve, 1000));
        })
        .then(makeRequest);
    };

    makeRequest();
  }

  public stop(id: number) {
    const controller = this.activeRequests.get(id);
    if (controller) {
      controller.cancel();
      console.log(`Stopped requests for id ${id}`);
    }
  }
}
