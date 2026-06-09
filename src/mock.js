// 恢复全量模拟数据，确保大屏内容充实
window.getBarData = function () {
    return {
        categories: ['江南区', '青秀区', '西乡塘区', '兴宁区', '良庆区', '邕宁区', '武鸣区', '横州市', '宾阳县', '隆安县'],
        values: [850, 1200, 980, 710, 640, 420, 530, 390, 460, 310]
    };
};

window.getLineData = function () {
    return {
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        values: [45, 52, 48, 61, 74, 82, 88, 95, 91, 105, 112, 128]
    };
};

window.getPieData = function () {
    return [
        { name: '公交系统', value: 35 },
        { name: '轨道交通', value: 25 },
        { name: '私家客车', value: 20 },
        { name: '非机动车', value: 15 },
        { name: '出租网约', value: 10 },
        { name: '步行及其它', value: 5 }
    ];
};

window.getRadarData = function () {
    return [85, 72, 90, 65, 80];
};

window.getWordCloudData = function () {
    return [
        { name: '智慧城市', value: 100 }, { name: '数据监控', value: 85 },
        { name: '实时运行', value: 70 }, { name: '广西南宁', value: 95 },
        { name: '大数据', value: 80 }, { name: '云计算', value: 65 },
        { name: '人工智能', value: 75 }, { name: '物联网', value: 60 },
        { name: '数字孪生', value: 88 }, { name: '5G基站', value: 55 },
        { name: '区块链', value: 45 }, { name: '政务云', value: 92 },
        { name: '智慧交通', value: 82 }, { name: '应急管理', value: 78 }
    ];
};

window.getGaugeData = function () {
    return 82.5;
};

window.getMapData = function () {
    return [
        { name: '南宁市政府(核心)', value: [108.32, 22.82, 100] },
        { name: '青秀区节点', value: [108.38, 22.81, 85] },
        { name: '西乡塘区节点', value: [108.28, 22.84, 70] },
        { name: '江南区节点', value: [108.27, 22.78, 65] },
        { name: '良庆区节点', value: [108.39, 22.75, 60] },
        { name: '邕宁区节点', value: [108.48, 22.75, 50] },
        { name: '兴宁区节点', value: [108.35, 22.85, 55] }
    ];
};
