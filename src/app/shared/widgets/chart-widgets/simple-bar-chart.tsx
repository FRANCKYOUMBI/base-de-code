'use client';

import WidgetCard from "@/app/[lang]/(hydrogen)/widgets/cards/widget-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';
import { useTranslation } from '@/app/i18n/client';
import { CustomTooltip } from "@/app/[lang]/(hydrogen)/widgets/charts/custom-tooltip";

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

export default function SimpleBarChart({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
  const isMediumScreen = useMedia('(max-width: 1200px)', false);
  const { t } = useTranslation(lang!);

  return (
    <WidgetCard title={t('text-simple-bar-chart')} className={className}>
      <div className="mt-5 aspect-[1060/660] w-full lg:mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={isMediumScreen ? 18 : 24}
            margin={{
              left: -10,
            }}
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tickLine={false} dataKey="name" />
            <YAxis tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="pv" fill="#5a5fd7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="uv" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
