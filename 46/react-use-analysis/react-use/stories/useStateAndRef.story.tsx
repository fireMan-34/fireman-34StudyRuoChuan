import React, { useCallback, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import ShowDocs from './util/ShowDocs';
import useStateAndRef from '../src/useStateAndRef';

const Demo = () => {
  const { innerValue, setValueWithRef, valueRef } = useStateAndRef({ initValue: '初始值' });

  const printValue = useCallback(() => {
    console.log({
      innerValue,
      valueRef,
    });
  }, []);

  const changeValue = useCallback(() => {
    setValueWithRef(valueRef.current + `1`);
  }, []);

  useEffect(() => {
    console.log('值变更', innerValue);
  }, [innerValue]);

  return (
    <div>
      <p>自定义hook</p>
      <p>获取state 和 ref 对象</p>
      <br />
      <button onClick={printValue}>打印当前值，callback 仅初次初始化</button>
      <button onClick={changeValue}>添加值</button>
    </div>
  );
};

export default storiesOf('STATE/useStateAndRef', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useStateAndRef.md')} />)
  .add('Demo', () => <Demo />);
