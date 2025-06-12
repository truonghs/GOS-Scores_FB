import { scoresApi } from "@/apis/scores.api";
import { useApi, useWindowSize } from "@/hooks";
import { IStudentWithScores } from "@/interfaces";
import { icons } from "@/utils";
import { Button, Input, message, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

export const SearchScores = () => {
  const [Sbd, setSbd] = useState<string>("");
  const [scoresData, setScoresData] = useState<IStudentWithScores | undefined>();
  const windowSize = useWindowSize();

  const { loading: callScoresApiLoading, callApi: callScoresApi } = useApi<void>();

  const fetchScores = async () => {
    if (Sbd) {
      callScoresApi(async () => {
        const data = await scoresApi.getScores(Sbd);
        if (data.data) {
          setScoresData(data.data);
        } else {
          message.error("Registration number invalid!");
        }
      });
    } else {
      setScoresData(undefined);
      message.error("Registration number can not be empty!");
    }
  };

  const columns: ColumnsType<IStudentWithScores> = [
    {
      title: "Số Báo Danh",
      dataIndex: "sbd",
      key: "sbd",
    },
    {
      title: "Toán",
      key: "toan",
      render: (_, record) => record.scores?.toan,
    },
    {
      title: "Ngữ văn",
      key: "ngu_van",
      render: (_, record) => record.scores?.ngu_van,
    },
    {
      title: "Ngoại ngữ",
      key: "ngoai_ngu",
      render: (_, record) => record.scores?.ngoai_ngu,
    },
    {
      title: "Vật lí",
      key: "vat_li",
      render: (_, record) => record.scores?.vat_li,
    },
    {
      title: "Hóa học",
      key: "hoa_hoc",
      render: (_, record) => record.scores?.hoa_hoc,
    },
    {
      title: "Sinh học",
      key: "sinh_hoc",
      render: (_, record) => record.scores?.sinh_hoc,
    },
    {
      title: "Lịch sử",
      key: "lich_su",
      render: (_, record) => record.scores?.lich_su,
    },
    {
      title: "Địa lí",
      key: "dia_li",
      render: (_, record) => record.scores?.dia_li,
    },
    {
      title: "GDCD",
      key: "gdcd",
      render: (_, record) => record.scores?.gdcd,
    },
    {
      title: "Mã ngoại ngữ",
      dataIndex: "ma_ngoai_ngu",
      key: "ma_ngoai_ngu",
    },
  ];

  return (
    <div className="flex flex-col md:p-10 p-4 md:gap-10 gap-4">
      <div className="bg-slate-100 rounded-lg shadow-md md:p-8 p-4 flex items-start flex-col gap-4">
        <div className="font-bold md:text-3xl text-xl">User Registration</div>
        <div className="md:text-xl text-base ">Registration Number</div>
        <div className="flex w-full gap-4  items-center">
          <Input className="" type="text" placeholder="Enter registration number" size="large" value={Sbd} onChange={(e) => setSbd(e.target.value)} />
          <Button size={"large"} color="green" variant="solid" onClick={fetchScores}>
            {windowSize.width > 640 ? "Submit" : icons.check}
          </Button>
        </div>
      </div>
      <div className="bg-slate-100  rounded-lg shadow-md md:p-8 p-4 flex items-start flex-col gap-4">
        <div className="font-bold md:text-3xl text-xl">Detailed Scores</div>
        <Table
          className="w-full max-w-full"
          dataSource={scoresData ? [scoresData] : []}
          loading={callScoresApiLoading}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.sbd}
          size={"large"}
          scroll={{ x: "fit-content" }}
        />
      </div>
    </div>
  );
};
