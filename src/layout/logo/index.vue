<template>
    <div class="logo">
        <img :src="setting.logo" alt="Logo"/>
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts" name="Logo">
import setting from '../../setting';
</script>

<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding: 12px;
    margin-top: 5px;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        font-size: 20px;
        color: black;
        margin-left: 10px;
    }

    // 支持暗黑模式：你可以通过 html 或 body 上的类切换
    :deep(.dark) & {
        background-color: #1e1e1e;
        box-shadow: none;

        p {
        color: #f0f0f0;
        }
    }
}

</style>