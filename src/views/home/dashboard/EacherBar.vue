<template>
  <div class="bar-container">
    <div class="bar-tabs">
      <a-tabs v-model:activeKey="activeKey" class="custom-tabs">
        <a-tab-pane key="0" tab="国内合同"></a-tab-pane>
        <a-tab-pane key="1" tab="外协合同"></a-tab-pane>
      </a-tabs>
      <div class="date-section">
        <a-space class="quick-dates">
          <a-button
            type="text"
            :class="{ active: activeDate === 'today' }"
            @click="activeDate = 'today'"
            >今日</a-button
          >
          <a-button
            type="text"
            :class="{ active: activeDate === 'week' }"
            @click="activeDate = 'week'"
            >本周</a-button
          >
          <a-button
            type="text"
            :class="{ active: activeDate === 'month' }"
            @click="activeDate = 'month'"
            >本月</a-button
          >
          <a-button
            type="text"
            :class="{ active: activeDate === 'year' }"
            @click="activeDate = 'year'"
            >全年</a-button
          >
        </a-space>
        <a-range-picker @change="onChange" />
      </div>
    </div>
    <div class="bar-content">
      <div ref="barContainer" style="height: 300px; width: 70%"></div>
      <div class="ranking-section" style="height: 300px; width: 30%">
        <h3 class="ranking-title">类型排名</h3>
        <ul class="ranking-list">
          <li
            v-for="(item, index) in rankingList"
            :key="index"
            class="ranking-item"
          >
            <span class="ranking-number">{{ index + 1 }}</span>
            <span class="ranking-name">{{ item.name }}</span>
            <span class="ranking-value">{{ item.value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import getDatas from "@/network/index";

export default {
  name: "EacherBar",
  data() {
    return {
      params: {
        endTime: "",
        startTime: "",
      },
      activeKey: "0",
      activeDate: "today",
      chart: null,
      rankingList: [
        { name: "市政", value: 323234 },
        { name: "隧道", value: 323234 },
        { name: "建筑", value: 323234 },
        { name: "城轨", value: 323234 },
        { name: "公路", value: 323234 },
        { name: "桥梁", value: 323234 },
        { name: "铁路", value: 323234 },
      ],
      option: {
        title: {
          text: "合同数量",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "铁路",
            "公路",
            "市政",
            "隧道",
            "桥梁",
            "城轨",
            "建筑",
            "其他",
          ],
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 10,
          // interval: 1,
        },
        series: [
          {
            data: [350, 750, 950, 500, 150, 500, 250, 350],
            type: "bar",
            itemStyle: {
              color: "#1890ff",
            },
            barWidth: "60%",
          },
        ],
      },
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs.barContainer);
    this.chart.setOption(this.option);
    this.getbarinfo();
  },
  methods: {
    onChange(date, dateString){
      console.log(date, dateString);
    },
    async getbarinfo() {
      const res = await getDatas("home/GetContractCountStats", this.params);
      // console.log("柱状图数据", res.data.result);
      //tab切换
      let tab = "internalContractCountStats";
      if(this.activeKey === "1") {
        tab = "externalContractCountStats";
      }
      const dataBar = res.data.result
      //值
      const a1 = Object.values(dataBar[tab])
      const ymax = Math.max(...a1)
      const ymin=Math.min(...a1)
      if (res.data.code === 200 && dataBar) {
        // console.log("柱状图数据", dataBar[tab]);
        // y轴分行
        this.option.yAxis.max=ymax
        this.option.yAxis.min=ymin
        this.option.series[0].data = [...a1]; 
        this.option.xAxis.data = Object.keys(dataBar[tab]);
        this.chart.setOption(this.option); 
        // console.log(this.activeKey);
        //右边图例
        this.rankingList = Object.entries(dataBar[tab]).map(([name, value]) => ({ name, value }));
      }
    },
  },
  watch: {
    activeDate(newVal) {
      if (newVal === "today") {
        this.params.startTime = new Date().toLocaleDateString();
        this.params.endTime = new Date().toLocaleDateString();
      }
    },
    activeKey() {
      this.getbarinfo();
    },
  },
};
</script>

<style scoped lang="less">
.bar-container {
  width: 100%;
  height: 420px;
  padding: 10px;
}

.bar-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.custom-tabs {
  :deep(.ant-tabs-nav) {
    margin-bottom: 0;
  }

  :deep(.ant-tabs-tab) {
    padding: 8px 16px;
    font-size: 14px;
  }

  :deep(.ant-tabs-tab-active) {
    font-weight: 500;
  }

  :deep(.ant-tabs-ink-bar) {
    background-color: #1890ff;
    height: 2px;
  }
}

.date-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quick-dates {
  :deep(.ant-btn-text) {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    padding: 4px 12px;
  }

  :deep(.ant-btn-text.active) {
    color: #1890ff;
  }
}

.bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 320px;
}

.ranking-section {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
}

.ranking-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 16px 0;
  text-align: center;
}

.ranking-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  //overflow-y: auto;
}

.ranking-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.ranking-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #1890ff;
  color: white;
  font-size: 12px;
  font-weight: 500;
  margin-right: 12px;
  flex-shrink: 0;
}

.ranking-name {
  flex: 1;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}

.ranking-value {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  font-family: monospace;
}
</style>
