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
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;

  constructor(props: HistoryProps) {
    this.date = props.date;
    this.open = +props.open;
    this.high = +props.high;
    this.low = +props.low;
    this.close = +props.close;
    this.volume = +props.volume;
  }
}

export class GetHistoryDTO {
  start_date: string;
  end_date: string;
}
