import { FC, PropsWithChildren } from 'react';

const AppLoader: FC<PropsWithChildren> = ({ children }) => (
  <span className="text text_type_main-default">{children}</span>
);

export default AppLoader;
