"use client";

import { Text } from "rizzui";
import cn from "@/ui/class-names";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { useTranslation } from "@/app/i18n/client";
import MetricCard from "@/app/[lang]/(hydrogen)/widgets/cards/metric-card";

const trafficData = [
  {
    day: "Sunday",
    sale: 4000,
    cost: 2400,
  },
  {
    day: "Monday",
    sale: 3000,
    cost: 1398,
  },
  {
    day: "Tuesday",
    sale: 2000,
    cost: 9800,
  },
  {
    day: "Wednesday",
    sale: 2780,
    cost: 3908,
  },
  {
    day: "Thursday",
    sale: 1890,
    cost: 4800,
  },
  {
    day: "Friday",
    sale: 2390,
    cost: 3800,
  },
  {
    day: "Saturday",
    sale: 3490,
    cost: 4300,
  },
];

const conventionRateData = [
  {
    day: "Sunday",
    sale: 2000,
    cost: 2400,
  },
  {
    day: "Monday",
    sale: 3000,
    cost: 1398,
  },
  {
    day: "Tuesday",
    sale: 2000,
    cost: 9800,
  },
  {
    day: "Wednesday",
    sale: 2780,
    cost: 3908,
  },
  {
    day: "Thursday",
    sale: 1890,
    cost: 4800,
  },
  {
    day: "Friday",
    sale: 2390,
    cost: 3800,
  },
  {
    day: "Saturday",
    sale: 3490,
    cost: 4300,
  },
];

const barData = [
  {
    day: "Sunday",
    sale: 2000,
    cost: 2400,
  },
  {
    day: "Monday",
    sale: 2800,
    cost: 1398,
  },
  {
    day: "Tuesday",
    sale: 3500,
    cost: 9800,
  },
  {
    day: "Wednesday",
    sale: 2780,
    cost: 3908,
  },
  {
    day: "Thursday",
    sale: 1890,
    cost: 4800,
  },
  {
    day: "Friday",
    sale: 2390,
    cost: 3800,
  },
  {
    day: "Saturday",
    sale: 3490,
    cost: 4300,
  },
];

const analyticsStatData = [
  {
    id: "1",
    title: "text-website-traffic",
    metric: "91.6K",
    info: "text-traffic-info",
    increased: true,
    decreased: false,
    percentage: "+32.40",
    fill: "#015DE1",
    chart: trafficData,
  },
  {
    id: "2",
    title: "text-conversion-rate",
    metric: "12.56%",
    info: "text-conversion-info",
    increased: false,
    decreased: true,
    percentage: "-4.40",
    fill: "#048848",
    chart: conventionRateData,
  },
  {
    id: "3",
    title: "text-bounce-rate",
    metric: "45.33%",
    info: "text-bounce-info",
    increased: true,
    decreased: false,
    percentage: "+32.40",
    fill: "#B92E5D",
    chart: barData,
  },
  {
    id: "4",
    title: "text-session-duration",
    metric: "2.30 hrs",
    info: "text-session-info",
    increased: true,
    decreased: false,
    percentage: "+32.40",
    fill: "#8200E9",
    chart: barData,
  },
];

export default function StatCards({ className, lang }: { className?: string; lang?: string }) {
  const { t } = useTranslation(lang!, 'common');

  return (
    <div
      className={cn("grid grid-cols-1 gap-5 3xl:gap-8 4xl:gap-9", className)}
    >
      {analyticsStatData.map((stat) => (
        <MetricCard
          key={stat.title + stat.id}
          title={t(stat.title)}
          metric={stat.metric}
          rounded="lg"
          metricClassName="text-2xl mt-1"
          info={
            <Text className="mt-4 max-w-[150px] text-sm text-gray-500">
              {t(stat.info)}
            </Text>
          }
          chart={
            <>
              <div
                style={{ color: stat.fill }}
                className="mb-3 text-sm font-medium"
              >
                {stat.percentage}%
              </div>
              <div className="h-12 w-20 @[16.25rem]:h-16 @[16.25rem]:w-24 @xs:h-20 @xs:w-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart barSize={6} barGap={5} data={stat.chart}>
                    <Bar
                      dataKey="sale"
                      fill={stat.fill}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          }
          chartClassName="flex flex-col w-auto h-auto text-center"
          className="@container @7xl:text-[15px] [&>div]:items-end"
        />
      ))}
    </div>
  );
}
