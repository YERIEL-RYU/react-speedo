import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 30px;
`;
const Text = styled.div`
  padding-top: 25px;
  line-height: 2;
  font-weight: bold;
`;

const Card = () => {
  const [disk, setDisk] = useState({
    total_disk: 0,
    free_disk: 0,
    percentAvailable_disk: 0
  });
  const [chart, setChart] = useState([[], {}]);

  const getDisk = useCallback(() => {
    axios
      .get("http://localhost:4000/hardware/disk")
      .then((res) => setDisk(res.data.disk_info))
      .catch((err) => console.log(err));
  }, []);

  const func = useCallback((count, total = 100, name) => {
    // console.log(count);
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
    getDisk();
  }, [getDisk]);
  useLayoutEffect(() => {
    setChart(func(disk.percentAvailable_disk, 100, "하드디스크"));
  }, [disk, func]);

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
      <Text>
        <div>Total : {disk["total_disk "]} TB</div>
        <div>Free : {disk.free_disk} TB</div>
        <div>여유 공간 : {disk.percentAvailable_disk} %</div>
      </Text>
    </Container>
  );
};

export default Card;
