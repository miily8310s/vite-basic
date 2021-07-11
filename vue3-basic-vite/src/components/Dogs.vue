<template>
  <main v-if="!loading">
    <img :src="dogImage">
    <p>{{ dogBreed || 'dog dog' }}</p>
  </main>
  <main v-else>
    Now Loding...
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import axios from "axios";

interface DogState {
  loading: boolean,
  dogImage: string
  dogBreed: string | null
}

const RANDOM_DOGS_URL = 'https://dog.ceo/api/breeds/image/random';

export default defineComponent({
  setup() {
    const state: DogState = reactive(
      {
        loading: true,
        dogImage: '',
        dogBreed: ''
      }
    )

    const getBreed = (imageName: string) => {
      // https://images.dog.ceo/breeds/pug/xxxxx.jpg
      return imageName.match(/(?<=breeds\/)\w+/)[0];
    }

    onMounted(
      async() => {
        axios
        .get(RANDOM_DOGS_URL)
        .then((res) => {
          const {data} = res
          state.dogImage = data.message
          if (getBreed(state.dogImage) !== null) {
            state.dogBreed = getBreed(state.dogImage);
          }
          state.loading = false
        })
        .catch((error) => {
          console.log(error);
        });
      }
    )

    return { state }
  }
})
</script>
