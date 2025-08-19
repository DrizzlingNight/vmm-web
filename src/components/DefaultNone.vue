<template>
  <v-row
      class="mx-auto mt-16"
      style="max-width: 612px"
  >
    <v-col class="d-flex justify-center">
      <v-img
          max-height="285"
          max-width="377"
          v-if="type==='networkErr'"
          src="@/assets/fake/networkErr.png"
      ></v-img>
      <v-img
          max-height="285"
          max-width="377"
          v-else-if="type==='getNothing'"
          src="@/assets/fake/getNothing.png"
      ></v-img>
      <v-img
          max-height="285"
          max-width="377"
          v-else
          src="@/assets/fake/defaultnull.png"
      ></v-img>
    </v-col>
    <v-col cols="12" class="text-center">
      <p v-if="type==='networkErr'"
         style="font-size: 32px;color: #959595">{{ $t('networkErr') }}</p>
      <p v-else-if="type==='getNothing'"
         style="font-size: 32px;color: #959595">{{ $t('getNothing') }}</p>
      <p v-else
         style="font-size: 32px;color: #959595">{{ $t('defaultNone') }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
name: "DefaultNone",
  props:[
      "type"
  ]
}
</script>

<style scoped>

</style>
