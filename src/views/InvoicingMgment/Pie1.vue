<template>
  <div class="pie-container">
    <div class="pie-title">应收款项目统计</div>
    <hr />
    <div class="pie-tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 0 }"
        @click="handleTabClick(0)"
      >
        全部合同
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 1 }"
        @click="handleTabClick(1)"
      >
        国内合同
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 2 }"
        @click="handleTabClick(2)"
      >
        外协合同
      </div>
    </div>
    <div class="pie-chart" ref="pieChartRef"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PiE",
};
</script>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount } from "vue";
import getDatas from "@/network/index";

// 响应式数据
const chart = ref<echarts.ECharts | null>(null);
const activeTab = ref(0);
const pieChartRef = ref(null);

// 图表配置
const option = ref({
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} ({d}%)",
  },
  series: [
    {
      name: "应收款项目",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["50%", "50%"],
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
        formatter: '',
        color: "#333",
        fontSize: 16,
        fontWeight: "bold",
      },
      emphasis: {
        label: {
          show: true,
          formatter: "",
          fontSize: 16,
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
  ]
});

// 方法
const handleResize = () => {
  if (chart.value) {
    chart.value.resize();
  }
};

const handleTabClick = (index: number) => {
  activeTab.value = index;
  const tabs = document.querySelectorAll(".pie-tabs .tab");
  tabs.forEach((tab, i) => {
    if (i === index) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  getPieData();
};

onMounted(() => {
  chart.value = echarts.init(pieChartRef.value);
  chart.value.setOption(option.value);
  getPieData();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (chart.value) {
    chart.value.dispose();
  }
});

const getPieData = async () => {
  const res = await getDatas("home/GetContractCollectionStats");
  // console.log("饼图数据", res);
  if (res.data.code === 200) {
    const data = res.data.result;
    const colorMap:Record<string, string> = {
      市政: "#4A90E2",
      隧道: "#50E3C2",
      公路: "#7ED321",
      铁路: "#F5A623",
      建筑: "#D0021B",
      其它: "#DDA0DD",
      城轨: "#BD10E0",
    };
    const statsKey =
      activeTab.value === 0
        ? "allContractStats"
        : activeTab.value === 1
        ? "domesticContractStats"
        : "externalContractStats";
    const stats = data[statsKey];
    const total = stats["总计"] || 0;
    const pieData = Object.entries(stats)
      .filter(([key]) => key !== "总计")
      .map(([name, value]) => ({
        value: Number(value),
        name,
        itemStyle: { color: colorMap[name] || "#999" },
        percentage: total > 0 ? ((Number(value) / total) * 100).toFixed(1) : "0.0",
      }));
    option.value.series[0].data = pieData;
    option.value.series[0].total = total;
    const totalText = `总金额\n¥${total.toLocaleString()}`;
    option.value.series[0].label.formatter = totalText;
    chart.value?.setOption(option.value);
  }
};
</script>

<style scoped lang="less">
.pie-container {
  // padding: 20px;
  height: 420px;
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
