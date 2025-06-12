export interface IStudent {
  id: number;
  sbd: string;
  ma_ngoai_ngu: string;
}
export interface IStudentWithScores {
  sbd: string;
  ho_ten: string;
  ma_ngoai_ngu: string;
  scores: {
    toan: number | null;
    ngu_van: number | null;
    ngoai_ngu: number | null;
    vat_li: number | null;
    hoa_hoc: number | null;
    sinh_hoc: number | null;
    lich_su: number | null;
    dia_li: number | null;
    gdcd: number | null;
  };
}
export interface IScores {
  id: number;
  toan: number;
  ngu_van: number;
  ngoai_ngu: number;
  vat_li: number;
  hoa_hoc: number;
  sinh_hoc: number;
  lich_su: number;
  dia_li: number;
  gdcd: number;
  student: IStudent;
}

export interface IScoresOnTopGroupA {
  id: number;
  sbd: string;
  toan: number;
  vat_li: number;
  hoa_hoc: number;
  total: number;
}
