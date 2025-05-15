/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardSubTitle,
    CardTitle,
} from '../../../../components/bootstrap/Card';
import Chart, { IChartOptions } from '../../../../components/extras/Chart';

const BarCustomLabel = () => {
    const [state] = useState<IChartOptions>({
        series: [
            {
                name: 'Working Days',
                data: [22, 20, 23, 21, 22, 21, 23, 22, 21, 22, 21, 22], // Monthly working days
            },
            {
                name: 'Holidays',
                data: [2, 3, 1, 2, 2, 3, 1, 2, 3, 2, 3, 2], // Monthly holidays
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 380,
                stacked: true, // Enable stacked bar chart
            },
            plotOptions: {
                bar: {
                    horizontal: false, // Vertical bars
                    columnWidth: '50%',
                },
            },
            colors: ['#c72c397b', '#098cf77f'], // Green for working days, red for holidays
            dataLabels: {
                enabled: true,
                formatter(val) {
                    return `${val}`;
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff'],
            },
            xaxis: {
                categories: [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                ], // Months
                title: {
                    text: 'Months',
                },
            },
            yaxis: {
                title: {
                    text: 'Days',
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'center',
            },
            title: {
                text: 'Working Days vs Holidays (Monthly)',
                align: 'center',
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter(val) {
                        return `${val} days`;
                    },
                },
            },
        },
    });

    return (
        <div className='col-lg-12'>
            <Card stretch>
                <CardHeader>
                    <CardLabel icon='StackedBarChart'>
                        <CardTitle>
                            Working Days vs Holidays
                        </CardTitle>
                        <CardSubTitle>Monthly and Yearly Overview</CardSubTitle>
                    </CardLabel>
                </CardHeader>
                <CardBody>
                    <Chart series={state.series} options={state.options} type='bar' height={400} />
                </CardBody>
            </Card>
        </div>
    );
};

export default BarCustomLabel;
