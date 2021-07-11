<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  let dogImage = ''
  let dogBreed = ''
  const RANDOM_DOGS_URL = 'https://dog.ceo/api/breeds/image/random';
  const getBreed = (imageName: string) => {
    // https://images.dog.ceo/breeds/pug/xxxxx.jpg
    return imageName.match(/(?<=breeds\/)\w+/);
  }
  const getDogImage = async() => {
    axios
      .get(RANDOM_DOGS_URL)
      .then((res) => {
        const {data} = res
        dogImage = data.message
        if (getBreed(dogImage) !== null) {
          dogBreed = getBreed(dogImage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onMount(getDogImage)
</script>

<main>
  <div class='dog'>
    <img src={dogImage} alt={dogBreed} />
    <p>{dogBreed || 'unknown dog breed' }</p>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    margin: 0;
    padding: 0;
    text-align: center;
  }
  
  img {
    width: 500px;
    height: 480px
  }
</style>
