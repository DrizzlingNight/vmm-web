<template>
  <v-container style="max-width: 1830px" class="mt-6">
    <v-row style="font-size: 28px" no-gutters>
      <span style="font-weight: bold">123</span><span class="owner d-inline-block ml-5">{{ $t("search.title") }}</span>
    </v-row>
    <v-tabs
        v-model="search"
        background-color="rgba(0,0,0,0)"
        class="mt-5"
        height="66px"
        color="rgba(255, 193, 7, 1)"
    >
      <v-tab style="width: 184px;font-size: 24px" class="font-weight-medium">
        NFT
      </v-tab>
      <v-tab style="width: 184px;font-size: 24px" class="font-weight-medium">
        {{$t("search.tabuser")}}
      </v-tab>
    </v-tabs>
    <v-divider class="mb-5" style="background: #424242;"></v-divider>
    <v-tabs-items v-model="search" style="background-color: rgba(0,0,0,0)">
      <v-tab-item>
        <search-n-f-t></search-n-f-t>
      </v-tab-item>
      <v-tab-item>
        <search-user></search-user>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import SearchNFT from "./SearchComps/SearchNFT";
import SearchUser from "./SearchComps/SearchUser";
export default {
  name: "search",
  components: {SearchUser, SearchNFT},
  data:() =>({
    search:0
  })
}
</script>

<style scoped>

</style>