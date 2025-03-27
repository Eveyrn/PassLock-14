import { create } from 'zustand';
import '../components/Css/PasswordInput.css';
import Button from './Button';
import { Box, Typography, Paper } from '@mui/material';

interface PasswordStore {
  password: string;
  passwordCorrect: string;
  handleCheck: () => void;
  handleAdd: (char: string) => void;
  handleRemove: () => void;
  isAccessGranted: boolean;
}

const usePasswordStore = create<PasswordStore>((set) => ({
  password: '',
  passwordCorrect: '3007', 
  isAccessGranted: false,
  handleCheck: () => set((state) => {
    const isCorrect = state.password === state.passwordCorrect;
    return {
      isAccessGranted: isCorrect,
      password: '', 
    };
  }),
  handleAdd: (char) => set((state) => {
    if (state.password.length < 4) {
      return { password: state.password + char };
    }
    return state;
  }),
  handleRemove: () => set((state) => {
    return { password: state.password.slice(0, -1) };
  }),
}));

const PasswordInput = () => {
  const { password, handleAdd, handleRemove, handleCheck, isAccessGranted } = usePasswordStore();
  const maskedPassword = '*'.repeat(password.length);

  return (
    <Box className="password-container">
      <Paper elevation={3} className={`password-display ${isAccessGranted ? 'success' : password ? 'error' : 'default'}`}>
        <Typography variant="h6">
          {maskedPassword || '****'}
        </Typography>
      </Paper>

      <Box className="button-container">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((label) => (
          <Button key={label} onClick={() => handleAdd(label)} label={label} />
        ))}
        
        <Button onClick={handleRemove} label="←" className="special-button" />
        <Button onClick={() => handleAdd('0')} label="0" />
        <Button onClick={handleCheck} label="E" className="special-button" />
      </Box>

      <Typography variant="body1" className={`status-text ${isAccessGranted ? 'success' : 'error'}`}>
        {isAccessGranted === null ? '' : isAccessGranted ? 'Доступ разрешен' : 'Доступ запрещен!'}
      </Typography>
    </Box>
  );
};

export default PasswordInput;

