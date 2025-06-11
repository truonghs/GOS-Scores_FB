import { scoresApi } from "@/apis/scores.api";
import { useApi, useWindowSize } from "@/hooks";
import { IScores } from "@/interfaces";
import { icons } from "@/utils";
import { Button, Input, message, Table } from "antd";
import { useState } from "react";

export const SearchScores = () => {
  const [Sbd, setSbd] = useState<string>("");
  const [scoresData, setScoresData] = useState<IScores | undefined>();
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
      message.error("Registration number can not be empty!");
    }
  };

  const columns = [
    {
      title: "SBD",
      dataIndex: "sbd",
      key: "sbd",
    },
    {
      title: "Toan",
      dataIndex: "toan",
      key: "toan",
    },
    {
      title: "Ngu van",
      dataIndex: "ngu_van",
      key: "ngu_van",
    },
    {
      title: "Ngoai ngu",
      dataIndex: "ngoai_ngu",
      key: "ngoai_ngu",
    },
    {
      title: "Vat li",
      dataIndex: "vat_li",
      key: "vat_li",
    },
    {
      title: "Hoa hoc",
      dataIndex: "hoa_hoc",
      key: "hoa_hoc",
    },
    {
      title: "Sinh hoc",
      dataIndex: "sinh_hoc",
      key: "sinh_hoc",
    },
    {
      title: "Lich su",
      dataIndex: "lich_su",
      key: "lich_su",
    },
    {
      title: "Dia li",
      dataIndex: "Dia_li",
      key: "Dia_li",
    },
    {
      title: "GDCD",
      dataIndex: "gdcd",
      key: "gdcd",
    },
    {
      title: "Ma ngoai ngu",
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
      <div className="bg-slate-100  rounded-lg shadow-md p-8 flex items-start flex-col gap-4">
        <div className="font-bold md:text-3xl text-xl">Detailed Scores</div>
        <Table
          className="w-full max-w-full"
          dataSource={scoresData ? [scoresData] : []}
          loading={callScoresApiLoading}
          columns={columns}
          pagination={false}
          rowKey={(record: IScores) => record?.sbd}
          size={"large"}
          scroll={{ x: "fit-content" }}
        />
      </div>
    </div>
  );
};
