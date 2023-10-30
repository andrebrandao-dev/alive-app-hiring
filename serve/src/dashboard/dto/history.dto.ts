export type HistoryProps = {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export class HistoryDTO {
  constructor(props: HistoryProps) {
    Object.assign(this, props);
  }

  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export class GetHistoryDTO {
  start_date: string;
  end_date: string;
}
