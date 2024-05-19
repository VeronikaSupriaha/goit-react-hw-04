import { useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import { getImages } from '../../images-api';
import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';
import { Hearts } from 'react-loader-spinner';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getImages(searchQuery, currentPage);
        setImages(prevState => [...prevState, ...data]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [currentPage, searchQuery]);

  const handleSearch = async topic => {
    setSearchQuery(topic);
    setCurrentPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => {
    setCurrentPage(currentPage + 1);
  };

  const openModal = image => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Toaster
        containerStyle={{
          top: 50,
          left: 20,
          bottom: 20,
          right: 20,
        }}
      ></Toaster>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {isError && <ErrorMessage></ErrorMessage>}
      {isLoading && (
        <>
          <p className={css.loadingError}>Images are loading, please wait...</p>
          <div>
            {' '}
            <Hearts
              height="80"
              width="80"
              color="#717fbf"
              ariaLabel="hearts-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </>
      )}
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openModal}></ImageGallery>
      )}
      {images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore}></LoadMoreBtn>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={currentImage}
      ></ImageModal>
    </div>
  );
}
