import React from 'react';
import { Button } from '../ui/button';
import { ButtonProps } from '../ui/button';
import Spinner from './spinner';

interface Props extends ButtonProps {
  loading?: boolean;
}

const SubmitButton = ({ loading, children, ...props }: Props) => {
  return (
    <Button type='submit' disabled={loading} {...props}>
      {loading && <Spinner />}
      {children}
    </Button>
  );
};

export default SubmitButton;
