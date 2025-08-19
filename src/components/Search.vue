<template>
  <div>
    <v-text-field
        v-model="navInput"
        background-color="searchInput"
        class="my-auto"
        solo
        style="width: 500px;position: relative;height: 44px;font-weight: 500"
        flat
        hide-details
        placeholder="搜索NFT和用户"
        @blur="hideSearch"
        @focus="showSearch"
        id="input"
    >
      <template v-slot:prepend-inner>
        <v-img width="20px" src="../assets/fake/search/search.png"></v-img>
      </template>
      <template v-slot:append >
        <v-img width="20px" @click="clearable" src="../assets/fake/search/clearable.png"></v-img>
      </template>
    </v-text-field>
    <v-card class="listTotal mt-5" v-if="searchList" @mousedown.native="preventDefault" flat>
      <v-list
          class="searchList"
          subheader
          flat
      >
        <div v-if="nftList.length">
          <v-subheader style="font-size: 16px;font-weight: bold;height: 22px" class="white--text mt-5 mb-2 ml-2">NFT
          </v-subheader>
          <v-list-item
              v-for="nft in nftList"
              :key="nft.title"
              @click="goNFT(nft.id)"
              class="mx-auto item"
              style="height: 48px;width:480px;font-weight: bold;border-radius: 4px;transition: 0.3s"
          >
            <v-list-item-avatar size="30">
              <v-img
                  :src="isOldImg(nft.files) ? host + nft.files : host + nft.files[0]"
                  class="white--text rounded"
                  style="border-radius: 4px"
                  aspect-ratio="1"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="nft.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-if="userList.length">
          <v-subheader style="font-size: 16px;font-weight: bold;height: 22px" class="white--text mt-7 mb-2 ml-2">
            {{ $t("search.tabuser") }}
          </v-subheader>
          <v-list-item
              style="height: 48px;width: 480px;font-weight: bold;border-radius: 4px;transition: 0.3s"
              class="mx-auto item"
              v-for="user in userList"
              :key="user.title"
              @click="goUser(user.id)"
          >
            <v-list-item-avatar size="30">
              <v-img src="@/assets/fake/people.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="user.username"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
      <div class="d-flex justify-center mt-4 mb-5">
        <v-btn text height="50px" color="#FFC107" class="searchBtn" @click="goSearch" style="font-weight: bold">
          {{ $t("search.showTotal") }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import {userTotal} from '@/api/user'
import {getNFTList} from '@/api/NFT'
import {mapGetters} from "vuex";

export default {
  name: "Search",
  data: () => ({
    searchList: false,
    navInput: '',
    nftList: '',
    userList: '',
    files: [
      {
        color: 'blue',
        icon: 'mdi-clipboard-text',
        subtitle: 'Jan 20, 2014',
        title: 'Vacation itinerary',
      },
      {
        color: 'amber',
        icon: 'mdi-gesture-tap-button',
        subtitle: 'Jan 10, 2014',
        title: 'Kitchen remodel',
      },
      {
        color: 'red',
        icon: 'mdi-gesture-tap-button',
        subtitle: 'Jan 10, 2014',
        title: 'Kitcn remodel',
      },
    ],
    folders: [
      {
        subtitle: 'Jan 9, 2014',
        title: 'Photos',
      },
      {
        subtitle: 'Jan 17, 2014',
        title: 'Recipes',
      },
      {
        subtitle: 'Jan 28, 2014',
        title: 'Work',
      },

    ],
  }),
  created() {
    this.debouncednewFormName = this.debounce(() => {
      this.userTotal()
      this.getNFTList()
    }, 500)
  },
  watch: {
    navInput() {
      this.searchList = true
      this.debouncednewFormName()
    }
  },
  computed: {
    ...mapGetters(["host", "user"]),
    //图片匹配老数据
    isOldImg() {
      return function (item) {
        if (item) {
          if (typeof item === 'string') {
            return true
          } else return false
        } else return true
      }
    }
  },
  methods: {
    //清除
    clearable() {
      this.navInput = ''
    },
    showSearch() {
      if (this.navInput) {
        this.searchList = true
      }
    },
    hideSearch() {
      this.searchList = false
    },
    goSearch() {
      this.searchList = false
      this.$router.push({
        path: '/search',
        query: {
          query: this.navInput.trim()
        }
      })
    },
    //点击nft
    goNFT(id) {
      this.searchList = false
      this.$router.push(`/nft/${id}`)
    },
    //点击用户
    goUser(id) {
      this.searchList = false
      this.$router.push(`/user/${id}/`)
    },
    //阻止默认事件
    preventDefault(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      } else {
        window.event.returnValue = false;
      }
      return false;
    },
    //防抖debounce代码：
    debounce(fn, delay) {
      let timeout = null; // 创建一个标记用来存放定时器的返回值
      return function () {
        // 每当用户输入的时候把前一个 setTimeout clear 掉
        clearTimeout(timeout);
        // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
        timeout = setTimeout(() => {
          fn.apply(this, arguments);
        }, delay);
      };
    },
    //获取用户列表
    userTotal() {
      let info = {}
      info.limit = 3
      info.search = this.navInput.trim()
      userTotal(info).then((response) => {
        this.userList = response.data.results
      })
          .catch(() => {

          });
    },
    //获取nft列表
    getNFTList() {
      let info = {}
      info.limit = 3
      info.search = this.navInput.trim()
      getNFTList(info).then((response) => {
        this.nftList = response.data.results
        // console.log(this.nftList)
      })
          .catch(() => {

          });
    }
  }
}
</script>

<style scoped>
.listTotal {
  background-color: rgba(33, 33, 33, 1) !important;
  width: 500px;
  max-height: 487px;
  position: absolute;
  border-radius: 4px;
}

.searchList {
  background: rgba(33, 33, 33, 1) !important;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}

.searchBtn {
  width: 440px;
  box-shadow: 0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  border: 1px solid #FFC107;
}

.item:hover {
  background-color: #424242;
}

>>> .v-text-field.v-text-field--solo .v-input__control {
  min-height: 44px;
}

>>> .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details {
  padding: 0 21px;
}
</style>