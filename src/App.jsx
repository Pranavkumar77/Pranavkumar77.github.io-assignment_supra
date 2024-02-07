import React, { useState, useEffect, lazy, Suspense } from 'react';
import Button from '@mui/material/Button';
import './App.css';

const PhotoItem = lazy(() => import('./PhotoItem'));

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const[searchClicked, setSearchedClick] = useState(false);


  
  const fetchData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`);
      const data = await response.json();
      setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, [loading, page]);

  const handleSearch = () => {
    setPage(1);
    setPhotos([]);
    setLoading(true);
    setSearchedClick((prev) => !prev );
   
    fetchData();
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setLoading(true);
  };


  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search photos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outlined" className="button-style" onClick={handleSearch}>Search</Button>
      <ul className="photos-list">
        {searchClicked ? photos
          .filter((photo) => photo.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((photo, index) => (
            <Suspense key={`${photo.id}-${index}`} fallback={<p>Loading...</p>}>
              <PhotoItem photo={photo} />
            </Suspense>
          )): photos
          .map((photo, index) => (
            <Suspense key={`${photo.id}-${index}`} fallback={<p>Loading...</p>}>
              <PhotoItem photo={photo} />
            </Suspense>
          ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!loading && photos.length > 0 && (
        <Button variant="contained" className="button-style" onClick={handleLoadMore} disabled={loading}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default App;
