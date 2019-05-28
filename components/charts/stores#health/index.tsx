// data-set 可以按需引入，除此之外不要引入别的包
import './wave.less';
import { Chart, Geom, Guide } from 'bizcharts';
import React from 'react';

export default (props: any) => {
  const score = props.score;
  const data = [
    {
      gender: 'middle',
      path:
        'M381.759 0h292l-.64 295.328-100.127-100.096-94.368 94.368C499.808 326.848 512 369.824 512 415.712c0 141.376-114.56 256-256 256-141.376 0-256-114.624-256-256s114.624-256 256-256c48.8 0 94.272 13.92 133.12 37.632l93.376-94.592L381.76 0zM128.032 415.744c0 70.688 57.312 128 128 128s128-57.312 128-128-57.312-128-128-128-128 57.312-128 128z',
      value: 30,
    },
  ];

  const scale = {
    value: {
      min: 0,
      max: 100,
    },
  };
  const color = ['#ff5a62', '#ff9a0f', 'rgba(24, 144, 255, 1)'];
  const healStat = ['不健康', '亚健康', '健康'];
  let activeColor = color[2];
  let activeHealStat = healStat[2];
  if (score < 60) {
    activeColor = color[0];
    activeHealStat = healStat[0];
  }
  if (score >= 60 && score < 80) {
    activeColor = color[1];
    activeHealStat = healStat[1];
  }
  return (
    <div className="wave__chart" style={{ width: 400, margin: '0 auto' }}>
      <Chart padding={30} forceFit height={231} data={data} scale={scale}>
        <Geom
          type="interval"
          position="gender*value"
          color={activeColor}
          shape="liquid-fill-gauge"
          style={{
            lineWidth: 2,
            opacity: 0.9,
          }}
        />
        <Guide>
          <Guide.Html
            html={`<div class="guide">
            <div class="score">${score}分<div>
            <div class="stat" style="color:${activeColor}">${activeHealStat}</div>
            </div>`}
            zIndex={2}
            position={['50%', '38%']}
          />
        </Guide>
      </Chart>
    </div>
  );
};
