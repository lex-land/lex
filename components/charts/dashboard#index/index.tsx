import './index.less';
import { Map, Marker, MarkerList } from 'react-bmap';
import React, { useState } from 'react';
import { Icon } from 'antd';
import styleJson from './style.json';

interface MapProps {
  points: any[];
}

export default (props: MapProps) => {
  const points = props.points;
  const [info, setInfo] = useState({ visible: false, activeIndex: 0 });
  const data = points.map(i => ({
    text: '',
    location: [i.lng, i.lat].join(','),
  }));
  const activePoint = points[info.activeIndex] || {
    lng: '121.482782',
    lat: '31.207978',
  };
  return (
    <Map
      className="bmap"
      mapStyleV2={{ styleJson }}
      center={{ lng: 121.482782, lat: 31.207978 }}
      zoom="10"
      style={{ height: '100%' }}
      enableScrollWheelZoom
    >
      <MarkerList
        data={data}
        fillStyle="#ff3333"
        animation={true}
        isShowShadow={false}
        multiple={true}
        autoViewport={true}
        onClick={(activeIndex: number) => {
          setInfo({ visible: true, activeIndex });
        }}
      />
      {info.visible && data.length > 0 && (
        <Marker position={activePoint} offset={new BMap.Size(-103, -150)}>
          <div className="infowindow">
            <div
              onClick={() => setInfo({ visible: false, activeIndex: 0 })}
              className="infowindow__close"
            >
              <Icon type="close" />
            </div>
            <div className="infowindow__arrow ant-popover-arrow" />
            <h4 className="infowindow__title">{activePoint.store_name}</h4>
            <p className="infowindow__content">
              交易额(万元) <span className="value">{activePoint.sales}</span>
              <br />
              交易数(笔)
              <span className="value">{activePoint.transaction}</span> <br />
              单笔交易额(元/笔) <span className="value">{activePoint.ats}</span>
              <br />
              坪效(元/m2) <span className="value">{activePoint.spm}</span>
            </p>
          </div>
        </Marker>
      )}
    </Map>
  );
};
