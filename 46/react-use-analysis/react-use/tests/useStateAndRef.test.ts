import { useCallback, useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useStateAndRef, { UPDATE_TIME } from '../src/useStateAndRef';

it('在内置状态应该得到的是最新的值', () => {
  const { result: StateAndRefResult } = renderHook(() => useStateAndRef({ initValue: 0 }));
  const { result: getCurrentValueResult } = renderHook(() =>
    useCallback(() => StateAndRefResult.current.valueRef.current, [])
  );
  // 获取当前的上下文
  expect(getCurrentValueResult.current()).toBe(0);
  // 执行 setState 操作的函数，也可以在这个地方获取设置时的上下文
  act(() => StateAndRefResult.current.setValueWithRef((value) => value + 1));
  expect(StateAndRefResult.current.valueRef.current).toBe(1);
  expect(getCurrentValueResult.current()).toBe(1);
  act(() => StateAndRefResult.current.setValueWithRef(StateAndRefResult.current.innerValue + 1));
  expect(StateAndRefResult.current.valueRef.current).toBe(2);
  expect(getCurrentValueResult.current()).toBe(2);
});

it('在托管状态应该得到最新的值', () => {
  const { result: stateResult } = renderHook(() => useState(0));
  const { result: StateAndRefResult } = renderHook(() =>
    useStateAndRef({
      initValue: stateResult.current[0],
      value: stateResult.current[0],
      setValue: stateResult.current[1],
    })
  );

  act(() => StateAndRefResult.current.setValueWithRef(stateResult.current[0] + 1));
  expect(StateAndRefResult.current.valueRef.current).toBe(1);
});

it('在effect状态设置后还是当前值，但响应后是最新的值', () => {
  const { result: StateAndRefResult } = renderHook(() =>
    useStateAndRef({ initValue: 0, updateTime: UPDATE_TIME.EFFECT })
  );
  expect(StateAndRefResult.current.valueRef.current).toBe(0);
  act(() => {
    StateAndRefResult.current.setValueWithRef((value) => value + 1);
    expect(StateAndRefResult.current.valueRef.current).toBe(0);
  });
  expect(StateAndRefResult.current.valueRef.current).toBe(1);
});
