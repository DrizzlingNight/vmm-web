<template>
  <div>
    <v-data-table
      style="min-height: 655px; font-size: 24px; margin-top: 35px"
      :headers="headers"
      :items="rarityList"
      item-key="name"
      disable-sort
      mobile-breakpoint="200"
      class="elevation-0"
      hide-default-footer
    >
      <template v-slot:item="item">
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
      <!--            <template v-slot:item.type="{ item }">-->
      <!--              <type :item="item" :class="showImg(item.rarity)"></type>-->
      <!--            </template>-->
      <!--            <template v-slot:item.rarity="{ item }">-->
      <!--              <rarity :rarity="item.rarity" :class="showImg(item.rarity)"></rarity>-->
      <!--            </template>-->
      <!--            <template v-slot:item.amount="{ item }">-->
      <!--              <amount :amount="item.amount" :class="showImg(item.rarity)"></amount>-->
      <!--            </template>-->
      <!--            <template v-slot:item.probability="{ item }">-->
      <!--              <probability :probability="item.probability" :class="showImg(item.rarity)"></probability>-->
      <!--            </template>-->
    </v-data-table>
    <v-row no-gutters>
      <v-col cols="12">
        <v-pagination
          color="btnColor"
          v-model="page"
          :length="pageLength"
          :total-visible="7"
        ></v-pagination>
      </v-col>
    </v-row>
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
  name: "BottomRarity",
  components: { Probability, Amount, Rarity, Type },
  props: ["blindBoxId"],
  mounted () {
    this.getNFTSeries()
  },
  data: () => ({
    page: 1,
    limit: 10,
    loading: false,
    rarityList: [],
    totalCount: 0,
  }),
  created() {
    this.rarityList = this.rarity;
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
  watch: {
    page: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal && oldVal && newVal != oldVal) {
          this.getNFTSeries()
        }
      },
    },
    blindBoxId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.getNFTSeries()
        }
      },
    }
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

      if (!this.blindBoxId) return 

      console.log('11111111111 getNFTSeries:', this.blindBoxId);

      const params = {
        blindbox: this.blindBoxId,
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      }

      getNFTSeries(params).then(res => {
        if (res.code === 0) {
          this.rarityList = res.data.results
          this.totalCount = res.data.count
        }
      })
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  height: 40px;
  background-color: #eeeeee;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  border-bottom: thin solid transparent !important;
}

::v-deep .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  //padding: 0;
}

::v-deep .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 60px;
  //padding: 0;
}
// ::v-deep .v-data-table > .v-data-table__wrapper > table{
//   border-collapse: collapse;
//   .SSS {
//     border-bottom: thin solid #ffe08c !important;
//   }

//   .SS {
//     border-bottom: thin solid #fc93ff !important;
//   }

//   .S {
//     border-bottom: thin solid #99cfff !important;
//   }

//   .A {
//     border-bottom: thin solid #c2ffe2 !important;
//   }

//   .B {
//     border-bottom: thin solid #dedede !important;
//   }
// }
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
</style>