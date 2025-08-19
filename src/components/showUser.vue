<template>
  <v-card
      height="322px"
      width="345px"
      color="rgba(33, 33, 33, 1)" flat class="mb-3">
    <v-container class="pa-2">
      <v-row justify="center" no-gutters>
        <v-col cols="12" class="py-0 px-0">
          <v-img
              class="mx-auto"
              height="120px"
              width="328px"
              src="@/assets/fake/back.png"
              style="border-radius: 4px;"
          >
          </v-img>
        </v-col>
        <v-col cols="12" class="text-center pt-0 mt-n8">
          <v-avatar size="88">
            <v-img src="@/assets/fake/people.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" class="text-center">
          <div class="mt-1">
            <span style="font-size: 18px" class="font-weight-bold">123123</span>
          </div>
        </v-col>
        <v-col cols="12" class="text-center bottomFont mt-2">
          <v-avatar size="20" class="mt-n1 mr-1">
            <img src="@/assets/fake/price/ETH.png"/>
          </v-avatar>
          <span style="font-size: 18px;" class="font-weight-bold">12312356837963</span>
          <div style="line-height: 17px">123126433</div>
        </v-col>
        <v-col cols="12" class="bottomFont mt-3 d-flex align-center justify-center">
          <img width="17px" height="20px" class="mr-1" src="@/assets/fake/price/nft.png"/>
          <span style="font-size: 18px;" class="font-weight-bold">12</span><span class="ml-1">{{$t("search.unit")}}</span>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "showUser"
}
</script>

<style scoped>
.userimage {
  border: 3px solid white;
}

.bottomFont {
  color: rgba(114, 114, 114, 1);
}
</style>