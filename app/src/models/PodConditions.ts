export interface PodConditionsProps {
  initialized: boolean;
  ready: boolean;
  containersReady: boolean;
  podScheduled: boolean;
}

export class PodConditions {
  get podScheduled(): boolean {
    return this._podScheduled;
  }

  private readonly _podScheduled: boolean;
  get containersReady(): boolean {
    return this._containersReady;
  }

  private readonly _containersReady: boolean;
  get ready(): boolean {
    return this._ready;
  }

  private readonly _ready: boolean;
  get initialized(): boolean {
    return this._initialized;
  }

  private readonly _initialized: boolean;

  constructor(podConditionsProps: PodConditionsProps) {
    this._initialized = podConditionsProps.initialized;
    this._ready = podConditionsProps.ready;
    this._containersReady = podConditionsProps.containersReady;
    this._podScheduled = podConditionsProps.podScheduled;
  }

  toJsonObject(): any {
    return {
      initialized: this._initialized,
      ready: this._ready,
      containersReady: this._containersReady,
      podScheduled: this._podScheduled,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJsonObject(), null, 2);
  }
}

export default PodConditions;
