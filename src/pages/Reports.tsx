import { scoresApi } from "@/apis/scores.api";
import { useApi } from "@/hooks";
import { LEVELS } from "@/utils/common";
import { Button, message, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Reports() {
  const [statisticsData, setStatisticsData] = useState();
  const { loading: callScoresApiLoading, callApi: callScoresApi } = useApi<void>();
  const fetchScores = async () => {
    callScoresApi(async () => {
      const data = await scoresApi.getStatistics();
      if (data.data) {
        setStatisticsData(data.data);
        console.log(data.data);
      } else {
        message.error("Server error!");
      }
    });
  };
  useEffect(() => {
    fetchScores();
  }, []);
  return (
    <div className="flex - flex-col md:gap-10 gap-2 md:mt-8 md:p-10 p-4">
      <div className="flex gap-4">
        <div className="flex-1 bg-slate-100 rounded-lg shadow-md md:p-8 p-4"></div>
        <div className="flex-1 bg-slate-100 rounded-lg shadow-md md:p-8 p-4"></div>
      </div>
      <div className="overflow-scroll">
        <div className={`h-96 md:h-96 ${statisticsData ? "bg-slate-100" : "bg-gray-200"} rounded-lg shadow-md md:p-8 p-2 min-w-[400px]`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={statisticsData}
              margin={{
                top: 12,
                right: 16,
                left: 12,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Bar dataKey={LEVELS.WEAK} stackId="a" fill="red" />
              <Bar dataKey={LEVELS.AVERAGE} stackId="a" fill="orange" />
              <Bar dataKey={LEVELS.GOOD} stackId="a" fill="blue" />
              <Bar dataKey={LEVELS.EXCELLENT} stackId="a" fill="lime" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
          {!statisticsData && <Spin />}
        </div>
      </div>
    </div>
  );
}
