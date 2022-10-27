export class PodEvents {
  get podEvents(): string[] {
    return this._podEvents;
  }
  private readonly _podEvents: string[];

  constructor(podEvents: string[]) {
    this._podEvents = podEvents;
  }

  toJsonObject(): any {
    return {
      podEvents: this._podEvents,
    };
  }
}

export default PodEvents;
