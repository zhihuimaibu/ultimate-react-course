import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useEffect } from "react";

window._AMapSecurityConfig = {
  securityJsCode: "59bc580bf641b10fb890c36116c2d60e",
};

function Map() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat") || 110.397428;
  const lng = searchParams.get("lng") || 39.90923;

  const position = [lat, lng];

  useEffect(() => {
    let map = null;
    AMapLoader.load({
      key: "81b3ee31c8a050980b271d2e799189f7", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Marker"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 5, // 初始化地图级别
          center: position, // 初始化地图中心点位置
        });
        const marker = new AMap.Marker({
          position,
        });
        map.add(marker);
        map.on("click", handleClick);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  });

  function handleClick(e) {
    console.log(e);
    navigate(`form?lat=${e.lnglat.lat}&lng=${e.lnglat.lng}`);
  }

  return (
    <div id="container" className={styles.mapContainer}>
      {position}
    </div>
  );
}

export default Map;
