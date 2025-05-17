<template>
    <el-button size="small" icon="Refresh" circle="true" @click="updateRefresh"></el-button>
    <el-button size="small" icon="FullScreen" circle="true" @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle="true"></el-button>
    <img :src="userStore.avatar" style="width: 25px; height: 25px; margin: 0px 10px; border-radius: 50%;"/>
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username}}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
        <el-dropdown-menu>
            <el-dropdown-item @click="logout">log out</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown>

</template>
<script setup lang="ts" name="Setting">
import useLayOutSettingStore from '../../../store/modules/setting';
import useUserStore from '../../../store/modules/user';
import { useRouter, useRoute} from 'vue-router';

const router = useRouter();

const route = useRoute();

let layoutSettingStore = useLayOutSettingStore();

let userStore = useUserStore();

//刷新按钮点击回调
const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
}

//全屏按钮点击的回调
const fullScreen = () => {
    //DOM对象的一个属性，可以用来判断当前是不是全屏模式[全屏:true, 不是全屏:false]
    let full = document.fullscreenElement;
    //切换为全屏模式
    if(!full){
        document.documentElement.requestFullscreen()
    }else{
        //退出全屏模式
        document.exitFullscreen()
    }
}

const logout = async () => {
    await userStore.userLogout();
    //这里的redirect是用来：当用户在比如说在权限管理页面的用户管理页面的时候退出登录的话，那么这个
    //redirect就会在用户登录后，自动把用户redirect到权限管理页面的用户管理页面
    router.push({path:'/login', query:{redirect: route.path}});
}

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
