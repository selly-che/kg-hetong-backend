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
import getDatas from "@/network/index";

export default {
  name: "EacherPie",
  data() {
    return {
      chart: null,
      activeTab: 0,
      option: {
        //悬停提示
        tooltip: {
          // show:false,
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          right: "5%",
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
            center: ["30%", "55%"],
            avoidLabelOverlap: false,
            // padAngle: 5,
            selectedMode: "single",
            selectedOffset: 10,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "center",
              color: "#333",
              fontSize: 16,
              fontWeight: "bold",
              formatter:"111"
            },
            emphasis: {
              label: {
                show: true,
                formatter: "总金额\n¥12624",
                fontSize: 16,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [],
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
    this.getPieData();
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
      const tabs = document.querySelectorAll(".pie-tabs .tab");
      tabs.forEach((tab, i) => {
        if (i === index) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      });
      this.getPieData();
    },
    //饼图数据
    async getPieData() {
      const res = await getDatas("home/GetContractCollectionStats");
      console.log("饼图数据", res);
      if (res.data.code === 200) {
        const data = res.data.result;
        const colorMap = {
          "市政": "#4A90E2",
          "隧道": "#50E3C2",
          "公路": "#7ED321",
          "铁路": "#F5A623",
          "建筑": "#D0021B",
          "其他": "#9013FE",
          "其它": "#9013FE",
          "城轨": "#BD10E0"
        };
        const statsKey = this.activeTab === 0 ? "allContractStats" : this.activeTab === 1 ? "domesticContractStats" : "externalContractStats";
        const stats = data[statsKey];
        const total = stats["总计"] || 0;
        const pieData = Object.entries(stats)
          .filter(([key]) => key !== "总计")
          .map(([name, value]) => ({
            value,
            name,
            itemStyle: { color: colorMap[name] || "#999" },
            percentage: total > 0 ? ((value / total) * 100).toFixed(1) : "0.0"
          }));
        this.option.series[0].data = pieData;
        this.option.series[0].total = total;
        const totalText = `总金额\n¥${total.toLocaleString()}`;
        this.option.series[0].label.formatter = totalText;
        this.option.series[0].emphasis.label.formatter = totalText;
        this.chart.setOption(this.option);
      }
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
