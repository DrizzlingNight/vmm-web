<template>
  <div style="width:100%;position:relative;aspect-ratio:1;">
      <v-img v-for="path in imgPaths" :max-width="maxWidth" :key="path" style="position:absolute;width:100%;height:auto;" :src="path"></v-img>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
    name: 'SpliceNFT',
    props: ['maxWidth', 'rule'],
    mounted () {
        if (this.rule && this.rule.length > 0) {
            this.ruleConvert()
        }
    },
    computed: {
        ...mapGetters(['host']),
    },
    data() {
        return {
            imgPaths: [],
            isPreloading: false,
        }
    },
    methods: {
        ruleConvert() {
            if (!this.rule || this.rule.length == 0) return
            let rules = this.rule.split('|')
            let imgPaths = []
            let basePath = 'https://s3.ap-northeast-1.amazonaws.com/dev.vmm.zone/'
            if (rules.length > 0) {
                for (let i = 0;i < rules.length;++i) {
                    const rule = rules[i]
                    const pathAndName = rule.split('#')
                    if (pathAndName.length === 2) {
                        const path = pathAndName[0]
                        const name = pathAndName[1]
                        if (path == 0) {
                            basePath += (name + '/')
                            continue
                        }
                        let imgName = basePath + path + '/' + name + '.png'
                        imgPaths.push(imgName)
                    }
                }
            }
            const paths = imgPaths.sort()
            const self = this;
            this._preload(paths).then ( () => {
                self.imgPaths = paths
            })
        },
        async _preload(imgPaths, index, failed) {
            const idx = index || 0
            const f = failed || 0
            this.isPreloading = true
            return new Promise((resolve, reject) => {
                var image = new Image()
                if (idx < imgPaths.length) {
                    image.src = imgPaths[idx]
                    image.onload = () => {
                        if (idx === (imgPaths.length - 1)) {
                            self.isPreloading = false
                            resolve('success')
                        } else {
                            resolve(this._preload(imgPaths, idx + 1, f))
                        }
                    }
                    image.onerror = () => {
                    if (f === 3) { // 失败3次就直接中断
                        self.isPreloading = false
                        reject()
                    }
                    resolve(this._preload(imgPaths, idx, f + 1))
                    }
                } else {
                    reject()
                }
            })
        },
    },

}
</script>

<style lang="scss" scoped>



</style>


