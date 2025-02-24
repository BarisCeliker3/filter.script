import { useState } from 'react';
import TourCards from './components/TourCards';
import Popup from './components/Popup';
import Navbar from './components/navbar';
import { useRoutes } from "react-router";

// Turların listesi
const allItems = [
  { id: 1, name: 'Tour 1', category: 'Tours', image: '/img/tayland1.jpg', description: 'A beautiful land tour.', theme: 'Land Tour', activity: 'Swimming', price: 50000, startTime: 10, groupSize: 5 },
  { id: 2, name: 'Safari 1', category: 'Tours', image: '/img/tayland2.jpg', description: 'Exciting safari.', theme: 'Safari', activity: 'Running', price: 200000, startTime: 15, groupSize: 8 },
  { id: 3, name: 'Car Rental', category: 'Rent', image: '/img/tayland3.jpg', description: 'Rent a luxury car.', theme: 'Car', activity: '', price: 300000, startTime: 9, groupSize: 4 },
  { id: 4, name: 'Airport Transfer', category: 'Transfer', image: '/img/tayland43.avif', description: 'Private airport transfer.', theme: 'VIP', activity: '', price: 100000, startTime: 6, groupSize: 3 },
];

const Home = () => {
  const location = useRouter();
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [selectedCategory, setSelectedCategory] = useState('Tours'); // Varsayılan kategori
  const [filters, setFilters] = useState({
    theme: '',
    activity: '',
    price: [0, 300000],
    startTime: [0, 24],
    groupSize: [1, 100],
    searchQuery: ''
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilters({
      theme: '',
      activity: '',
      price: [0, 300000],
      startTime: [0, 24],
      groupSize: [1, 100],
      searchQuery: ''
    });
  };

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleFilterApply = () => {
    const filtered = allItems.filter((item) => {
      return (
        item.category === selectedCategory && // Seçilen kategoriye göre filtrele
        (filters.theme ? item.theme === filters.theme : true) &&
        (filters.activity ? item.activity === filters.activity : true) &&
        (filters.price[0] <= item.price && item.price <= filters.price[1]) &&
        (filters.startTime[0] <= item.startTime && item.startTime <= filters.startTime[1]) &&
        (filters.groupSize[0] <= item.groupSize && item.groupSize <= filters.groupSize[1]) &&
        (item.name.toLowerCase().includes(filters.searchQuery.toLowerCase()))
      );
    });

    setFilteredItems(filtered);
    setIsPopupOpen(false);
  };

  return (
    
    <div className='back'>
      {/* Navbar */}
      <Navbar />
      <div className='Title'>
        <h1 className="m-0 text-4xl">{location.pathname === '/' ? 'Anasayfa' : 'Başka Sayfa'}</h1>



        {/* Kartlar */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, paddingLeft: '20px' }}>
            <TourCards tours={filteredItems} />
          </div>
        </div>

        {/* Popup */}
        {isPopupOpen && (
          <Popup onClose={() => setIsPopupOpen(false)}>
            <h2 className="text-xl font-bold mb-4">Kategori Seç</h2>
            <div className="flex gap-2 mb-4">
              {['Tours', 'Tickets', 'Rent', 'Transfer'].map((category) => (
                <button
                  key={category}
                  className={`p-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Seçilen kategoriye göre filtreler */}
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Home;
