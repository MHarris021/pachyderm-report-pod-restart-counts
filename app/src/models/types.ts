export type Container = {
  id: string;
  image: string;
  imageId: string;
  ports?: string;
  port?: string;
  hostPorts?: string;
  hostPort?: string;
  command: string[];
  args: string[];
  state: string[];
  lastState: string[];
  restartCount: string;
  ready: string;
  liveness: string;
  requests: string;
};

export type Volume = {
  name: string;
  hostPath?: string;
  mountPath?: string;
  readOnly?: string;
  volumeType: string;
  claimName?: string;
  tokenExpirationSeconds?: string;
  configMapName?: string;
  configMapOptional?: string;
  downwardAPI?: string;
  optional?: string;
};

export type Pod = {
  name?: string;
  namespace?: string;
  status?: string;
  startTime?: string;
  controlledBy?: string;
  labels?: string[];
  annotations?: string[];
  containers?: Container[];
  initContainers?: Container[];
  volumes?: Volume[];
  node?: string;
  ip?: string;
  priority?: string;
  tolerations?: string[];
  ips?: string[];
  nodeSelectors?: string[];
  events?: string[];
  conditions?: string[];
  qoSClass?: string;
};
