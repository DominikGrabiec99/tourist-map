import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import countries2 from '@amcharts/amcharts5-geodata/data/countries2';

const useCountrylMap = () => {
  const isMapLoading = ref(false);

  let chart: any;
  let polygonSeries: any;
  let root: any;

  const init = (container: HTMLElement, countryCode: string) => {
    if (!container && !countryCode) return;
    isMapLoading.value = true;
    root = am5.Root.new(container as HTMLElement);

    root.setThemes([am5themes_Animated.new(root)]);

    chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout,
      })
    );

    loadGeodata(countryCode.toUpperCase());

    polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        calculateAggregates: true,
        valueField: 'value',
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0x677935),
    });

    polygonSeries.set('heatRules', [
      {
        target: polygonSeries.mapPolygons.template,
        dataField: 'value',
        min: am5.color(0x8ab7ff),
        max: am5.color(0x25529a),
        key: 'fill',
      },
    ]);

    isMapLoading.value = false;
  };

  function loadGeodata(country: string) {
    let defaultMap = 'usaLow';

    if (country == 'US') {
      chart.set('projection', am5map.geoAlbersUsa());
    } else {
      chart.set('projection', am5map.geoMercator());
    }

    let currentMap = defaultMap;
    let title = '';
    if (countries2[country] !== undefined) {
      currentMap = countries2[country]['maps'][0];
    }

    am5.net
      .load(
        'https://cdn.amcharts.com/lib/5/geodata/json/' + currentMap + '.json',
        chart
      )
      .then(function (result) {
        let geodata = am5.JSONParser.parse(result.response || '');
        let data = [];
        for (var i = 0; i < geodata.features.length; i++) {
          data.push({
            id: geodata.features[i].id,
            value: Math.round(Math.random() * 10000),
          });
        }

        polygonSeries.set('geoJSON', geodata);
        polygonSeries.data.setAll(data);
      });

    chart.seriesContainer.children.push(
      am5.Label.new(root, {
        x: 5,
        y: 5,
        text: title,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0.2,
        }),
      })
    );
  }

  return {
    isMapLoading,
    init,
  };
};

export default useCountrylMap;
