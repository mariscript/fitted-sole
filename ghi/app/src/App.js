import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList';
import BinForm from './BinForm';
import HatsForm from './HatsForm';
import HatsList from './HatsList';
import LocationForm from './LocationForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage/>} />
          <Route path="/" element={<MainPage />} />
          <Route path="/hats" element={<HatsList />} />
          <Route path="/hats/new" element={<HatsForm />} />
          <Route path="/shoes" element={<ShoeList />} />
          <Route path="/shoes/new" element={<ShoeForm />} />
          <Route path="/bins" element={<BinForm />} />
          <Route path="/locations" element={<LocationForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
