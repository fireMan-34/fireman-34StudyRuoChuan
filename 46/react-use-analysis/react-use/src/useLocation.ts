import { useEffect, useState } from 'react';
import { isBrowser, off, on } from './misc/util';

/** 劫持 history 对象重新设置访问 */
const patchHistoryMethod = (method) => {
  /** 原对象 */
  const history = window.history;
  /** 保留原方法引用 */
  const original = history[method];

  history[method] = function (state) {
    const result = original.apply(this, arguments);
    /** 自定义对象 */
    const event = new Event(method.toLowerCase());
    /**  */
    (event as any).state = state;
    /** 自定义派发对象 */
    window.dispatchEvent(event);

    return result;
  };
};

if (isBrowser) {
  patchHistoryMethod('pushState');
  patchHistoryMethod('replaceState');
}

export interface LocationSensorState {
  trigger: string;
  state?: any;
  length?: number;
  hash?: string;
  host?: string;
  hostname?: string;
  href?: string;
  origin?: string;
  pathname?: string;
  port?: string;
  protocol?: string;
  search?: string;
}

const useLocationServer = (): LocationSensorState => ({
  trigger: 'load',
  length: 1,
});

const buildState = (trigger: string) => {
  const { state, length } = window.history;

  const { hash, host, hostname, href, origin, pathname, port, protocol, search } = window.location;

  return {
    trigger,
    state,
    length,
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search,
  };
};

const useLocationBrowser = (): LocationSensorState => {
  const [state, setState] = useState(buildState('load'));

  useEffect(() => {
    const onPopstate = () => setState(buildState('popstate'));
    const onPushstate = () => setState(buildState('pushstate'));
    const onReplacestate = () => setState(buildState('replacestate'));

    on(window, 'popstate', onPopstate);
    on(window, 'pushstate', onPushstate);
    on(window, 'replacestate', onReplacestate);

    return () => {
      off(window, 'popstate', onPopstate);
      off(window, 'pushstate', onPushstate);
      off(window, 'replacestate', onReplacestate);
    };
  }, []);

  return state;
};

const hasEventConstructor = typeof Event === 'function';

export default isBrowser && hasEventConstructor ? useLocationBrowser : useLocationServer;
