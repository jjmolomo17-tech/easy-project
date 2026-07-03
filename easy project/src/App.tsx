import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowsePage } from "./pages/BrowsePage";
import { ItemDetailPage } from "./pages/ItemDetailPage";
import { BookingPage } from "./pages/BookingPage";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/items/:itemId" element={<ItemDetailPage />} />
        <Route path="/items/:itemId/book" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}