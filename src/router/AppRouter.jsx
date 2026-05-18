import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Magazine from '../pages/Magazine';
import ArticleDetail from '../pages/ArticleDetail';
import Restaurants from '../pages/Restaurants';
import RestaurantDetail from '../pages/RestaurantDetail';
import WineClub from '../pages/WineClub';

export default function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/revista" element={<Magazine />} />
        <Route path="/revista/:slug" element={<ArticleDetail />} />
        <Route path="/restaurantes" element={<Restaurants />} />
        <Route path="/restaurantes/:slug" element={<RestaurantDetail />} />
        <Route path="/club" element={<WineClub />} />
      </Routes>
    </AnimatePresence>
  );
}
