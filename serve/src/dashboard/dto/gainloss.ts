export class GainLossDTO {
  current: string;
  consulting: string;
  gain: boolean;

  constructor(current: string, consulting: string) {
    this.current = current;
    this.consulting = consulting;
    this.setGain(+current, +consulting);
  }

  setGain(current: number, consulting: number) {
    this.gain = consulting > current;
  }
}

export class GetGainLoss {
  date_consulting: string;
}
