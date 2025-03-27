import React from 'react';

interface HandlerLogicViewProps {
  Logic: React.ComponentType<{ children: (handler: Record<string, unknown>) => React.ReactNode }>;
  View: React.ComponentType<Record<string, unknown>>;
}

const HandlerLogicView: React.FC<HandlerLogicViewProps> = ({ Logic, View }) => {
  return (
    <Logic>
      {(handler: Record<string, unknown>) => <View {...handler} />}
    </Logic>
  );
};

export default HandlerLogicView;
