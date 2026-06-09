// 全面恢复专业视觉效果与交互逻辑
const dom = {
  bar: document.getElementById('chart-bar'),
  line: document.getElementById('chart-line'),
  pie: document.getElementById('chart-pie'),
  radar: document.getElementById('chart-radar'),
  wordcloud: document.getElementById('chart-wordcloud'),
  gauge: document.getElementById('chart-gauge'),
  map: document.getElementById('main-map'),
  time: document.getElementById('real-time-clock')
};

const charts = {};

// 高级 Tooltip 配置
const commonTooltip = {
  show: true,
  trigger: 'item',
  backgroundColor: 'rgba(15, 23, 42, 0.9)',
  borderColor: '#38bdf8',
  borderWidth: 1,
  padding: [8, 12],
  textStyle: { color: '#fff', fontSize: 12 },
  confine: true,
  formatter: (params) => {
    // 处理 axis 触发 (数组) 和 item 触发 (对象)
    const p = params;
    let val = Array.isArray(p.value) ? p.value[p.value.length - 1] : p.value;
    val = (val === undefined || val === null) ? '-' : val;
    const name = p.name || (p.seriesName + (p.dataIndex !== undefined ? ` (${p.axisValue})` : ''));

    return `<div style="text-align:center">
      <div style="color:#94a3b8;font-size:11px;margin-bottom:4px;">${name}</div>
      <div style="color:#38bdf8;font-size:16px;font-weight:bold">${val}</div>
    </div>`;
  }
};

