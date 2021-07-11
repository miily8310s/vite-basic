import React, {useState, useEffect} from 'react';
import axios from "axios";

const RANDOM_DOGS_URL = 'https://dog.ceo/api/breeds/image/random';

const Dogs = (): JSX.Element => {
  
  const [dogImage, setDogImage] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const getBreed = (imageName: string) => {
    // https://images.dog.ceo/breeds/pug/xxxxx.jpg
    return imageName.match(/(?<=breeds\/)\w+/);
  }
  
  useEffect(() => {
    return () => {
      axios
        .get(RANDOM_DOGS_URL)
        .then((res) => {
          const {data} = res
          setDogImage(data.message)
          if (getBreed(dogImage) !== null) {
            setDogBreed(getBreed(dogImage));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, []);

  return (
    <main>
      <div className='dog'>
        <img src={dogImage} alt={dogBreed} />
        <p>{dogBreed || 'unknown dog breed' }</p>
      </div>
    </main>
  );
};

export default Dogs;
