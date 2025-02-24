// components/TourCards.tsx
import React, { useState } from 'react';

const TourCards = ({ tours }: any) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [startTime, setStartTime] = useState([0, 24]);
  const [groupSize, setGroupSize] = useState([3, 100]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(selectedTheme === theme ? null : theme); // Toggle active state
  };

  const handleActivitySelect = (activity: string) => {
    setSelectedActivity(selectedActivity === activity ? null : activity); // Toggle active state
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([+e.target.value, priceRange[1]]);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime([+e.target.value, startTime[1]]);
  };

  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupSize([+e.target.value, groupSize[1]]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTours = tours.filter((tour: any) => {
    const matchesTheme = selectedTheme ? tour.theme === selectedTheme : true;
    const matchesActivity = selectedActivity ? tour.activity === selectedActivity : true;
    const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];
    const matchesStartTime = tour.startTime >= startTime[0] && tour.startTime <= startTime[1];
    const matchesGroupSize = tour.groupSize >= groupSize[0] && tour.groupSize <= groupSize[1];
    const matchesSearchTerm = tour.name.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesTheme &&
      matchesActivity &&
      matchesPrice &&
      matchesStartTime &&
      matchesGroupSize &&
      matchesSearchTerm
    );
  });

  return (
    <div className="tour-container flex sm:flex-row flex-col">
      <div className="search-filter-container ">

        <div className="filters-card w-full ">
          <div className="search-bar mb-4">
            <input
              type="text"
              placeholder="Search by tour name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="filter mb-4">
            <h3 style={{ color: '#F2A945' }}>Theme</h3>
            <div className="buttons space-x-2">
              <button
                className={`filter-button ${selectedTheme === 'Land Tour' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-800'} p-2 rounded-md`}
                onClick={() => handleThemeSelect('Land Tour')}
              >
                Land Tour
              </button>
              <button
                className={`filter-button ${selectedTheme === 'Safari' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-800'} p-2 rounded-md`}
                onClick={() => handleThemeSelect('Safari')}
              >
                Safari
              </button>
            </div>
          </div>

          <div className="filter mb-4">
            <h3 style={{ color: '#F2A945' }}>Activity</h3>
            <div className="buttons space-x-2">
              <button
                className={`filter-button ${selectedActivity === 'Swimming' ? 'bg-yellow-500 text-white active' : 'bg-white text-gray-800'} `}
                onClick={() => handleActivitySelect('Swimming')}
              >
                Swimming
              </button>
              <button
                className={`filter-button ${selectedActivity === 'Running' ? ' active' : 'bg-white text-gray-800'} `}
                onClick={() => handleActivitySelect('Running')}
              >
                Running
              </button>
              <button
                className={`filter-button ${selectedActivity === 'Elephant Care' ? 'active' : 'bg-white text-gray-800'} `}
                onClick={() => handleActivitySelect('Elephant Care')}
              >
                Elephant Care
              </button>
              <button
                className={`filter-button ${selectedActivity === 'Snorkelling' ? 'active' : 'bg-white text-gray-800'} `}
                onClick={() => handleActivitySelect('Snorkelling')}
              >
                Snorkelling
              </button>
            </div>
          </div>

          <div className="filter mb-4">
            <h3 style={{ color: '#F2A945' }}>Price & Start Time</h3>
            <div className="slider mb-4">
              <input
                type="range"
                min="0"
                max="300000"
                value={priceRange[0]}
                onChange={handlePriceChange}
                className="price-slider w-full"
              />
              <div className="range-labels flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="slider mb-4">
              <input
                type="range"
                min="0"
                max="24"
                value={startTime[0]}
                onChange={handleStartTimeChange}
                className="start-time-slider w-full"
              />
              <div className="range-labels flex justify-between">
                <span>{startTime[0]}:00</span>
                <span>{startTime[1]}:00</span>
              </div>
            </div>
          </div>

          <div className="filter mb-4">
            <h3 style={{ color: '#F2A945' }}>Group Size</h3>
            <div className="slider">
              <input
                type="range"
                min="3"
                max="100"
                value={groupSize[0]}
                onChange={handleGroupSizeChange}
                className="group-size-slider w-full"
              />
              <div className="range-labels flex justify-between">
                <span>{groupSize[0]} people</span>
                <span>{groupSize[1]} people</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tour-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map((tour: any) => (
          <div key={tour.id} className="tour-card bg-white shadow-lg mt-8 rounded-lg p-4">
            <img src={tour.image} alt={tour.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-xl font-bold mt-4">{tour.name}</h3>
            <p>{tour.description}</p>

            <div className="tour-details mt-4">
              <p><strong>Theme:</strong> {tour.theme}</p>
              <p><strong>Activity:</strong> {tour.activity}</p>
              <p><strong>Price:</strong> ${tour.price}</p>
              <p><strong>Group Size:</strong> {tour.groupSize} people</p>
              <p><strong>Start Time:</strong> {tour.startTime}:00</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCards;
