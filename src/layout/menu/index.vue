<template>
    <template v-for="(item, _) in menuList" :key="item.path">

        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden"  @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon" />
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由但是只有一个 -->
        <template v-if="item.children&&item.children.length==1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon" />
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由，且有好几个子路由 -->
        <el-sub-menu v-if="item.children&&item.children.length>1" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 这里用的递归，然后就会从头再来一遍判断 -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>

    </template>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
defineProps(['menuList'])

const router = useRouter();

const goRoute = (vc: any) => {
    router.push(vc.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menu' // 这是关键！必须写
}
</script>

<style lang="scss" scoped>
</style>