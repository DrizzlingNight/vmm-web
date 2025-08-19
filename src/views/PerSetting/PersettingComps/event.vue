<template>
  <v-row>
    <v-col>
      <v-icon x-small>mdi-{{ icon[eventId] }}</v-icon>
      <span class="ml-3 align-self-center tranfserNFT">{{ $t(`persetting.history.eventItem.${text[eventId]}`) }}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "event",
  props: [
    'eventId'
  ],
  data: () => ({
    icon: [
      null,
      "folder-plus",
      "arrow-top-right-thick",
      "cart-arrow-down",
      "cart-off",
      "hand-back-left-outline",
      "gavel",
      "cart-arrow-right",
      "keyboard-return",
      "scissors-cutting",
      "hand-back-left-off-outline",
      "archive-arrow-up-outline",
      "database-arrow-right-outline",
      "archive-arrow-down",
      "archive-check",
      "cash-plus",
    ],
    text: [
      null,
      "create",
      "deliver",
      "onSale",
      "cancelSale",
      "makeOffer",
      "bid",
      "bought",
      "redeem",
      "destroy",
      "cancelOffer",
      "withdraw",
      "paidInterest",
      "buyBlindbox",
      "openBlindbox",
      "deposit",

    ]
  })
}
</script>

<style scoped>

</style>
