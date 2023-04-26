import ImageGrid from "@/components/ImageGrid";
import { useCallback, useEffect, useState } from "react";
import { ImageType } from "../../image";
import axios from "axios";
import Dropzone from "@/components/Dropzone";
import styled from "styled-components";

const HomeStyled = styled.div`
  margin-block: 2rem;
  & .text-center {
    text-align: center;
  }
`;

const getImages = async () => {
  return await axios.get<ImageType[]>("/images.json").then((res) => res.data);
};

const Home = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  useEffect(() => {
    if (localStorage.getItem("images")) {
      setImages(
        JSON.parse(localStorage.getItem("images") || "[]") as ImageType[]
      );
    } else {
      getImages().then((imageData) => {
        imageData.reverse();
        setImages(imageData);
        localStorage.setItem("images", JSON.stringify(imageData));
      });
    }
  }, []);
  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = {
          id: JSON.parse(localStorage.getItem("images") || "[]").length + 1,
          img: e?.target?.result as string | undefined,
          desc: file.name,
        };
        localStorage.setItem(
          "images",
          JSON.stringify([
            image,
            ...JSON.parse(localStorage.getItem("images") || "[]"),
          ])
        );
        setImages((prevState) => [image, ...prevState]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
  return (
    <HomeStyled className="container">
      <h1 className="text-center">Image Gallery</h1>
      <Dropzone onDrop={onDrop} />
      <ImageGrid images={images} />
    </HomeStyled>
  );
};

export default Home;
