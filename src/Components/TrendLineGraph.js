import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
const options = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    hover: {
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'PC',
      'Wireless',
      'Baby',
      'Office Products',
      'Beauty',
      'Health & Personal Care',
      'Toys',
      'Kitchen',
      'Furniture',
      'Electronics',
      'Camera',
      'Sports',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 10,
  },
};

const TrendLineGraph = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Genuine Reviews',
        data: [5, 2, 1, 1, 2, 0, 2, 4, 1, 5, 2, 2],
      },
      {
        name: 'Fake Reviews',
        data: [0, 1, 0, 1, 1, 0, 2, 2, 1, 2, 1, 1],
      },
    ],
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke  px-5 pt-7.5 pb-5 shadow-default  xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">



        <div id="chartOne" className="-ml-5" >
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default TrendLineGraph;
