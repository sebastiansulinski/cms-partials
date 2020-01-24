<template>
  <div id="app" class="flex flex-col w-full md:w-1/3 m-auto">
    <SaveOnInput
      action="http://localhost:3000/posts/1"
      method="patch"
      field="rating"
      v-model="rating"
      v-slot:default="{ call, processing, response }"
    >
      <div class="mb-3">
        <h1 class="text-lg mb-3 py-3 border-b border-solid border-gray-300">
          Change rating for <span class="font-semibold">{{ post.title }}</span>
        </h1>
        <div class="relative">
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            @change="call($event.target.value)"
            :disabled="processing"
          >
            <option value="">Please select rating</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
        <pre class="p-3 bg-gray-700 text-white rounded" v-text="response"></pre>
      </div>
    </SaveOnInput>
    <p class="p-3 bg-gray-700 text-white rounded" v-if="rating">
      You've selected {{ rating }}
    </p>
  </div>
</template>

<script>
import { SaveOnInput, AjaxCaller } from './wrapper.js'

export default {
  name: 'app',
  components: { SaveOnInput },
  mixins: [AjaxCaller],
  data() {
    return {
      post: {},
      rating: null
    }
  },
  created() {
    this.makeAjaxRequest(
      response => {
        this.post = response.data
      },
      error => {
        console.log(error)
      },
      {},
      'http://localhost:3000/posts/1',
      'get'
    )
  }
}
</script>

<style src="./assets/app.css" />
