import { useEffect, useState } from 'react';
import { fetchApi } from '../Utilities/fetchApi';
import Photo from '../components/photos/Photo';

const Home = () => {
  const [photos, setPhotos] = useState([]);

  const getVisiblesPhotos = async () => {
    try {
      const _photos = await fetchApi('/photo');
      setPhotos(_photos.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getVisiblesPhotos();
  }, []);

  return (
    <>
      <h2 className="py-8 text-center text-4xl font-bold">Sono la Home</h2>
      <div>
        <div className="grid grid-cols-1 gap-4">
          {photos.map((photo) => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
