import { useState } from 'react';
import { useEffect } from 'react';
import PhotoCreateOverlay from './PhotoCreateOverlay';
import FapButton from './FapButton';
import Photo from './Photo';
import axios from 'axios';

const initialData = {
  title: '',
  image: null,
  description: '',
  categories: [],
  visible: false,
};

const PhotosList = () => {
  const [photo, setPhotos] = useState([]);
  const [photoSelected, setPhotoSelected] = useState(initialData);
  const [show, setShow] = useState(false);
  const [isNew, setIsNew] = useState(true);

  async function getPhotos() {
    const data = await (await fetch('http://localhost:5174/photo')).json();
    setPhotos(data.data);
  }

  const handleSelectedPhoto = (photo) => {
    setIsNew(false);
    setPhotoSelected(photo);
    setShow(true);
  };

  const handleClosing = () => {
    setIsNew(true);
    setShow(false);
    setPhotoSelected(initialData);
  };

  const savePhoto = async (payload) => {
    console.log(payload);
    if (isNew) {
      await axios.post('http://localhost:5174/photo', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // await axios.put(`http://localhost:5174/photo/${payload.slug}`, payload);
      await axios.put(`http://localhost:5174/photo/${payload.id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    getPhotos();
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="py-8 text-center text-4xl font-bold">Photos List</h2>
      <div className="grid grid-cols-1 gap-4">
        {photo.map((photo) => (
          <Photo
            onSelectedPhoto={handleSelectedPhoto}
            key={photo.id}
            photo={photo}
          />
        ))}
      </div>
      <FapButton openOverlay={() => setShow(true)} />
      <PhotoCreateOverlay
        onClosing={handleClosing}
        show={show}
        PhotoToEdit={photoSelected}
        onSave={savePhoto}
        isNew={isNew}
      />
    </div>
  );
};

export default PhotosList;
