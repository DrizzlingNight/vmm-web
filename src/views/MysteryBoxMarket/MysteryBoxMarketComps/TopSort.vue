<template>
  <div class="d-flex topSort">
    <div
        class="sortDiv div"
        
    >
      <v-select
          :items="items"
          :class="(sortValue != '')?'activeSelect':''"
          :outlined="sortValue.length == 0"
          solo
          flat
          hide-details
          :label="$t('marketPlace.priceOrder')"
          :item-text="selectLabelGet"
          v-model="sortValue"
          @change="getNFTList"
      ></v-select>
    </div>
    <div
        class="sortDiv"
    >
      <v-select
          :items="timeSortItems"
          :class="(timeSortValue != '')?'activeSelect':''"
          :outlined="timeSortValue.length == 0"
          solo
          flat
          hide-details
          :label="$t('marketPlace.timeOrder')"
          :item-text="selectLabelGet"
          v-model="timeSortValue"
          @change="getNFTList"
      ></v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopSort",
  data: () => ({
    sortValue: '',
    timeSortValue: "",
    items: [{text: 'priceOrderH2L', value: '-sell_info__price'}, {text: 'priceOrderL2H', value: 'sell_info__price'}],
    timeSortItems: [{text: 'timeOrderN2O', value: '-sell_info__onsale_time'}, {
      text: 'timeOrderO2N',
      value: 'sell_info__onsale_time'
    }],
  }),
  methods: {
    selectLabelGet(a) {
      return this.$t(`marketPlace.${a.text}`)
    },
    getNFTList() {
      this.$emit("changeSelectList",this.sortValue,this.timeSortValue)
    },
    //更改价格
    changePriceOrder(item) {
      this.priceOrder = item.text
    },
    //更改时间
    changeTimeOrder(item) {
      this.timeOrder = item.text
    }
  }
}
</script>

<style scoped lang="scss">
.topSort {
  .sortDiv {
    max-width: 167px;

    .div {
      width: 0;
      height: 0;
      margin-left: 5px;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
      border-top: 5px solid #D8D8D8;
    }

    .div2 {
      width: 0;
      height: 0;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
      border-bottom: 5px solid #D8D8D8;
    }

    &.div {
      margin-right: 9px;
    }

    .menu {
      width: 158px;

      .btnPrice {
        width: 158px;

        &.activeBtn {
          ::v-deep .theme--light.v-btn.v-btn--has-bg {
            background: red;
            color: red;
          }

        }
      }

    }
    ::v-deep .v-text-field.v-text-field--solo .v-input__control{
      min-height: 40px;
    }

    ::v-deep .v-input__slot {
      min-height: 40px;
    }

    .activeSelect {
      border: 1px solid #CC9933;
      ::v-deep .v-select__selection--comma {
        color: #CC9933;
      }

      ::v-deep .v-icon.v-icon {
        color: #CC9933 !important;
      }

      color: #CC9933 !important;
    }
  }
}
</style>