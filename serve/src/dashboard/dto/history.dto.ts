export type HistoryProps = {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export class HistoryDTO {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;

  constructor(props: HistoryProps) {
    Object.assign(this, props);
  }
}

export class GetHistoryDTO {
  start_date: string;
  end_date: string;
}
