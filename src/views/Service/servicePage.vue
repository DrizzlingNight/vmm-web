<template>
  <v-dialog v-model="servicePage" width="1192" @click:outside="close">
    <v-card
        class="service-card mx-auto list d-flex flex-column"
    >
      <div
          class="d-flex justify-end"

      >
        <v-img
            style="margin-top: 12px;margin-right: 11px"
            @click="close"
            class="d-inline-block"
            max-height="14"
            max-width="14"
            src="@/assets/fake/close.png"
        ></v-img>
      </div>
      <div class="list mt-7 cardText" style="overflow-y: auto;margin-left: 67px;margin-right: 66px;margin-bottom: 65px">
        <div class="text-justify" v-html="config.privacy_en"></div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "servicePage",
  data: () => ({}),

  computed: {
    ...mapGetters(["config", "isServicePageDialog"]),
    servicePage: {
      get() {
        return this.isServicePageDialog;
      },
      set(val) {
        this.$store.commit("ui/SET_IS_SERVICE_PAGE_DIALOG", val);
      },
    },
  },
  methods: {
    close() {
      this.$store.commit("ui/SET_IS_SERVICE_PAGE_DIALOG", false);
    },
  }
}
</script>

<style lang="scss" scoped>
/*.cardText {*/
/*  height: calc(100% - 20px);*/
/*}*/
.service-card {
  border-radius: 4px;
  height: 90vh;
  max-width: 1192px;
  max-height: 872px;
}

@media screen and (max-width: 960px) {
  ::v-deep .v-dialog:not(.v-dialog--fullscreen) {
    max-height: 85vh;
    overflow-y: hidden;
  }
  .service-card {
    height: auto;
    max-height: 85vh;
    margin-top: 120px;
  }
}
</style>