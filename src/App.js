import React, { useState, useEffect, useCallback } from 'react';
import Loader from 'react-loader-spinner';

import Layout from './components/Layout';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import pixabayApi from './services/pixabay-api';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (searchQuery !== '') {
      fetchImages();
    }
  }, [searchQuery]);

  const fetchImages = () => {
    setIsLoading(true);
    pixabayApi
      .fetchPics({ searchQuery, currentPage })
      .then(data => {
        if (!data.hits.length) {
          alert(`Please enter more correct query`);
          return;
        }
        setImages([...data.hits]);
        setCurrentPage(currentPage + 1);
        setTotal(data.total);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setTotal(null);
    setError(null);
  };

  const onChangeUrl = url => {
    setLargeImageURL(url);
    toggleModal();
  };

  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

  return (
    <Layout>
      <Searchbar onSubmit={onChangeQuery} />
      {isLoading && (
        <Loader
          type="Puff"
          color="#3f51b5"
          height={80}
          width={80}
          timeout={3000}
        />
      )}
      <ImageGallery images={images} onClick={onChangeUrl} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      {images.length > 0 && images.length < total && (
        <Button onClick={fetchImages} />
      )}
    </Layout>
  );
}
