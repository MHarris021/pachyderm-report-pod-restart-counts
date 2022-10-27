import PodConditions from "./PodConditions";
import PodEvents from "./PodEvents";
import { PodInfo } from "./PodInfo";

export class PodAnalysis {
  get podInfo(): PodInfo {
    return this._podInfo;
  }

  private readonly _podInfo: PodInfo;
  get podEvents(): PodEvents {
    return this._podEvents;
  }

  private readonly _podEvents: PodEvents;
  get podConditions(): PodConditions {
    return this._podConditions;
  }

  private readonly _podConditions: PodConditions;

  constructor(
    podInfo: PodInfo,
    podConditions: PodConditions,
    podEvents: PodEvents
  ) {
    this._podConditions = podConditions;
    this._podEvents = podEvents;
    this._podInfo = podInfo;
  }
}
