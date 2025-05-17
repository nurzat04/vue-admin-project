<template>
    <el-icon style="margin-right:10px" @click="changeIcon">
        <!-- component可以用来动态加载图标 -->
        <component :is="LayOutSettingStore.fold? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item,index) in route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon >
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span style="margin: 0px 4px">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup lang="ts" name="Breadcrumb">
import { ArrowRight } from '@element-plus/icons-vue';
import useLayOutSettingStore from '../../../store/modules/setting';
import {useRoute} from 'vue-router';

let LayOutSettingStore = useLayOutSettingStore()

const changeIcon = () =>{
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}

let route = useRoute()

</script>
<style scoped lang="scss">
.tabbar{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(to right, rgb(255, 255, 255), rgb(244, 249, 253),rgb(232, 244, 253));
    .tabbar_left{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right{
        display: flex;
        align-items: center;
    }
}
</style>
