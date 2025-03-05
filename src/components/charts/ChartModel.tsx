"use client"
import dynamic from 'next/dynamic';
import React from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function generateDayWiseTimeSeries(baseval: number, count: number, yrange: { max: number, min: number }) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}

const areaOptions = (data:(number|undefined)[]) =>{
    return {
        series: [
            {
                name: 'Missions',
                data: data,
            }
        ] as any,
        options: {
            chart: {
                type: 'area',
                height: 350,
                stacked: true,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false,
                },

            },
            labels: [
                "Lundi",
                "Mardi",
                "Mercredi",
                "Jeudi",
                "Vendredi",
            ],
            colors: ['#826AF9', '#8e5b3e'],
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.6,
                    opacityTo: 0.8,
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left'
            },

        } as any,
    }
};

const barOptions = {

    series: [
        {
            name: 'Bar 1',
            data: [44, 55, 57]
        },
        {
            name: 'Bar 2',
            data: [76, 85, 101]
        },
        {
            name: 'Bar 3',
            data: [35, 41, 36]
        },
        {
            name: 'Bar 4',
            data: [60, 80, 50]
        }
    ],
    options: {
        chart: {
            type: 'bar',
            height: 260,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right'
        },
        xaxis: {
            categories: ['Photoshop', 'Illustrator', 'Xd'],
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val: string) {
                    return val
                }
            }
        }
    },
} as any;

export function ExtraAreaChart({data}: {data:(number|undefined)[]}) {
    return (
        <div>
            <ReactApexChart options={areaOptions(data).options} series={areaOptions(data).series} type='area' height={278} />
        </div>
    )
}

export function ExtraBarChart() {
    return (
        <ReactApexChart options={barOptions.options} series={barOptions.series} type="bar" height={260} />
    )
}
