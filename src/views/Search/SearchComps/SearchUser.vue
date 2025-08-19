<template>
  <div class="d-flex flex-wrap">
    <show-user v-for="i in userList" :key="i.title" class="mx-2"></show-user>
  </div>
</template>

<script>
import ShowUser from "../../../components/showUser";
import {userTotal} from "@/api/user";

export default {
  name: "SearchUser",
  components: {ShowUser},
  data: () => ({
    userList: '',
    folders: [
      {
        subtitle: 'Jan 9, 2014',
        title: 'Phtos9',
      },
      {
        subtitle: 'Jan 17, 2014',
        title: 'Reipes',
      },
      {
        subtitle: 'Jan 28, 2014',
        title: 'Wrk',
      },
      {
        subtitle: 'Jan 9, 2014',
        title: 'Phtos',
      },
      {
        subtitle: 'Jan 17, 2014',
        title: 'Recip',
      },
      {
        subtitle: 'Jan 28, 2014',
        title: 'Wor',
      },
      {
        subtitle: 'Jan 9, 2014',
        title: 'Photo',
      },
      {
        subtitle: 'Jan 17, 2014',
        title: 'Recipe',
      },
      {
        subtitle: 'Jan 28, 2014',
        title: 'ork12',
      }, {
        subtitle: 'Jan 9, 2014',
        title: 'hotos',
      },
      {
        subtitle: 'Jan 17, 2014',
        title: 'ecipes',
      },
      {
        subtitle: 'Jan 28, 2014',
        title: 'ork',
      }, {
        subtitle: 'Jan 9, 2014',
        title: 'hotos12',
      },
      {
        subtitle: 'Jan 17, 2014',
        title: 'Recipes1',
      },
      {
        subtitle: 'Jan 28, 2014',
        title: 'Work1',
      }, {
        subtitle: 'Jan 9, 2014',
        title: 'Photos1',
      },
      {
        subtitle: 'Jan 17, 2014',
        title: 'Recips1',
      },
      {
        subtitle: 'Jan 28, 2014',
        title: 'Work2',
      }, {
        subtitle: 'Jan 9, 2014',
        title: 'Photos3',
      },
      {
        subtitle: 'Jan 17, 2014',
        title: 'Recipes2',
      },
      {
        subtitle: 'Jan 28, 2014',
        title: 'Work7',
      },

    ],
  }),
  created() {
    this.userTotal()
  },
  methods: {
    //获取用户列表
    userTotal() {
      let info = {}
      info.limit = 10
      info.search = this.$route.query.query
      userTotal(info).then((response) => {
        this.userList = response.data.results
      })
          .catch(() => {

          });
    },
  }
}
</script>

<style scoped>

</style>