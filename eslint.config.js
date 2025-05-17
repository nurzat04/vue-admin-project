import vue from "eslint-plugin-vue";

export default [
  {
    ignores: ["node_modules/", "dist/", "build/"],
  },
  {
    files: ["**/*.js", "**/*.vue"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      vue,
      prettier: "eslint-plugin-prettier", // 加载 prettier 插件
    },
    extends: [
      "plugin:prettier/recommended", // 集成 Prettier 规则
    ],
    rules: {
      "vue/multi-word-component-names": "off",
      "no-unused-vars": "warn",
      "vue/no-v-html": "off",
      "no-console": "warn",
      quotes: ["error", "single"],
      "prettier/prettier": "error", // 启用 Prettier 检查
    },
  },
];
