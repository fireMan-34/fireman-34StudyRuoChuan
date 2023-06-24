import { useState, useEffect, useRef, useCallback } from 'react';
import type { SetStateAction, Dispatch } from 'react';

export enum UPDATE_TIME {
  SET,
  EFFECT,
}

interface Options<T> {
  updateTime?: UPDATE_TIME;
  initValue: T;
  value?: T;
  setValue?: Dispatch<SetStateAction<T>>;
}

const useStateAndRef = <T>(options: Options<T>) => {
  const { updateTime = UPDATE_TIME.SET, initValue, value, setValue } = options;
  const [innerValue, setInnerValue] = useState(value || initValue);
  const currentValue = value || innerValue;
  const valueRef = useRef<T>(currentValue);

  const setValueWithRef = useCallback(
    (value: SetStateAction<T>) => {
      const currentSetValue = setValue || setInnerValue;

      currentSetValue((preVal) => {
        let result: T;
        if (typeof value === 'function') {
          result = (value as any)(preVal);
        } else {
          result = value;
        }

        if (UPDATE_TIME.SET === updateTime) {
          valueRef.current = result;
        }

        return result;
      });
    },
    [currentValue, updateTime, setInnerValue, setValue]
  );

  useEffect(() => {
    if (UPDATE_TIME.EFFECT === updateTime) {
      valueRef.current = currentValue;
    }
  }, [currentValue]);

  return {
    innerValue,
    valueRef,
    setValueWithRef,
  };
};
export default useStateAndRef;

export { useStateAndRef };
