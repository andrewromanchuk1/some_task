import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList/ProductList';
import ProductView from './pages/ProductView/ProductView';
import NavigationButtons from './components/NavigationButtons/NavigationButtons';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Header />
      <NavigationButtons />
      <Container>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/view" element={<ProductView />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
