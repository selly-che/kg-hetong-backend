<template>
  <div class="container">
    <span class="title">开票收款管理</span>
    <div class="content">
      <div class="left">
        <p>收款统计</p>
        <hr />
        <div
          class="progress-item"
          v-for="(item, index) in progressList"
          :key="index"
        >
          <div class="month">{{ item.month }}</div>
          <div class="progress-container">
            <a-progress
              :percent="item.percent"
              :show-info="false"
              stroke-color="#00c400"
            />
          </div>
          <div class="amount">
            <span class="received">已收{{ item.received }}</span>
            <span class="receivable">应收{{ item.receivable }}</span>
          </div>
          <div class="percentage">{{ item.percent }}.0%</div>
        </div>
      </div>
      <div class="rigth">
        <div class="s">
          <PayCircleOutlined class="iconbg1" />
          <div class="text">
            <span>应收款金额</span>
            <span class="percentage">￥2324,35万</span>
          </div>
        </div>
        <div class="s">
          <LineChartOutlined class="iconbg2" />
          <div class="text">
            <span>收款完成率</span>
            <span class="percentage">75.5%</span>
          </div>
        </div>
        <div class="m">
          <Pie1 />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Pie1 from "./Pie1.vue";
import { PayCircleOutlined, LineChartOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const progressList = ref([
  {
    month: "2024-01",
    percent: 30,
    received: "¥3,000,000",
    receivable: "¥5,000,000",
  },
  {
    month: "2024-03",
    percent: 70,
    received: "¥3,000,000",
    receivable: "¥5,000,000",
  },
  {
    month: "2024-04",
    percent: 40,
    received: "¥3,000,000",
    receivable: "¥5,000,000",
  },
  {
    month: "2024-05",
    percent: 70,
    received: "¥3,000,000",
    receivable: "¥5,000,000",
  },
  {
    month: "2024-06",
    percent: 60,
    received: "¥3,000,000",
    receivable: "¥5,000,000",
  },
  {
    month: "2024-07",
    percent: 70,
    received: "¥3,000,000",
    receivable: "¥5,000,000",
  },
]);
</script>
<style scoped lang="less">
.title {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}
span {
  font-size: 12px;
  font-weight: 500;
  color: #262626;
}
.content {
  display: flex;
  height: 600px;
  .left {
    width: 70%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;

    p {
      font-size: 10px;
      font-weight: 500;
      color: #262626;
      margin-bottom: 20px;
    }

    .progress-item {
      margin-bottom: 10px;
      position: relative;
    }

    .month {
      font-size: 12px;
      color: #262626;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .progress-container {
      width: calc(100% - 80px);
      display: inline-block;
      // strokecolor: #00c48c;

      :deep(.ant-progress) {
        margin: 0;
      }

      :deep(.ant-progress-bar) {
        height: 10px;

        .ant-progress-bar-inner {
          background-color: #00c48c;
          border-radius: 0;
        }
      }

      :deep(.ant-progress-bg) {
        background-color: #f0f0f0;
        border-radius: 0;
      }
    }

    .amount {
      font-size: 10px;
      margin-top: 3px;
      display: flex;
      justify-content: space-between;

      .received {
        color: #666;
        margin-right: 20px;
      }

      .receivable {
        color: #999;
      }
    }

    .percentage {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }
  }
  .rigth {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    height: 100%;
    .s {
      height: 15%;
      width: 100%;
      background-color: #ffffff;
      border: 1px solid #d9d9d9;
      margin-bottom: 10px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;

      .iconbg1 {
        width: 60px;
        height: 60px;
        background-color: rgb(36, 137, 255);
        color: #fff;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        font-size: 30px;
      }
      .iconbg2 {
        width: 60px;
        height: 60px;
        background-color: #00c48c;
        color: #fff;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        font-size: 30px;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;
        .percentage {
          font-size: 24px;
          font-weight: 700;
          color: #262626;
        }
      }
    }
    .m {
      height: 70%;
      width: 100%;
      background-color: #ffffff;
    }
  }
}
</style>
