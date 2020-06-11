import React from 'react';

const ErrorBox = ({ error }) => {
  if (!error) return null;

  return (
    <>
      <div className='alert alert-danger' role='alert'>
        {error.message}
      </div>
    </>
  );
};

export default ErrorBox;
