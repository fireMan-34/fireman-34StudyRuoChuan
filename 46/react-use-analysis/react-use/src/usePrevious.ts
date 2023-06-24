import { useEffect, useRef } from 'react';

export default function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>();
  // 渲染后更新最新引用
  useEffect(() => {
    ref.current = state;
  });
  // 未变更前
  return ref.current;
}
