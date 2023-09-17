import { Middleware } from 'redux';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { SocketOptions, tunnel } from '../../api/common';

interface WsConfig {
  init: ActionCreatorWithPayload<{ url: string; options: SocketOptions }>;
  close: ActionCreatorWithoutPayload;
}

export const socketMiddleware =
  ({ init, close }: WsConfig): Middleware =>
  () => {
    let socket: ReturnType<typeof tunnel> | null = null;
    return (next) => (action) => {
      switch (action.type) {
        case init.type:
          socket = tunnel(action.payload.url, action.payload.options);
          break;
        case close.type:
          socket && socket.close();
          socket = null;
          break;
        default: {
          next(action);
        }
      }
    };
  };
