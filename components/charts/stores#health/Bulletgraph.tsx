import { Axis, Chart, Coord, Geom, Guide, Legend, View } from 'bizcharts';
import React from 'react';

const data = [
  {
    title: 'SaaS对比小票',
    subtitle: 'US$, in thousands',
    ranges: [150, 225, 300],
    actual: 270,
  },
  {
    title: 'SaaS对比支付',
    subtitle: '%',
    ranges: [20, 25, 30],
    actual: 23,
  },
  {
    title: 'SaaS环比',
    subtitle: 'US$, average',
    ranges: [350, 500, 600],
    actual: 100,
  },
  {
    title: '小票环比',
    subtitle: 'count',
    ranges: [1400, 2000, 2500],
    actual: 1650,
  },
  {
    title: '支付环比',
    subtitle: 'count',
    ranges: [1400, 2000, 2500],
    actual: 1650,
  },
];

const legendItems = [
  {
    value: '不健康',
    fill: '#FFA39E',
    marker: 'square',
  },
  {
    value: '亚健康',
    fill: '#FFD591',
    marker: 'square',
  },
  {
    value: '健康',
    fill: '#A7E8B4',
    marker: 'square',
  },
  {
    value: '实际值',
    fill: '#223273',
    marker: 'square',
  },
  {
    value: '目标值',
    fill: '#262626',
    marker: {
      symbol: 'line',
      stroke: '#262626',
      radius: 5,
    },
  },
];

const { Region } = Guide;

const Bulletgraph = () => {
  let y = 0;
  const yGap = 0.1;
  return (
    <div>
      <Chart
        height={420}
        padding={{
          top: -50,
          right: 50,
          bottom: 150,
          left: 120,
        }}
        forceFit
      >
        <Legend custom clickable={false} items={legendItems} />
        {data.map((data: any, index: number) => {
          const ranges = data.ranges;
          const cols = {
            actual: {
              min: 0,
              max: ranges[2],
              nice: false,
            },
            target: {
              min: 0,
              max: ranges[2],
              nice: false,
            },
          };
          y += yGap + 0.125;
          return (
            <View
              key={index}
              start={{
                x: 0,
                y: y,
              }}
              end={{
                x: 1,
                y: y + yGap,
              }}
              data={[data]}
              scale={cols}
            >
              <Coord transpose />
              <Axis name="actual" position="right" />
              <Axis name="target" visible={false} />
              <Geom
                type="point"
                position="title*target"
                color="#square"
                shape="line"
                size={12}
                style={{
                  lineWidth: 2,
                }}
              />
              <Geom
                type="interval"
                position="title*actual"
                color="#223273"
                size={15}
              />
              <Guide>
                <Region
                  start={[-1, 0]}
                  end={[1, ranges[0]]}
                  style={{
                    fill: '#FFA39E',
                    fillOpacity: 0.85,
                  }}
                />
                <Region
                  start={[-1, ranges[0]]}
                  end={[1, ranges[1]]}
                  style={{
                    fill: '#FFD591',
                    fillOpacity: 0.85,
                  }}
                />
                <Region
                  start={[-1, ranges[1]]}
                  end={[1, ranges[2]]}
                  style={{
                    fill: '#A7E8B4',
                    fillOpacity: 0.85,
                  }}
                />
              </Guide>
            </View>
          );
        })}
      </Chart>
    </div>
  );
};

export default Bulletgraph;
