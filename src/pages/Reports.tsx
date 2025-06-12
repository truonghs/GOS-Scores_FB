import { scoresApi } from "@/apis/scores.api";
import { useApi, useWindowSize } from "@/hooks";
import { IScoresOnTopGroupA } from "@/interfaces";
import { LEVELS } from "@/utils/common";
import { message, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export function Reports() {
  const [statisticsData, setStatisticsData] = useState();
  const [topGroupAData, setTopGroupAData] = useState<IScoresOnTopGroupA[]>();
  const windowSize = useWindowSize();

  const { loading: callScoresApiLoading, callApi: callScoresApi } = useApi<void>();
  const fetchStatisticsData = async () => {
    callScoresApi(async () => {
      const data = await scoresApi.getStatistics();
      if (data.data) {
        setStatisticsData(data.data);
      } else {
        message.error("Server error!");
      }
    });
  };
  const fetchTopGroupA = async () => {
    callScoresApi(async () => {
      const data = await scoresApi.getTopGroupA();
      if (data.data) {
        data.data.forEach((item: IScoresOnTopGroupA) => {
          item.total = item.toan + item.vat_li + item.hoa_hoc;
        });
        const sortedData = [...data.data].sort((a, b) => b.total - a.total);
        setTopGroupAData(sortedData);
      } else {
        message.error("Server error!");
      }
    });
  };
  useEffect(() => {
    fetchStatisticsData();
    fetchTopGroupA();
  }, []);

  const columns: ColumnsType<any> = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (_, __, index) => (index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1),
    },
    {
      title: "SBD",
      dataIndex: ["student", "sbd"],
      key: "sbd",
      render: (text, _, index) => <span style={index < 3 ? { fontWeight: 600 } : {}}>{text}</span>,
    },
    {
      title: "Toan",
      dataIndex: "toan",
      key: "toan",
      render: (text, _, index) => <span style={index < 3 ? { fontWeight: 600 } : {}}>{text}</span>,
    },
    {
      title: "Vat ly",
      dataIndex: "vat_li",
      key: "vat_li",
      render: (text, _, index) => <span style={index < 3 ? { fontWeight: 600 } : {}}>{text}</span>,
    },
    {
      title: "Hoa hoc",
      dataIndex: "hoa_hoc",
      key: "hoa_hoc",
      render: (text, _, index) => <span style={index < 3 ? { fontWeight: 600 } : {}}>{text}</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, _, index) => <span style={index < 3 ? { fontWeight: 600 } : {}}>{text}</span>,
    },
  ];

  return (
    <div className={`flex md:mt-8 sm:p-10 sm:gap-2 gap-8 p-2 ${windowSize.width > 1200 ? "" : "flex-col"}`}>
      <div className="flex-[3] h-[780px] gold-soft-bg rounded-lg shadow-lg px-4 pb-12 pt-8  border-dashed border-2 border-amber-400 flex flex-col items-center gap-6">
        <div className="text-5xl font-bold animate-gradient-text font-serif text-stroke ">Leaderboard</div>
        <div className="gold-soft-bg w-full border-amber-700 border text-[#5C3A0]">
          <Table
            dataSource={topGroupAData}
            columns={columns}
            pagination={false}
            loading={callScoresApiLoading}
            rowClassName={(_, index) => (index === 0 ? "bg-yellow-200" : index === 1 ? "bg-gray-200" : index === 2 ? "bg-orange-200" : "")}
            scroll={{ x: "fit-content" }}
          />
        </div>
      </div>
      <div className={`${statisticsData ? " bg-slate-100" : "bg-gray-200"} rounded-lg shadow-lg  flex-[5] overflow-x-auto `}>
        <div className="min-w-[400px]  md:p-8 p-2 h-[780px]">
          {!statisticsData ? (
            <Spin />
          ) : (
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
                title="The chart shows the score distribution of each subject."
                maxBarSize={40}
              >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="subject" />

                <YAxis width={30} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey={LEVELS.WEAK} stackId="a" fill="red" />
                <Bar dataKey={LEVELS.AVERAGE} stackId="a" fill="orange" />
                <Bar dataKey={LEVELS.GOOD} stackId="a" fill="blue" />
                <Bar dataKey={LEVELS.EXCELLENT} stackId="a" fill="lime" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
