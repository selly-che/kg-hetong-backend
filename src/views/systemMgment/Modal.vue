<template>
  <div>
    <a-modal v-model:visible="visible" title="编辑用户" @ok="handleOk">
      <template v-slot:footer>
        <a-button key="back" @click="handleCancel"> 取消 </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          提交
        </a-button>
      </template>
      <slot>暂无内容</slot>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      visible: false,
      currentRecord: null,
    };
  },
  methods: {
    showModal(record) {
      this.currentRecord = record;
      this.visible = true;
    },
    handleOk() {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
        this.currentRecord = null;
      }, 3000);
    },
    handleCancel() {
      this.visible = false;
      this.currentRecord = null;
    },
  },
};
</script>
