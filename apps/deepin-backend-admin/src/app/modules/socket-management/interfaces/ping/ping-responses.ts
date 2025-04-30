export interface PingInterface {
  data: {
    uid: string;
    name: string;
    email: string;
  };
}

export interface PingResponse {
  code: number;
  success: boolean;
  msg: string;
  data: {
    score: number;
    interval: number;
  };
}
