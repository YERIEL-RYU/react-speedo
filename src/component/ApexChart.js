import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ApexChart = ({ data }) => {
  const func = (count, total = 100, name) => {
    console.log(count);
    var series = [];
    if (total === 100) {
      series.push(total - Number(count));
      series.push(Number(count));
    } else {
      var valNum = Math.round((count / total) * 100);
      series.push(valNum);
      series.push(100 - valNum);
    }
    const options = {
      chart: { type: "donut" },
      colors: ["#006888", "#eeeeee"],
      dataLabels: { enabled: false },
      legend: { show: false },
      tooltip: { enabled: false },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0
          }
        },
        hover: {
          filter: {
            type: "none",
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0
          }
        }
      },
      plotOptions: {
        pie: {
          startAngle: -80,
          endAngle: 80,
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                showAlways: true,
                label: name,
                formatter: function (w) {
                  return w.globals.seriesTotals[0] + "%";
                }
              },
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: undefined,
                offsetY: -50,
                formatter: function (val) {
                  return name;
                }
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
                color: undefined,
                offsetY: -40
              }
            }
          }
        }
      }
    };

    return [series, options];
  };

  useEffect(() => {
    console.log(data);
    var [series, options] = func(data.percentAvailable_disk, 100, "CPU");
    console.log(series);
    // console.log(options);
  }, [data]);

  // var series = [19, 81];

  return (
    <div>
      <ReactApexChart
        type="donut"
        options={func(data.percentAvailable_disk, 100, "하드디스크")[1]}
        series={func(data.percentAvailable_disk, 100, "하드디스크")[0]}
        height="300px"
      />
    </div>
  );
};

export default ApexChart;
