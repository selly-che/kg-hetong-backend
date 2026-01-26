<template>
  <div class="pie-container">
    <div class="pie-title">应收款项目统计</div>
    <hr />
    <div class="pie-tabs">
      <div class="tab active" @click="handleTabClick(0)">全部合同</div>
      <div class="tab" @click="handleTabClick(1)">国内合同</div>
      <div class="tab" @click="handleTabClick(2)">外协合同</div>
    </div>
    <div class="pie-chart" ref="pieChart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "EacherPie",
  data() {
    return {
      chart: null,
      activeTab: 0,
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          right: "10%",
          top: "center",
          formatter: "{name} | 36%  ¥4,544",
          textStyle: {
            fontSize: 12,
          },
          itemGap: 15,
          icon: "circle",
        },
        series: [
          {
            name: "应收款项目",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["35%", "55%"],
            avoidLabelOverlap: false,
            padAngle: 5,
            selectedMode: "single",
            selectedOffset: 10,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
              // formatter: '总金额\n¥123,224',
              color: "#333",
              fontSize: 16,
              fontWeight: "bold",
            },
            emphasis: {
              label: {
                show: true,
                formatter: "总金额\n¥4,544",
                fontSize: 18,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 4544, name: "市政", itemStyle: { color: "#4A90E2" } },
              { value: 2524, name: "隧道", itemStyle: { color: "#50E3C2" } },
              { value: 2021, name: "公路", itemStyle: { color: "#7ED321" } },
              { value: 1267, name: "铁路", itemStyle: { color: "#F5A623" } },
              { value: 1129, name: "建筑", itemStyle: { color: "#D0021B" } },
              { value: 1139, name: "其他", itemStyle: { color: "#9013FE" } },
            ],
            total: 12624,
          },
        ],
      },
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs.pieChart);
    this.chart.setOption(this.option);
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    handleTabClick(index) {
      this.activeTab = index;
      // 更新标签页的active状态
      const tabs = document.querySelectorAll(".pie-tabs .tab");
      tabs.forEach((tab, i) => {
        if (i === index) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      });
      this.chart.setOption(this.option);
    },
  },
};
</script>

<style scoped lang="less">
.pie-container {
  // padding: 20px;
  height: 440px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .pie-title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    padding-top: 10px;
    margin-left: 20px;
  }

  .pie-tabs {
    display: flex;
    margin-bottom: 10px;
    margin-left: 20px;
    .tab {
      padding: 8px 16px;
      margin-right: 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      color: #666;
      background-color: #f5f5f5;
      transition: all 0.3s;

      &:hover {
        background-color: #e0e0e0;
      }

      &.active {
        background-color: #4a90e2;
        color: #fff;
      }
    }
  }

  .pie-chart {
    height: 300px;
    width: 100%;
  }
}
</style>
