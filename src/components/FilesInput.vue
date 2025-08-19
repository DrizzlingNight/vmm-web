<template>
  <div class="container">
    <v-row>
      <div v-for="file in files" :key="file.id">
        <v-img
            :src="file.dataUrl"
            class="imgshow"
            @click="setFirst(file)"
        >
          <div
              class="masked"
          >
            <p
                style="position: absolute;bottom: 10px"
            >{{ $t("createNFT.setCover") }}</p>
          </div>
          <v-icon
              style="position: absolute;top: 6px;right: 6px;color: #8e8e8e"
              @click.stop="remove(file)"
          >mdi-close</v-icon>
        </v-img>
      </div>
      <vue-transmit
          class="imgshow imgupdate"
          v-bind="options"
          ref="uploader"
          @success="uploadSuccess"
      >
        <div class="d-flex flex-column align-center pt-16"
             @click="triggerBrowse"
        >
          <img
              src="/static/uploadImg.png"
              style="width: 78px;"
              class="mb-3"
          />
          <p
              style="color: #0091FF"
          >{{ $t("createNFT.upload") }}</p>
        </div>
      </vue-transmit>
    </v-row>
  </div>
</template>

<script>
const regex = /.*csrftoken=([^;.]*).*$/ // 用于从cookie中匹配 csrftoken值

export default {
  name: "FilesInput",
  data:() => ({
    files:[],
    filesPath:[],
    options: {
      acceptedFileTypes: ['image/*'],
      url: `${process.env.VUE_APP_BASE_API}/utils/uploadFile/`,
      headers: {'X-CSRFToken': document.cookie.match(regex) === null
            ? null
            : document.cookie.match(regex)[1]},
      params: {"path": "nftFile"},
      clickable: false,
      responseType: 'json'
    }
  }),
  methods: {
    updateFiles(){
      this.filesPath = this.files.map(file=>(file.xhr.response.data))
      this.$emit("update", this.filesPath)
    },
    triggerBrowse() {
      this.$refs.uploader.triggerBrowseFiles()
    },
    uploadSuccess(file){
      if (this.filesPath.indexOf(file.xhr.response.data) !== -1)
        return
      this.files.push(file)
      this.updateFiles()
    },
    setFirst(file){
      if (this.files.length < 2)
        return
      let index = this.files.indexOf(file)
      this.files[index] = this.files[0]
      this.files[0] = file
      this.$forceUpdate()
      this.updateFiles()
    },
    remove(file){
      let index = this.files.indexOf(file)
      this.files.splice(index, 1)
      this.$forceUpdate()
      this.updateFiles()
    }
  },
  filters: {
    json(value) {
      return JSON.stringify(value, null, 2)
    }
  }
}
</script>

<style scoped>
.imgshow {
  height:238px;
  width: 242px;
  margin: 8px;
  border-radius: 10px;
}
.imgupdate {
  border: 2px dashed #333333;
}
#mask_layer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #FFFFFF;
}
.masked {
  height: 100%;
  width: 100%;
  z-index: 2;
  position: absolute;
  top: 50px;
  left: 0;
  color: #0091FF;
  transition: top .2s;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.masked:hover{
  top: 0px;
  position: absolute;
  background: rgba(255,255,255,.7);
}

</style>
