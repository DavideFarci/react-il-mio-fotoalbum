import { useEffect, useState } from 'react';
import { fetchApi } from '../Utilities/fetchApi';
import Photo from '../components/photos/Photo';

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [searchStr, setSearchStr] = useState('');

  const getVisiblesPhotos = async () => {
    if (searchStr) {
      try {
        const _photos = await fetchApi(`/photo?searchStr=${searchStr}`);
        setPhotos(_photos);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const _photos = await fetchApi('/photo');
        setPhotos(_photos);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getVisiblesPhotos();
  }, []);

  return (
    <>
      <h2 className="py-8 text-center text-4xl font-bold">Sono la Home</h2>
      <div>
        <h3>Filtra per titiolo</h3>
        <input
          type="text"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          className="rounded-md p-1 text-black shadow-md"
        />
        <button
          onClick={getVisiblesPhotos}
          className="bg-red-700 px-4 py-2 duration-150 hover:bg-red-600"
        >
          Filtra
        </button>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4">
          {photos?.map((photo) => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
