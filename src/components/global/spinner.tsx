import { Loader } from 'lucide-react';
import React from 'react';

type Props = {
  size?: number;
};

const Spinner = ({ size = 18 }: Props) => {
  return <Loader size={size} className='animate-spin' />;
};

export default Spinner;
