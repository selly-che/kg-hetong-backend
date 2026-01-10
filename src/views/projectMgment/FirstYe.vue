<template>
  <div class="header">
    <div class="title">项目管理</div>
    <a-input-search
      style="width: 400px; margin: 10px 0"
      placeholder="请输入关键字搜索"
      enter-button="搜索"
      @search="onSearch"
      v-model="searchText"
    />
    <div class="category-group">
      <span class="category-label">所属类目：</span>
      <a-button-group>
        <a-button :type="activeCategory === 'all' ? 'default' : 'text'" @click="changeCategory('all')">全部</a-button>
        <a-button :type="activeCategory === 'railway' ? 'default' : 'text'" @click="changeCategory('railway')"
          >铁路</a-button
        >
        <a-button :type="activeCategory === 'tunnel' ? 'primary' : 'text'" @click="changeCategory('tunnel')"
          >隧道</a-button
        >
        <a-button :type="activeCategory === 'bridge' ? 'default' : 'text'" @click="changeCategory('bridge')"
          >桥梁</a-button
        >
        <a-button :type="activeCategory === 'road' ? 'default' : 'text'" @click="changeCategory('road')">公路</a-button>
        <a-button :type="activeCategory === 'category5' ? 'default' : 'text'" @click="changeCategory('category5')"
          >类目五</a-button
        >
        <a-button :type="activeCategory === 'category6' ? 'default' : 'text'" @click="changeCategory('category6')"
          >类目六</a-button
        >
        <a-button :type="activeCategory === 'category7' ? 'default' : 'text'" @click="changeCategory('category7')"
          >类目七</a-button
        >
        <a-button :type="activeCategory === 'category8' ? 'default' : 'text'" @click="changeCategory('category8')"
          >类目八</a-button
        >
        <a-button :type="activeCategory === 'category9' ? 'default' : 'text'" @click="changeCategory('category9')"
          >类目九</a-button
        >
        <a-button :type="activeCategory === 'category10' ? 'default' : 'text'" @click="changeCategory('category10')"
          >类目十</a-button
        >
      </a-button-group>
    </div>
    <a-tabs v-model="activeKey" @change="handleTabChange">
      <a-tab-pane key="1" tab="所有状态"></a-tab-pane>
      <a-tab-pane key="2" tab="进行中"></a-tab-pane>
      <a-tab-pane key="3" tab="已暂停"></a-tab-pane>
      <a-tab-pane key="4" tab="已结束"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      activeCategory: 'all',
      activeStatus: 'all',
      activeKey: '1'
    }
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText
      this.$emit('search', this.searchText)
    },
    changeCategory(category) {
      this.activeCategory = category
      this.$emit('category-change', category)
    },
    changeStatus(status) {
      this.activeStatus = status
    },
    handleTabChange(key) {
      // console.log('切换标签:', key)
      this.activeKey = key
      this.$emit('tab-change', key)
    }
  }
}
</script>

<style scoped lang="less">
.header {
  width: 100%;
  padding: 10px 20px;
  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
  }
}

.category-group {
  margin: 15px 0;
  .category-label {
    margin-right: 10px;
    font-weight: 500;
  }
  .ant-btn-group > .ant-btn {
    margin-right: 0;
  }
}

.status-group {
  margin-top: 15px;
  .status-button {
    margin-right: 20px;
  }
}
</style>
