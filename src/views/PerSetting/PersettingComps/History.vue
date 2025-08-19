<template>
  <div style="margin-top: 84px">
    <v-data-table
        style="min-height: 500px;font-size: 24px;margin-top: 35px"
        :headers="headers"
        :items="historyList"
        item-key="name"
        disable-sort
        class="elevation-1"
        hide-default-footer
        @click:row="clickData"
    >
      <template v-slot:item.opt="{ item }">
        <event :eventId="item.opt"></event>
      </template>
      <template v-slot:item.name="{ item }">
        <simple-nft-show :item="item"></simple-nft-show>
      </template>
      <template v-slot:item.created_time="{ item }">
        <history-time :item="item.created_time"></history-time>
      </template>
    </v-data-table>
    <overlay :loading="loading"></overlay>
    <v-row
        class="d-flex justify-center my-10"
    >
      <v-pagination
          color="btnColor"
          v-model="page"
          :length="pageLength"
          :total-visible="7"
      ></v-pagination>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {getOptionHistory} from "@/api/NFT";
import event from "./event";

import SimpleNftShow from "./SimpleNftShow";
import Overlay from "../../../components/Overlay";
import router from "@/router";
import i18n from "@/lang";
import HistoryTime from "./HistoryTime";

export default {
  name: "History",
  components: {
    HistoryTime,
    Overlay,
    event,
    SimpleNftShow,
  },
  watch: {
    user() {
      if (this.user) {
        this.getHistory()
      }
    },
    page() {
      this.getHistory(this.searchInfo, false)
    }
  },
  computed: {
    ...mapGetters(["user", "host"]),
    headers() {
      return [
        {
          text: i18n.t("persetting.history.event"),
          align: 'start',
          sortable: false,
          value: 'opt',
        },
        {text: i18n.t("persetting.history.project"), value: 'name'},
        // { text: 'price', value: '' },
        // { text: 'number', value: '' },
        // { text: 'from', value: '' },
        // { text: 'to', value: '' },
        {text: i18n.t("persetting.history.date"), value: 'created_time'},
      ]
    }
  },
  data: () => ({
    historyList: [],
    loading: false,
    limit: 10,
    page: 1,
    pageLength: 1,
    searchInfo: {},
  }),
  created() {
    if (this.user) {
      this.getHistory()
    }
  },
  methods: {
    clickData(item) {
      let now = this.moment();
      let expired = this.moment(item ? item.token.expiration : "");
      if (expired.diff(now) < 0) {
        return i18n.t(i18n.t("persetting.history.errorExpired"))
      } else if (item.status === 1) {
        return i18n.t(i18n.t("persetting.history.errorDestory"))
      } else {
        router.push(`/nft/${item.token.id}`)
      }
    },
    getHistory(info = {}, resetPage = true) {
      this.loading = true
      info.limit = this.limit
      if (resetPage)
        this.page = 1
      info.offset = this.limit * (this.page - 1)
      this.searchInfo = info
      info.user = this.$route.params.id

      getOptionHistory(info)
          .then((response) => {
            this.loading = false
            this.historyList = response.data.results;
            this.pageLength = parseInt(response.data.count / this.limit) + ((response.data.count % this.limit) && 1 || 0)
          })
          .catch(() => {
            this.loading = false
          });
    },
  }
}
</script>

<style scoped>
/*>>> .v-data-table > .v-data-table__wrapper > table:nth-child(even) {*/
/*  background: red !important;*/
/*}*/

>>> tr:nth-child(odd) {
  background-color: #F6F5F3;
}

>>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding-left: 80px !important;
  border: 0 !important;
}

>>> .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
  background-color: #FCFCFC;
  height: 64px;
  font-size: 24px;
  font-weight: 600;
  padding-left: 80px;
}

@media (max-width: 1156px) {
  >>> .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    padding-left: 20px !important;
  }

  >>> .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    padding-left: 20px !important;
  }
}

</style>
