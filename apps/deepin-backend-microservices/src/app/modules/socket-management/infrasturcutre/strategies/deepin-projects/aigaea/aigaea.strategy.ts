import { Injectable } from '@nestjs/common';
import { BaseDeepinStrategy } from '../base-deepin.strategy';
import axios from 'axios';
import { PingInterface, PingResponse } from '../../../../interfaces/ping/ping-responses';



@Injectable()
export class AIGAEAStrategy extends BaseDeepinStrategy {
  private activeRequests: Map<string, { cancel: () => void }> = new Map();

  private config: {
    proxy: { port: number };
    browser_id: string;
    uid: string;
    token: string;
  } = {
    browser_id: `6be163cf-9d71-5187-abd5-06c4137153d0`,
    proxy: {
      port: 443,
    },
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxMDcyMDY0MDAxNjA3MCIsInVzZXJuYW1lIjoiQXJ0eW9tR3V5Ym92Iiwic2VjcmV0IjoiNTg0MzA4NTgiLCJleHBpcmUiOjE3NDYyMjExNTZ9.JgKZSusRpyhXXPH09-i_rXmKg75xGrUmhqhGGru7t2c`,
    uid: `10720640016070`,
  };

  constructor() {
    super();
  }

  public handleStart(id: string) {
    if (this.activeRequests.has(id)) return;

    let isCancelled = false;
    const controller = {
      cancel: () => {
        isCancelled = true;
        this.activeRequests.delete(id);
      },
    };

    this.activeRequests.set(id, controller);

    const makeRequestOld = () => {
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
        .then(makeRequestOld)
        .catch((error) => {
          console.error(`Request ${id} failed:`, error.message);
          return new Promise((resolve) => setTimeout(resolve, 1000));
        })
        .then(makeRequestOld);
    };

    const makeAuthRequest = () => {
      return axios.post<PingInterface>(
        'http://api.aigaea.net/api/auth/session',
        {},
        {
          headers: {
            Accept: 'application/json, text/plain, *!/!*',
            origin: 'chrome-extension://cpjicfogbgognnifjgmenmaldnmeeeib',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.config.token}`,
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
          },
        }
      );
    };

    const makePingRequest = () => {
      if (isCancelled) return;
      axios
        .post<PingResponse>(
          `https://api.aigaea.net/api/network/ping`,
          {
            timestamp: Math.floor(Date.now() / 1000),
            version: '1.0.1',
            uid: this.config.uid,
            browser_id: this.config.browser_id,
          },
          {
            headers: {
              Accept: 'application/json, text/plain, *!/!*',
              origin: 'chrome-extension://cpjicfogbgognnifjgmenmaldnmeeeib',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.config.token}`,
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
            },
          }
        )
        .then(({ data }) => {
          const { msg, code, success } = data;
          const { score, interval } = data.data;
          console.log(
            `Контекст: [${this.config.proxy.port}]: Сообщение: ${msg ?? ''}`,
            `Успех: [${success}] : Код : ${code}`
          );
          console.log(`Рейтинг: [${score}]`);
          console.log(`Интервал: [${interval}]`);
          return new Promise((resolve) => setTimeout(resolve, 4000));
        })
        .catch((error) => {
          console.error(`Request ${id} failed:`, error.message);
          return new Promise((resolve) => setTimeout(resolve, 1000));
        })
        .then(makePingRequest);
    };

    //makeRequest();
    makePingRequest();
  }

  public handleStop(id: string) {
    const controller = this.activeRequests.get(id);
    if (controller) {
      controller.cancel();
      console.log(`Stopped requests for id ${id}`);
    }
  }
}
