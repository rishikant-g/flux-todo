import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './Loader';

const LoaderPortal: React.FC = () => {
  return ReactDOM.createPortal(<Loader />, document.body);
};

export default LoaderPortal;
