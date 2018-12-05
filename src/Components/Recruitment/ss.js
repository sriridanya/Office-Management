import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';
 
const Example = () => (
    <div className="my-app">
    <Manager>
      <Target style={{ width: 120, height: 120, background: '#b4da55' }}>
        Target Box
      </Target>
      <Popper placement="left" className="popper">
        Left Content
        <Arrow className="popper__arrow"/>
      </Popper>
      <Popper placement="right" className="popper">
        Right Content
        <Arrow className="popper__arrow"/>
      </Popper>
    </Manager>
  </div>
);

export default Example