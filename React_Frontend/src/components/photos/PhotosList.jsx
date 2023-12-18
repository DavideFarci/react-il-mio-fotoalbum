import { useState } from 'react';
import { useEffect } from 'react';
import PhotoCreateOverlay from './PhotoCreateOverlay';
import FapButton from './FapButton';
import Photo from './Photo';
import axios from 'axios';
import { fetchApi } from '../../utilities/fetchApi';
import Show from '../../pages/Photo/Show';

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
  const [showFullImg, setShowFullImg] = useState(false);
  const [isNew, setIsNew] = useState(true);

  async function getPhotos() {
    try {
      const resp = await fetchApi('/admin/photo');
      setPhotos(resp.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSelectedPhoto = (photo) => {
    setIsNew(false);
    setPhotoSelected(photo);
    setShow(true);
  };

  const showFullImage = (photo) => {
    setPhotoSelected(photo);
    setShowFullImg(true);
  };

  const deletePhoto = async (id) => {
    try {
      await fetchApi(`/admin/photo/${id}`, 'DELETE');
    } catch (error) {
      console.log(error.message);
    }

    getPhotos();
  };

  const handleClosing = () => {
    setIsNew(true);
    setShow(false);
    setPhotoSelected(initialData);
  };

  const closeShow = () => {
    setShowFullImg(false);
    setPhotoSelected(initialData);
  };

  const savePhoto = async (payload) => {
    console.log(payload);
    if (isNew) {
      await axios.post('http://localhost:5174/admin/photo', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } else {
      // await axios.put(`http://localhost:5174/photo/${payload.slug}`, payload);
      await axios.put(
        `http://localhost:5174/admin/photo/${photoSelected.id}`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
    }

    getPhotos();
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="ml-12 py-8 text-4xl font-bold">Le tue foto</h2>
      <div className="grid grid-cols-1">
        {photo.map((photo) => (
          <Photo
            onSelectedPhoto={handleSelectedPhoto}
            onDeletePhoto={deletePhoto}
            showFullImg={showFullImage}
            key={photo.id}
            photo={photo}
          />
        ))}
      </div>
      <FapButton openOverlay={() => setShow(true)} />
      <PhotoCreateOverlay
        onClosing={handleClosing}
        show={show}
        photoToEdit={photoSelected}
        onSave={savePhoto}
        isNew={isNew}
      />
      <Show onClosing={closeShow} show={showFullImg} photo={photoSelected} />
    </div>
  );
};

export default PhotosList;
