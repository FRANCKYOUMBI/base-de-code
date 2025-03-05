import BrushBarChart from "./brush-bar-chart";
import CustomShapeBarChart from "./custom-shape-bar-chart";
import CustomizedDotLineChart from "./customized-dot-line-chart";
import CustomizedMixChart from "./customized-mix-chart";
import MixBarChart from "./mix-bar-chart";
import RadialBarChart from "./radial-bar-chart";
import SimpleAreaChart from "./simple-area-chart";
import SimpleBarChart from "./simple-bar-chart";
import SimpleLineChart from "./simple-line-chart";
import SimpleRadarChart from "./simple-radar-chart";
import StackedAreaChart from "./stacked-area-chart";


export default function ChartWidgets() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:gap-8">
      <SimpleLineChart />
      <CustomizedDotLineChart />
      <SimpleBarChart />
      <MixBarChart />
      <CustomShapeBarChart />
      <BrushBarChart />
      <SimpleAreaChart />
      <StackedAreaChart />
      <SimpleRadarChart />
      <RadialBarChart />
      <CustomizedMixChart className="lg:col-span-2" />
    </div>
  );
}
