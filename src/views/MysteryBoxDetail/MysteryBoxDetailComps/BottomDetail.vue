<template>
  <div class="detail">
    <div class="detail_content">
      <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.publisher") }}</div>
      <div>
        <div class="div"></div>
        <v-img class="logo" src="@/assets/lightLogo.png"></v-img>
        <span class="span">{{ detail.creator.username }}</span></div>
    </div>
    <div class="detail_content">
      <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.publishAmount") }}</div>
      <div>{{ detail.total_store }}</div>
    </div>
    <div class="detail_content">
      <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.publishDate") }}</div>
      <div>{{ detail.start_time.split('T')[0] }}</div>
    </div>
    <div class="detail_content">
      <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.address") }}</div>
      <div>{{ detail.contract.address }}</div>
    </div>
    <div class="detail_content">
      <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.id") }}</div>
      <div>{{ '--' }}</div>
    </div>
    <div class="detail_content">
      <div>{{ $t("mysteryBox.mysteryBoxDetail.detailTab.blockchain") }}</div>
      <div>{{ detail.contract.block_chain }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomDetail",
  props: ["detail"]
}
</script>

<style scoped lang="scss">
.detail {
  margin-top: 51px;

  .detail_content {
    display: flex;
    margin-bottom: 40px;

    & > div:nth-child(1) {
      font-weight: 400;
      color: #2A2C38;
      line-height: 22px;
      height: 22px;
      font-size: 16px;
      min-width: 64px;
      margin-right: 51px;
    }

    & > div:nth-child(2) {
      font-weight: 600;
      color: #2A2C38;
      line-height: 22px;
      height: 22px;
      font-size: 16px;
      display: flex;
      align-items: center;

      .div {
        display: inline-block;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background-color: #F6F5F3;
      }

      .logo {
        position: relative;
        left: -40px;
        width: 45px;
        max-width: 45px;
        height: 18px;
      }

      .span {
        position: relative;
        left: -36px;
        height: 22px;
        font-size: 16px;
        font-weight: 600;
        color: #050505;
        line-height: 22px;
      }
    }
  }
}
</style>