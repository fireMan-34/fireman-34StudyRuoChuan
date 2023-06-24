import { useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';
import { off, on } from './misc/util';

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60e3;

const useIdle = (
  ms: number = oneMinute,
  initialState: boolean = false,
  events: string[] = defaultEvents
): boolean => {
  const [state, setState] = useState<boolean>(initialState);

  useEffect(() => {
    /** 挂载标识符， 避免卸载后异步的函数继续执行逻辑 */
    let mounted = true;
    let timeout: any;
    let localState: boolean = state;
    const set = (newState: boolean) => {
      if (mounted) {
        localState = newState;
        setState(newState);
      }
    };

    // 防抖避免函数高频创建异步函数
    const onEvent = throttle(50, () => {
      if (localState) {
        set(false);
      }

      clearTimeout(timeout);
      // 无限轮询直到当前操作激活清楚对应的 effect
      timeout = setTimeout(() => set(true), ms);
    });
    const onVisibility = () => {
      if (!document.hidden) {
        onEvent();
      }
    };

    for (let i = 0; i < events.length; i++) {
      on(window, events[i], onEvent);
    }
    on(document, 'visibilitychange', onVisibility);

    timeout = setTimeout(() => set(true), ms);

    return () => {
      mounted = false;

      for (let i = 0; i < events.length; i++) {
        off(window, events[i], onEvent);
      }
      off(document, 'visibilitychange', onVisibility);
    };
  }, [ms, events]);

  return state;
};

export default useIdle;
