import { useState } from "react";
import styled from "styled-components";
import { ImageType } from "../../image";
import Carousel from "./Carousel";
import { GrClose } from "react-icons/gr";

const ImgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-block: 1rem;
  & .img-wrap {
    overflow: hidden;
    height: 0;
    padding: 50% 0;
    position: relative;
    border-radius: 0.5rem;
    cursor: pointer;
    & img {
      min-width: 100%;
      min-height: 100%;
      max-width: 150%;
      position: absolute;
      top: 0;
      left: 0;
      transition: 0.25s;
      object-fit: cover;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  & .carousel-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    & .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 101;
      font-size: 1rem;
      padding: 0.75rem;
      background-color: rgb(var(--light-color), 0.75);
      box-shadow: 0 0 0 1px rgb(var(--light-color), 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }
  }
`;

const ImageGrid = ({ images }: { images: ImageType[] }) => {
  const [showCarousel, setShowCarousel] = useState({ show: false, id: 0 });
  // implement lightbox here
  const handleImageClick = (id: number, images: ImageType[]) => {
    setShowCarousel((prev) => ({ show: !prev.show, id: id }));
  };
  return (
    <ImgGrid className="img-grid">
      {showCarousel.show && (
        <div className="carousel-container">
          <button
            className="close-btn"
            onClick={() => setShowCarousel((prev) => ({ show: false, id: 0 }))}
          >
            <GrClose />
          </button>
          <Carousel slideId={images.length - showCarousel.id} images={images}>
            {images.map((image) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={image.id} src={image.img} alt={image.desc} />
            ))}
          </Carousel>
        </div>
      )}
      {images.map((image) => (
        <div className="img-wrap" key={image.id}>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.img}
              alt={image.desc}
              onClick={() => handleImageClick(image.id, images)}
            />
          }
        </div>
      ))}
    </ImgGrid>
  );
};

export default ImageGrid;
