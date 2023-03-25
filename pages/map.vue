<template>
  <div id="chartdiv" ref="chartdiv" />
</template>

<script lang="ts" setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";

const chartdiv = ref<HTMLElement>();
const pickedCountry = ref();

onMounted(() => {
  let root = am5.Root.new(chartdiv.value as HTMLElement);

  root.setThemes([am5themes_Animated.new(root)]);

  let chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "rotateY",
      projection: am5map.geoOrthographic(),
      paddingBottom: 20,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    })
  );

  let polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
    })
  );

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}",
    toggleKey: "active",
    interactive: true,
  });

  polygonSeries.mapPolygons.template.states.create("hover", {
    fill: root.interfaceColors.get("primaryButtonHover"),
  });

  polygonSeries.mapPolygons.template.states.create("active", {
    fill: root.interfaceColors.get("primaryButtonHover"),
  });

  let backgroundSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {})
  );
  backgroundSeries.mapPolygons.template.setAll({
    fill: root.interfaceColors.get("alternativeBackground"),
    fillOpacity: 0.1,
    strokeOpacity: 0,
  });
  backgroundSeries.data.push({
    geometry: am5map.getGeoRectangle(90, 180, -90, -180),
  });

  let previousPolygon;

  polygonSeries.mapPolygons.template.on("active", function (active, target) {
    if (previousPolygon && previousPolygon != target) {
      previousPolygon.set("active", false);
    }
    if (target!.get("active")) {
      selectCountry(target.dataItem.get("id"));
    }
    previousPolygon = target;
  });

  function selectCountry(id: string) {
    let dataItem = polygonSeries.getDataItemById(id);
    pickedCountry.value = am5geodata_data_countries2[id];
    let target = dataItem!.get("mapPolygon");
    if (target) {
      let centroid = target.geoCentroid();
      if (centroid) {
        chart.animate({
          key: "rotationX",
          to: -centroid.longitude,
          duration: 1500,
          easing: am5.ease.inOut(am5.ease.cubic),
        });
        chart.animate({
          key: "rotationY",
          to: -centroid.latitude,
          duration: 1500,
          easing: am5.ease.inOut(am5.ease.cubic),
        });
      }
    }
  }

  // Uncomment this to pre-center the globe on a country when it loads
  polygonSeries.events.on("datavalidated", function () {
    selectCountry("AU");
  });

  // Make stuff animate on load
  chart.appear(1000, 100);
});
</script>

<style scoped>
#chartdiv {
  width: 100%;
  height: 80vh;
  max-width: 100%;
}
</style>