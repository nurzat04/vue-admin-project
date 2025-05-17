<template>
    <div class="layout_container">
        <!-- 左侧菜单栏 -->
        <div class="layout_slider" :class="{fold:LayOutSettingStore.fold? true : false}">
            <Logo/>
            <!-- 展示菜单栏 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <!-- 
                :default-active 是默认激活的菜单,根据url写的获取(route.path)
                这样就算用户刷新页面，用户所点击的页面就不会消失了
                -->
                <el-menu
                :default-active = "route.path"
                background-color="#fff"
                text-color="black"
                active-text-color="#20a0ff"
                :collapse="LayOutSettingStore.fold? true : false"
                >
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold? true : false}">
            <Tabbar></Tabbar>

        </div>
        <!-- 内容展示区 -->
         
        <div class="layout_main" :class="{fold:LayOutSettingStore.fold? true : false}">
            <!-- <router-view></router-view> -->
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts" name="Layout">
    import Logo from './logo/index.vue'
    import Menu from './menu/index.vue'
    //右侧内容展示区域
    import Main from './main/index.vue'
    //顶部tabbar组件：
    import Tabbar from './tabbar/index.vue'
    import {useRoute} from 'vue-router'
    import useUserStore from '../store/modules/user';
    import useLayOutSettingStore from '../store/modules/setting'

    let LayOutSettingStore = useLayOutSettingStore()

    let userStore = useUserStore()

    let route = useRoute()
    console.log(route.path)
</script>
<style lang="scss" scoped>
    .layout_container {
        display: flex;
        height: 100vh;
        width: 100vw;
        background-color: #f0f2f5;
        .layout_slider {
            width: $base-menu-width;
            background-color: $base-menu-bg-color;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.1);
            transition: all 0.3s;

            .scrollbar {
                height: calc(98vh - $base-menu-logo-height);
                width: 100%;
                .el-menu{
                    border-right: none;
                }
            }
        }
        .layout_tabbar {
            position: fixed;
            top: 0;
            left: $base-menu-width;
            width: calc(100% - $base-menu-width);
            height: $base-tabbar-height;
            transition: all 0.3s;
            //background-color: $base-tabbar-bg-color;

            &.fold{
                width: calc( 100vw - $base-menu-min-wdith);
                left: $base-menu-min-wdith;
            }
        }
        .layout_main {
            position: absolute;
            width: calc(100% - $base-menu-width);
            height: calc(100% - $base-tabbar-height);
            background-color: $base-main-bg-color;
            top: $base-tabbar-height;
            left: $base-menu-width;
            overflow: auto;
            padding: 20px;
            transition: all 0.3s;

            &.fold{
                width: calc( 100vw - $base-menu-min-wdith);
                left: $base-menu-min-wdith;
            }
        }
    }
</style>