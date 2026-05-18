import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
        <Footer />
        <BottomNav />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
