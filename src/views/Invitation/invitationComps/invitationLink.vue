<template>
  <div>
    <div class="recommend">
      <div class="recommend-top">
        <div class="recommend_award">
          {{ $t("invitation.recommendAward") }}<span>{{ recommendAward }} VMM</span>
        </div>
        <div class="recommend_success">
          {{ $t("invitation.recommendSuccess") }}<span>{{ referralInfo.sub_count }}</span>
        </div>
      </div>
<!--      <div class="recommend_block">-->
<!--        <div class="recommend_title">-->
<!--          <div class="recommend_success">-->
<!--            {{ $t("invitation.recommendSuccess") }}-->
<!--            <span>({{ 1 }})</span>-->
<!--          </div>-->
<!--          <div class="recommend_award">-->
<!--            {{ $t("invitation.recommendAward") }}-->
<!--            <span>({{ 1 }}VMM)</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-for="item in recommendPeople" :key="item.id" class="recommend_people">-->
<!--          <div class="recommend_name">-->
<!--            <v-img class="img" contain max-width="25px" max-height="25px" src="@/assets/fake/people.png"></v-img>-->
<!--            <div>{{ item.name }}</div>-->
<!--          </div>-->
<!--          <div>{{ item.amount }}</div>-->
<!--        </div>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script>
import {formatStrPrice, numFormat,cutZero} from "@/utils/math";
import {getReferralInfo} from "@/api/mining"
export default {
  name: "invitationLink",
  data: () => ({
    referralInfo:"",
    recommendPeople: [
      {name: 123, amount: 'zxzxzx'},
      {name: 123, amount: 'zxzxzx'},
      {name: 123, amount: 'zxzxzx'},
      {name: 123, amount: 'zxzxzx'},
      {name: 123, amount: 'zxzxzx'},
    ]
  }),
  created() {
    this.getUserReferralInfo()
  },
  computed:{
    recommendAward() {
      return cutZero(formatStrPrice(numFormat(this.referralInfo.referral_mining_total,4)))
    }
  },
  methods:{
    getUserReferralInfo() {
      getReferralInfo().then((response) => {
        this.referralInfo = response.data
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
.recommend {
  margin-top: 40px;

  .recommend-top {
    display: flex;
    color: #CC9933;
    font-weight: 600;
    line-height: 25px;
    height: 25px;

    span {
      color: #050505;
    }

    .recommend_award {
      margin-right: 55px;
    }
  }

  .recommend_block {
    width: 100%;
    margin-top: 20px;
    background-color: rgba(204, 153, 51, .3);
    padding-top: 37px;
    padding-left: 36px;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 17px;
    border-radius: 4px;

    .recommend_title {
      display: flex;
      color: #CC9933;
      line-height: 25px;
      height: 25px;
      margin-bottom: 25px;

      .recommend_success {
        display: flex;
        align-self: center;
        width: 50%;
      }

      span {
        color: #050505;
      }
    }

    .recommend_people {
      margin-bottom: 15px;
      display: flex;
      height: 25px;
    }

    .recommend_name {
      width: 50%;
      line-height: 25px;
      vertical-align: center;
      display: flex;

      .img {
        margin-right: 10px;
      }

      div {
        height: 25px;
        line-height: 25px;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .recommend {
    margin-top: 20px;

    .recommend-top {
      font-size: 16px !important;
      line-height: 25px;
      height: 25px;

      .recommend_award {
        margin-right: 25px;
      }
    }

    .recommend_block {
      margin-top: 10px;
      padding-top: 20px;
      padding-left: 20px;
      font-size: 15px;
      padding-bottom: 12px;

      .recommend_title {
        margin-bottom: 15px;
      }

      .recommend_people {
        margin-bottom: 15px;
        display: flex;
        height: 20px;
      }

      .recommend_name {
        width: 50%;
        line-height: 25px;
        vertical-align: center;
        display: flex;

        .img {
          max-width: 20px;
          max-height: 20px;
          margin-right: 10px;
        }

        div {
          height: 25px;
          line-height: 25px;
        }
      }
    }
  }
}
</style>