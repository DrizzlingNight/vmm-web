<template>
  <div class="overflow-y-auto rarity cardMessage">
    <v-data-table
      style="font-size: 24px; margin-top: 20px"
      :headers="headers"
      :items="rarity"
      item-key="name"
      disable-sort
      mobile-breakpoint="200"
      :disable-pagination="true"
      class="elevation-0"
      hide-default-footer
    >
      <template v-slot:item="item" class="list">
        <tr :key="item.item.name" :class="showImg(item.item.rarity)">
          <td>
            <type :item="item.item"></type>
          </td>
          <td>
            <rarity :rarity="item.item.rarity"></rarity>
          </td>
          <td>
            <amount :amount="item.item.amount"></amount>
          </td>
          <td>
            <probability :probability="item.item.probability"></probability>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-pagination 
      class="mt-5"
      color="btnColor"
      v-model="page"
      :length="pageLength"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
import Type from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/Type";
import Rarity from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/Rarity";
import Amount from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/Amount";
import Probability from "@/views/MysteryBoxDetail/MysteryBoxDetailComps/Probability";

import { getNFTSeries } from "@/api/NFT";
import i18n from "@/lang";

export default {
  name: "NftRarityTab",
  props: ["NFT", "isMine"],
  components: { Probability, Amount, Rarity, Type },
  data: () => ({
    rarity: [],
    page: 1,
    limit: 10,
    totalCount: 0,
  }),
  created() {
    this.getNFTSeries();
  },
  computed: {
    pageLength() {
      return Math.ceil(this.totalCount / this.limit)
    },
    headers() {
      return [
        {
          text: i18n.t("mysteryBox.mysteryBoxDetail.rarityTab.type"),
          align: "start",
          sortable: false,
          value: "type",
        },
        {
          text: i18n.t("mysteryBox.mysteryBoxDetail.rarityTab.rarity"),
          value: "rarity",
        },
        {
          text: i18n.t("mysteryBox.mysteryBoxDetail.rarityTab.amount"),
          value: "amount",
        },
        {
          text: i18n.t("mysteryBox.mysteryBoxDetail.rarityTab.probability"),
          value: "probability",
        },
      ];
    },
  },
  methods: {
    showImg(rarity) {
      switch (rarity) {
        case 0:
          return "SSS";
        case 1:
          return "SS";
        case 2:
          return "S";
        case 3:
          return "A";
        case 4:
          return "B";
        default:
          return "SSS";
      }
    },
    getNFTSeries() {

      if(!this.NFT || !this.NFT.blindbox) return

      console.log('11111111111 getNFTSeries:', this.NFT, this.NFT.blindbox, this.NFT.blindbox.id);

      const params = {
        blindbox: this.NFT.blindbox.id || 1,
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      }

      getNFTSeries(params).then(res => {
        if (res.code === 0) {
          this.rarity = res.data.results
          this.totalCount = res.data.count
        }
      })
    },
  },
    watch: {
    page: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
          this.getNFTSeries()
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
.rarity {
  height: 430px;
  width: 100%;
}
.list {
  //height: 200px;
  width: 100%;
}
.list::-webkit-scrollbar {
  display: none;
}
::v-deep .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  height: 40px;
  background-color: #eeeeee;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  border-bottom: thin solid transparent !important;
}

// ::v-deep
//   .theme--light.v-data-table
//   > .v-data-table__wrapper
//   > table
//   > tbody
//   > tr:not(:last-child)
//   > td:not(.v-data-table__mobile-row) {
//   border-bottom: thin solid #ffe08c !important;
// }

::v-deep .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  //padding: 0;
}

::v-deep .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 60px;
  //padding: 0;
}

::v-deep .v-data-table > .v-data-table__wrapper > table {
  // border-collapse: collapse;

  .SSS {
    td {
      border-bottom: thin solid #ffe08c !important;
    }
  }

  .SS {
    td {
      border-bottom: thin solid #fc93ff !important;
    }
  }

  .S {
    td {
      border-bottom: thin solid #99cfff !important;
    }
  }

  .A {
    td {
      border-bottom: thin solid #c2ffe2 !important;
    }
  }

  .B {
    td {
      border-bottom: thin solid #dedede !important;
    }
  }
}
/* 整个滚动条 */
.cardMessage::-webkit-scrollbar {
  width: 9px;
  height: 10px;
  background-color: #d8d8d8;
}
/* 滚动条上的滚动滑块. */
.cardMessage::-webkit-scrollbar-thumb {
  background-color: #8c8c8c;
  // border: 3px solid #cc9933;
  border-radius: 25px;
}
/* 当同时有垂直滚动条和水平滚动条时交汇的部分. */
.cardMessage::-webkit-scrollbar-corner {
  background: transparent;
}
</style>