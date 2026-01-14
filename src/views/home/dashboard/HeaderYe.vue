<template>
  <div class="header-container br8 ">
    <div class="user-info">
      <div class="avatar">
        <img src="#" alt="" />
      </div>
      <div class="user-details">
        <div class="greeting">你好! 陈渝蓉</div>
        <div class="position">项目经理 | 中铁.重庆分公司.生产部 主管</div>
      </div>
    </div>
    <div class="stats-container">
      <div class="stat-item">
        <div class="stat-label">项目数量</div>
        <div class="stat-value">35</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">国内合同数量</div>
        <div class="stat-value">467</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">外协合同数量</div>
        <div class="stat-value">478</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">应收账款金额</div>
        <div class="stat-value">¥2324.35万</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="less">
.header-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 30px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.user-details {
  .greeting {
    font-size: 16px;
    font-weight: 500;
    color: #262626;
    margin-bottom: 4px;
  }
  .position {
    font-size: 12px;
    color: #8c8c8c;
  }
}

.stats-container {
  display: flex;
  align-items: center;
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 40px;
    padding-left: 40px;
    position: relative;
    &:not(:last-child)::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 32px;
      background-color: #e8e8e8;
    }
    .stat-label {
      font-size: 12px;
      color: #8c8c8c;
      margin-bottom: 4px;
    }
    .stat-value {
      font-size: 20px;
      font-weight: 500;
      color: #262626;
    }
  }
}
</style>
