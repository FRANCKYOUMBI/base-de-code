'use client';

import { useTranslation } from '@/app/i18n/client';
import WidgetCard from "@/app/[lang]/(hydrogen)/widgets/cards/widget-card";
import SimpleRadarChartComponent from '@/components/simple-radar-chart';
import cn from '@/ui/class-names';

const data = [
  {
    month: 'Jan',
    A: 120,
    B: 110,
    totalSales: 230,
  },
  {
    month: 'Mar',
    A: 100,
    B: 130,
    totalSales: 230,
  },
  {
    month: 'May',
    A: 86,
    B: 130,
    totalSales: 213,
  },
  {
    month: 'Jul',
    A: 99,
    B: 100,
    totalSales: 199,
  },
  {
    month: 'Sep',
    A: 85,
    B: 90,
    totalSales: 175,
  },
  {
    month: 'Nov',
    A: 65,
    B: 85,
    totalSales: 140,
  },
];

export default function SimpleRadarChart({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
  const { t } = useTranslation(lang!);

  return (
    <WidgetCard
      title={t('text-simple-radar-chart')}
      className={cn('@container', className)}
    >
      <div className="mt-5 h-96 w-full pb-2 @sm:h-96 @xl:pb-0 @2xl:aspect-[1060/660] @2xl:h-auto lg:mt-7">
        <SimpleRadarChartComponent
          data={data}
          dataKey="month"
          radarKey={'A'}
          fill="#D7E3FE"
          stroke="#3872FA"
        />
      </div>
    </WidgetCard>
  );
}
