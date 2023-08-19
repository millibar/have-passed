import { useState, useEffect } from 'react';

import { Header } from './components/Header';

const createTask = () => {};

export const App = () => {
  return (
    <>
      <Header createTask={createTask} />
    </>
  );
};
