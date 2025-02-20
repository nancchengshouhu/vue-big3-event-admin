import js from '@eslint/js'          // 1. 引入 ESLint 官方推荐配置
import pluginVue from 'eslint-plugin-vue' // 2. 引入 Vue 官方插件
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting' // 3. 跳过 Prettier 格式检查
import pluginPrettier from 'eslint-plugin-prettier' // 4. 引入 Prettier 插件

export default [
  // ================= 基础配置 =================
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'], // 需要检查的文件类型
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'] // 忽略检查的目录
  },

  // ================= 官方推荐配置 =================
  js.configs.recommended, // ESLint 官方推荐规则
  ...pluginVue.configs['flat/essential'], // Vue 官方基础规则

  // ================= Prettier 配置 =================
  {
    // 加载 Prettier 插件
    plugins: {
      prettier: pluginPrettier
    },
    // Prettier 规则配置
    rules: {
      'prettier/prettier': [
        'warn', // 警告级别
        {
          singleQuote: true,    // 使用单引号
          semi: false,          // 不加分号
          printWidth: 80,       // 每行最大 80 字符
          trailingComma: 'none',// 不加末尾逗号
          endOfLine: 'auto'     // 自动识别换行符
        }
      ]
    }
  },
  skipFormatting, // 跳过与 Prettier 冲突的格式规则

  // ================= 自定义规则 =================
  {
    // Vue 相关规则
    rules: {
      // 组件名称多单词规则（忽略 index.vue）
      'vue/multi-word-component-names': [
        'warn',
        { ignores: ['index'] }
      ],
      // 关闭 props 解构校验
      'vue/no-setup-props-destructure': ['off'],
      // 未定义变量报错（兼容性配置）
      'no-undef': 'error'
    }
  }
]
