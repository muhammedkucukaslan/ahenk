import React from 'react';
import { Button } from '../ui/button';
import { ButtonProps } from '../ui/button';

interface Props extends ButtonProps {
  loading?: boolean;
}

const SubmitButton = ({ loading }: Props) => {
  return <Button>SubmitButton</Button>;
};

export default SubmitButton;
