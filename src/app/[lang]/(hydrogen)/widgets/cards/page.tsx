'use client';

import { routes } from '@/config/routes';
import { Title } from 'rizzui';
import cn from '@/ui/class-names';
import MetricCardWithBarChart from '@/app/shared/widgets/dashboard/analytics-dashboard/stat-cards';
import MetricCardsWithIcon from '@/app/shared/widgets/dashboard/stat-cards';
import ParticipantsList from './participants-list';
import TransactionsList from './transactions-list';
import RecentAppList from './recent-app-list';
import CircleProgressBars from './circle-progressbars';
import AreaChartList from './area-chart-list';
import BarChartList from './bar-chart-list';
import { useTranslation } from '@/app/i18n/client';
import PageHeader from '@/components/page-header';
import { FileStatGrid } from '@/app/shared/widgets/dashboard/file-stats';

const pageHeader = {
  title: 'text-cards',
  breadcrumb: [
    {
      href: routes.admin,
      name: 'text-home',
    },
    {
      href: routes.widgets.cards,
      name: 'text-widgets',
    },
    {
      name: 'text-cards',
    },
  ],
};

function SectionBlock({
  title,
  titleClassName,
  children,
  className,
  lang,
}: React.PropsWithChildren<{
  title?: string;
  titleClassName?: string;
  className?: string;
  lang?: string;
}>) {
  const { t } = useTranslation(lang!, 'common');

  return (
    <section className={className}>
      <header className="mb-2.5 lg:mb-3">
        <Title
          as="h5"
          className={cn(
            'mb-2 text-sm font-normal text-gray-700 sm:text-base',
            titleClassName
          )}
        >
          {t(title!)}
        </Title>
      </header>

      {children}
    </section>
  );
}

export default function CardsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="grid grid-cols-1 gap-6 @container 3xl:gap-8">
        <SectionBlock title="text-metric-card-icon">
          <MetricCardsWithIcon className="@2xl:grid-cols-2 @6xl:grid-cols-4 4xl:gap-8" />
        </SectionBlock>

        <SectionBlock title="text-metric-card-progressBar">
          <div className="grid grid-cols-1 gap-5 @xl:grid-cols-2 @6xl:grid-cols-4 3xl:gap-8">
            <FileStatGrid />
          </div>
        </SectionBlock>

        <SectionBlock title="text-metric-card-bar-chart">
          <MetricCardWithBarChart className="grid-cols-1 @xl:grid-cols-2 @6xl:grid-cols-4 4xl:gap-8" />
        </SectionBlock>

        <SectionBlock title="text-widget-card-list-chart">
          <div className="grid grid-cols-1 gap-5 @2xl:grid-cols-2 @[90rem]:grid-cols-4 3xl:gap-8">
            <BarChartList />
            <ParticipantsList />
            <RecentAppList />
            <TransactionsList />
            <AreaChartList />
            <CircleProgressBars />
          </div>
        </SectionBlock>
      </div>
    </>
  );
}
