import { useSelector } from 'react-redux';
import './App.css';
import { THEME_CONFIG } from './constants';
import Routes from './routes/Routes';

function App() {
  const theme = useSelector(state => state.theme);
  return (
    <div className={`app-body ${theme}`} style={{
      color: THEME_CONFIG[theme].primaryColor,
      backgroundColor: THEME_CONFIG[theme].secondaryColor,
    }}>
      <Routes />
    </div>
  );
}

export default App;
