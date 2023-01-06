/* eslint-disable wrap-iife */
import HighCharts from 'highcharts';

export function injectHeightFn() {
  const each = HighCharts.each;
  const round = Math.round;
  const cos = Math.cos;
  const sin = Math.sin;
  const deg2rad = HighCharts.deg2rad;
  HighCharts.wrap(
    HighCharts.seriesTypes.pie.prototype,
    'translate',
    function (proceed) {
      proceed.apply(this, [].slice.call(arguments, 1));
      // Do not do this if the chart is not 3D
      if (!this.chart.is3d()) {
        return;
      }
      const series = this;
      const chart = series.chart;
      const options = chart.options;
      const seriesOptions = series.options;
      const depth = seriesOptions.depth || 0;
      const options3d = options.chart.options3d;
      const alpha = options3d.alpha;
      const beta = options3d.beta;
      let z = seriesOptions.stacking
        ? (seriesOptions.stack || 0) * depth
        : series._i * depth;
      z += depth / 2;
      if (seriesOptions.grouping !== false) {
        z = 0;
      }
      each(series.data, (point) => {
        const shapeArgs = point.shapeArgs;
        let angle;
        point.shapeType = 'arc3d';
        const ran = point.options.h;
        shapeArgs.z = z;
        shapeArgs.depth = depth * 0.75 + ran;
        shapeArgs.alpha = alpha;
        shapeArgs.beta = beta;
        shapeArgs.center = series.center;
        shapeArgs.ran = ran;
        angle = (shapeArgs.end + shapeArgs.start) / 2;
        point.slicedTranslation = {
          translateX: round(
            cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
          ),
          translateY: round(
            sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
          )
        };
      });
    }
  );

  (function (H) {
    // eslint-disable-next-line func-names
    H.wrap(HighCharts.SVGRenderer.prototype, 'arc3dPath', function (proceed) {
      // Run original proceed method
      const ret = proceed.apply(this, [].slice.call(arguments, 1));
      ret.zTop = (ret.zOut + 0.5) / 100;
      return ret;
    });
  })(HighCharts);
}
