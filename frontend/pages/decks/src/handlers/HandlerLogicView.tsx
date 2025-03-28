/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface HandlerLogicViewProps {
  Logic: React.ComponentType<any>;
  View: React.ComponentType<any>;
}

const HandlerLogicView: React.FC<HandlerLogicViewProps> = ({ Logic, View }) => {
  return (
    <Logic>
      {(handler: any) => <View {...handler} />}
    </Logic>
  );
};

export default HandlerLogicView;
