<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mt-10 d-flex align-center justify-center ">
        <v-img class="mr-3" max-width="21" max-height="30" src="@/assets/fake/fire.png"></v-img>
        <span class="text-h4">Most Bids</span>
      </v-col>
      <v-col>
        <v-card max-width="1260" min-height="454" class="ma-auto">

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ActiveUsers",
  props: [
      'users'
  ],
  data: () => ({

  })
}
</script>

<style scoped>

</style>
