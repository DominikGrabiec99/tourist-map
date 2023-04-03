import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5geodata_data_countries2 from '@amcharts/amcharts5-geodata/data/countries2';

const useGlobalMap = () => {
  const pickedCountry = ref();
  const isMapLoading = ref(false);
  let polygonSeries: am5map.MapPolygonSeries;
  let chart: am5map.MapChart;


  const getUserCountryIdLocalization = () => {
      return Intl.DateTimeFormat().resolvedOptions().locale.toUpperCase();
  };

  const setPickedCountry = (country: any, id: string) => {
    pickedCountry.value = {
      ...country,
      id
    }
  };

  const init = (container: HTMLElement) => {
    if (!container) return;
    isMapLoading.value = true;
    let root = am5.Root.new(container as HTMLElement);

    root.setThemes([am5themes_Animated.new(root)]);

    chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );

    polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      toggleKey: 'active',
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: root.interfaceColors.get('primaryButtonHover'),
    });

    polygonSeries.mapPolygons.template.states.create('active', {
      fill: root.interfaceColors.get('primaryButtonHover'),
    });

    let backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get('alternativeBackground'),
      fillOpacity: 0.1,
      strokeOpacity: 0,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    let previousPolygon: any;
    polygonSeries.mapPolygons.template.on('active', function (active, target) {
      if (previousPolygon && previousPolygon != target) {
        previousPolygon.set('active', false);
      }
      // @ts-ignore
      selectCountry(target!.dataItem!.get('id') as string);
      previousPolygon = target;
    });
    // Uncomment this to pre-center the globe on a country when it loads
    polygonSeries.events.on('datavalidated', function () {
      selectCountry(getUserCountryIdLocalization(), true);
    });

    // Make stuff animate on load
    chart.appear(1000, 100);
    isMapLoading.value = false;
  };

  function selectCountry(id: string, isInitSet = false) {
    if (!polygonSeries || !chart) return;
    let dataItem = polygonSeries.getDataItemById(id);
    if (!dataItem) {
      setPickedCountry(null, '')
      return;
    }
    if(!isInitSet) {
      setPickedCountry(am5geodata_data_countries2[id], id)
    }
    let target = dataItem.get('mapPolygon');
    if (!target) return;
    let centroid = target.geoCentroid();
    if (centroid) {
      chart.animate({
        key: 'rotationX',
        to: -centroid.longitude,
        duration: 1500,
        easing: am5.ease.inOut(am5.ease.cubic),
      });
      chart.animate({
        key: 'rotationY',
        to: -centroid.latitude,
        duration: 1500,
        easing: am5.ease.inOut(am5.ease.cubic),
      });
    }
  }

  return {
    pickedCountry,
    selectCountry,
    init,
    isMapLoading
  };
};

export default useGlobalMap;
