//layout组件相关配置仓库

import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,//在Tabbar组件里面的：用户控制菜单折叠还是收起控制, 在这里写是因为这样所有的组件都可以用这个fold
            refresh: false,//仓库这个属性用于控制刷新效果

        }
    }
})

export default useLayOutSettingStore