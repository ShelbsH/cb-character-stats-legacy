import React from 'react';
import { Layout } from 'antd';

export const RootView: React.SFC = ({ children }) => (
  <Layout.Content className="rootView">{children}</Layout.Content>
);
