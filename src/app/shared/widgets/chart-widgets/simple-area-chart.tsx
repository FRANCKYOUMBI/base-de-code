'use client';

import { useTranslation } from '@/app/i18n/client';
import WidgetCard from "@/app/[lang]/(hydrogen)/widgets/cards/widget-card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CustomTooltip } from '@/app/[lang]/(hydrogen)/widgets/charts/custom-tooltip';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function SimpleAreaChart({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
  const { t } = useTranslation(lang!);

  return (
    <WidgetCard title={t('text-simple-area-chart')} className={className}>
      <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              left: -20,
            }}
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            <defs>
              <linearGradient id="simpleAreaChart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#3872FA"
                  className="[stop-opacity:0.3] dark:[stop-opacity:0.2]"
                />
                <stop offset="95%" stopColor={'#3872FA'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#3872FA"
              fill="url(#simpleAreaChart)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