const initCharts = () => {
  const theme = 'dark';
  const bgColor = 'transparent';

  const safeInit = (el) => {
    if (!el || el.clientWidth === 0) return null;
    return echarts.init(el, theme);
  };

  // 1. 柱状图 - 渐变色与圆角
  const bar = safeInit(dom.bar);
  if (bar) {
    charts.bar = bar;
    const data = window.getBarData();
    bar.setOption({
      backgroundColor: bgColor,
      title: { text: '区域人口密度分布', left: 'center', top: 10, textStyle: { color: '#38bdf8', fontSize: 15 } },
      tooltip: { ...commonTooltip, trigger: 'axis' },
      grid: { left: '8%', right: '5%', bottom: '15%', top: '25%', containLabel: true },
      xAxis: { type: 'category', data: data.categories, axisLabel: { color: '#94a3b8', fontSize: 10, interval: 0, rotate: 30 } },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } } },
      series: [{
        name: '人口密度',
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#38bdf8' },
            { offset: 1, color: '#0ea5e966' }
          ])
        },
        data: data.values
      }]
    });
  }

  // 2. 折线图 - 面积渐变
  const line = safeInit(dom.line);
  if (line) {
    charts.line = line;
    const data = window.getLineData();
    line.setOption({
      backgroundColor: bgColor,
      title: { text: '年度经济增长趋势', left: 'center', top: 10, textStyle: { color: '#38bdf8', fontSize: 15 } },
      tooltip: { ...commonTooltip, trigger: 'axis' },
      grid: { left: '8%', right: '5%', bottom: '15%', top: '25%', containLabel: true },
      xAxis: { type: 'category', data: data.months, axisLabel: { color: '#94a3b8' } },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } } },
      series: [{
        type: 'line',
        smooth: true,
        symbol: 'circle',
        lineStyle: { width: 3, color: '#38bdf8' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(56, 189, 248, 0.4)' },
            { offset: 1, color: 'rgba(56, 189, 248, 0)' }
          ])
        },
        data: data.values
      }]
    });
  }

  // 3. 饼图 - 环形装饰
  const pie = safeInit(dom.pie);
  if (pie) {
    charts.pie = pie;
    pie.setOption({
      backgroundColor: bgColor,
      title: { text: '交通出行方式占比', left: 'center', top: 10, textStyle: { color: '#38bdf8', fontSize: 15 } },
      tooltip: commonTooltip,
      series: [{
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '60%'],
        itemStyle: { borderRadius: 5, borderColor: '#0b1120', borderWidth: 2 },
        label: { show: false },
        data: window.getPieData()
      }]
    });
  }

  // 4. 雷达图
  const radar = safeInit(dom.radar);
  if (radar) {
    charts.radar = radar;
    radar.setOption({
      backgroundColor: bgColor,
      title: { text: '资源调度评估', left: 'center', top: 10, textStyle: { color: '#38bdf8', fontSize: 15 } },
      radar: {
        indicator: [
          { name: '基础设施', max: 100 }, { name: '公共服务', max: 100 },
          { name: '环境保护', max: 100 }, { name: '产业发展', max: 100 },
          { name: '安全治理', max: 100 }
        ],
        center: ['50%', '60%'],
        radius: '65%',
        axisName: { color: '#94a3b8' },
        splitArea: { show: false }
      },
      series: [{
        type: 'radar',
        areaStyle: { color: 'rgba(56, 189, 248, 0.3)' },
        lineStyle: { color: '#38bdf8' },
        itemStyle: { color: '#38bdf8' },
        data: [{ value: window.getRadarData() }]
      }]
    });
  }

  // 5. 词云图
  const wc = safeInit(dom.wordcloud);
  if (wc) {
    charts.wordcloud = wc;
    wc.setOption({
      title: { text: '城市实时热词', left: 'center', top: 10, textStyle: { color: '#38bdf8', fontSize: 15 } },
      series: [{
        type: 'wordCloud',
        sizeRange: [12, 30],
        rotationRange: [-45, 45],
        textStyle: {
          color: () => `rgb(${[Math.round(Math.random() * 100 + 155), Math.round(Math.random() * 100 + 155), 255].join(',')})`
        },
        data: window.getWordCloudData()
      }]
    });
  }

  // 6. 仪表盘
  const gauge = safeInit(dom.gauge);
  if (gauge) {
    charts.gauge = gauge;
    gauge.setOption({
      title: { text: '系统负荷状态', left: 'center', bottom: 10, textStyle: { color: '#38bdf8', fontSize: 14 } },
      series: [{
        type: 'gauge',
        center: ['50%', '55%'],
        startAngle: 200, endAngle: -20,
        axisLine: { lineStyle: { width: 10, color: [[0.3, '#38bdf8'], [0.7, '#818cf8'], [1, '#f43f5e']] } },
        progress: { show: true, width: 10 },
        detail: { valueAnimation: true, formatter: '{value}%', color: '#fff', fontSize: 20 },
        data: [{ value: window.getGaugeData() }]
      }]
    });
  }

  // 7. 地图与连线
  const mapControl = safeInit(dom.map);
  if (mapControl) {
    charts.map = mapControl;
    const areaData = window.getMapData();
    const core = areaData[0];
    const links = areaData.slice(1).map(p => ({ coords: [core.value, p.value] }));

    mapControl.setOption({
      backgroundColor: bgColor,
      title: { text: '南宁市智慧运行核心节点', left: 'center', top: '5%', textStyle: { color: '#38bdf8', fontSize: 22, fontWeight: 'bold' } },
      tooltip: commonTooltip,
      xAxis: { show: false, min: 108.2, max: 108.6 },
      yAxis: { show: false, min: 22.7, max: 22.9 },
      series: [
        {
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          effect: { show: true, period: 4, trailLength: 0.4, symbol: 'arrow', symbolSize: 6 },
          lineStyle: { color: '#38bdf8', width: 2, opacity: 0.2, curveness: 0.2 },
          data: links
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'cartesian2d',
          data: areaData,
          symbolSize: (v) => v[2] / 5 + 10,
          rippleEffect: { brushType: 'stroke', scale: 4 },
          label: { show: true, formatter: '{b}', position: 'right', color: '#fff', fontSize: 13 },
          itemStyle: { color: '#38bdf8', shadowBlur: 10, shadowColor: '#38bdf8' }
        }
      ]
    });
  }
};

const updateTime = () => {
  if (dom.time) {
    const now = new Date();
    dom.time.textContent = now.toLocaleString('zh-CN', { hour12: false });
  }
};
setInterval(updateTime, 1000);
updateTime();

window.addEventListener('DOMContentLoaded', () => setTimeout(initCharts, 400));
window.addEventListener('resize', () => Object.values(charts).forEach(c => c && c.resize()));
