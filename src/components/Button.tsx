import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;  
  style?: React.CSSProperties; 
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className, style }) => {
  return (
    <MuiButton
      onClick={onClick}
      variant="contained"
      color="primary"
      className={className}
      style={{ ...style, width: '60px', height: '60px', margin: '5px', fontSize: '20px', borderRadius: '10px' }} 
    >
      {label}
    </MuiButton>
  );
};

export default Button;
