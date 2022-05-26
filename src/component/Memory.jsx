import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Memory = () => {
  const [ram, setRam] = useState({
    total: 0,
    used: 0,
    ratio: 0
  });
  const [ratio, setRatio] = useState([]);
  const [chart, setChart] = useState([[], {}]);

  const getMemory = useCallback(() => {
    axios
      .get("http://localhost:4000/hardware/memory")
      .then(({ data }) => {
        setRam(data.memory_usage);
        var arr = [...ratio];
        arr.push(data.memory_usage.ratio);
        setRatio(arr);
      })
      .catch((err) => console.log(err));
  }, [ratio]);

  // const getLineMemory = useCallback(() => {
  //   axios
  //     .get("http://localhost:4000/hardware/memory")
  //     .then((res) => {
  //       // console.log(ratio)
  //       var arr = [...ratio];
  //       arr.push(res.data.memory_usage.ratio);
  //       setRatio(arr);
  //       // console.log(arr);
  //     })
  //     .catch((err) => console.log(err));
  // }, [ratio]);

  // useEffect(() => {
  //   setInterval(() => getLineMemory(), 5000);
  // }, [getLineMemory]);
  // useEffect(() => {
  //   console.log(ratio);
  // }, [ratio]);

  const func = useCallback((count, total = 100, name) => {
    // console.log(count);
    var series = [];
    if (total === 100) {
      series.push(Number(count));
      series.push(total - Number(count));
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
                fontSize: "24px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 900,
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
  }, []);

  useLayoutEffect(() => {
    setInterval(() => getMemory(), 5000);
  }, [getMemory]);
  useLayoutEffect(() => {
    setChart(func(ram.used, ram.total, "Memory"));
  }, [ram, func]);

  var lineOptions = {
    series: [
      {
        data: ratio.slice()
      }
    ],
    chart: {
      id: "realtime",
      height: 350,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 5000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    markers: {
      size: 0
    },
    yaxis: {
      max: 100
    },
    xaxis: {
      labels: { show: false }
    },
    legend: {
      show: false
    },
    colors: ["#006888"]
  };

  return (
    <Container>
      <div>
        <ReactApexChart
          type="donut"
          options={chart?.[1]}
          series={chart?.[0]}
          height="300px"
        />
      </div>
      <div>
        <ReactApexChart
          type="line"
          options={lineOptions}
          series={[{ data: ratio.slice() }]}
          height="300px"
          width="500px"
        />
      </div>
    </Container>
  );
};

export default Memory;
