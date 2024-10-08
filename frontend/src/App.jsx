import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';

function App() {
  return (
    <ChakraProvider>
      <ColorModeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;