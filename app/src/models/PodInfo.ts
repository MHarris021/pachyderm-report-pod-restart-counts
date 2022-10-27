export interface PodInfoProps {
  podName: string;
  podNamespace: string;
  podStatus: string;
  podStartTime: string;
  podIP: string;
  podNode: string;
  podPriority: number;
  podControlledBy: string;
}

export class PodInfo {
  get podControlledBy(): string {
    return this._podControlledBy;
  }

  private readonly _podControlledBy: string;
  get podPriority(): number {
    return this._podPriority;
  }

  private readonly _podPriority: number;
  get podStartTime(): string {
    return this._podStartTime;
  }

  private readonly _podStartTime: string;
  get podNode(): string {
    return this._podNode;
  }

  private readonly _podNode: string;
  get podIP(): string {
    return this._podIP;
  }

  private readonly _podIP: string;
  get podStatus(): string {
    return this._podStatus;
  }

  private readonly _podStatus: string;
  get podNamespace(): string {
    return this._podNamespace;
  }

  private readonly _podNamespace: string;
  get podName(): string {
    return this._podName;
  }

  private readonly _podName: string;

  constructor(podInfoProps: PodInfoProps) {
    this._podName = podInfoProps.podName;
    this._podNamespace = podInfoProps.podNamespace;
    this._podStatus = podInfoProps.podStatus;
    this._podIP = podInfoProps.podIP;
    this._podNode = podInfoProps.podNode;
    this._podStartTime = podInfoProps.podStartTime;
    this._podPriority = podInfoProps.podPriority;
    this._podControlledBy = podInfoProps.podControlledBy;
  }

  toJsonObject(): any {
    return {
      podName: this._podName,
      podNamespace: this._podNamespace,
      podStatus: this._podStatus,
      podIP: this._podIP,
      podNode: this._podNode,
      podStartTime: this._podStartTime,
      podPriority: this._podPriority,
      podControlledBy: this._podControlledBy,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJsonObject(), null, 2);
  }
}
