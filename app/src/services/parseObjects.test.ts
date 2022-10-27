import { parseObjects } from "./parseObjects";
import { DescribeFieldType } from "../constants/types";
import { volumeFields } from "../constants/volumeFields";
import { containerFields } from "../constants/containerFields";

const volumesField = {
  name: "volumes",
  field: "Volumes:",
  fieldType: DescribeFieldType.ObjectArray,
  subFields: volumeFields,
};

const volumesLines = [
  "Volumes:",
  "  etcd-storage:",
  "    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)",
  "    ClaimName:  etcd-storage-etcd-0",
  "    ReadOnly:   false",
  "  kube-api-access-m9tl8:",
  "    Type:                    Projected (a volume that contains injected data from multiple sources)",
  "    TokenExpirationSeconds:  3607",
  "    ConfigMapName:           kube-root-ca.crt",
  "    ConfigMapOptional:       <nil>",
  "    DownwardAPI:             true",
];

const containersField = {
  name: "containers",
  field: "Containers:",
  fieldType: DescribeFieldType.ObjectArray,
  subFields: containerFields,
};

const containersLines = [
  "Containers:",
  "  etcd:",
  "    Container ID:  containerd://8ea8cbace2fe6d12a262ada3459fcd87afda3ac02c8e5e06ffac9798a3dc557e",
  "    Image:         pachyderm/etcd:v3.5.1",
  "    Image ID:      docker.io/pachyderm/etcd@sha256:345facf01470d33a7f70018c8f7e7de3d29a59f3913c5ce7d27f7487cedf19ce",
  "    Ports:         2379/TCP, 2380/TCP",
  "    Host Ports:    0/TCP, 0/TCP",
  "    Command:",
  "      /bin/sh",
  "      -c",
  "    Args:",
  "      /usr/local/bin/etcd  --listen-client-urls=http://0.0.0.0:2379  --advertise-client-urls=http://0.0.0.0:2379  --data-dir=/var/data/etcd  --auto-compaction-retention=1  --max-txn-ops=10000  --max-request-bytes=52428800  --quota-backend-bytes=8589934592  --listen-peer-urls=http://0.0.0.0:2380  --initial-cluster-token=pach-cluster  --initial-advertise-peer-urls=http://${ETCD_NAME}.etcd-headless.${NAMESPACE}.svc.cluster.local:2380  --initial-cluster=etcd-0=http://etcd-0.etcd-headless.${NAMESPACE}.svc.cluster.local:2380",
  "    State:          Running",
  "      Started:      Wed, 05 Oct 2022 17:08:35 +0000",
  "    Last State:     Terminated",
  "      Reason:       Error",
  "      Exit Code:    2",
  "      Started:      Wed, 05 Oct 2022 17:04:17 +0000",
  "      Finished:     Wed, 05 Oct 2022 17:08:19 +0000",
  "    Ready:          True",
  "    Restart Count:  10",
  "    Liveness:       http-get http://:client-port/health delay=10s timeout=1s period=5s #success=1 #failure=3",
  "    Readiness:      http-get http://:client-port/health delay=10s timeout=1s period=5s #success=1 #failure=3",
  "    Environment:",
  "      ETCD_NAME:  etcd-0 (v1:metadata.name)",
  "      NAMESPACE:  default (v1:metadata.namespace)",
  "    Mounts:",
  "      /var/data/etcd from etcd-storage (rw)",
  "      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-m9tl8 (ro)",
];

describe("parseObjects", () => {
  // The correct volumes and endLine should be returned given the correct lines, field, currentLine, and position
  it("should return the correct volumes and endLine given the correct lines, field, currentLine, and position", () => {
    const { objectArray, objectArrayKey, endLine } = parseObjects({
      lines: volumesLines,
      field: volumesField,
      currentLine: 0,
    });
    expect(objectArrayKey).toEqual(volumesField.name);
    expect(endLine).toEqual(11);
    expect(objectArray).toEqual([
      {
        name: "etcd-storage",
        type: "PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)",
        claimName: "etcd-storage-etcd-0",
        readOnly: "false",
      },
      {
        name: "kube-api-access-m9tl8",
        type: "Projected (a volume that contains injected data from multiple sources)",
        tokenExpirationSeconds: "3607",
        configMapName: "kube-root-ca.crt",
        configMapOptional: "<nil>",
        downwardApi: "true",
      },
    ]);
  });

  // The correct containers and endLine should be returned given the correct lines, field, currentLine
  it("should return the correct containers and endLine given the correct lines, field, currentLine", () => {
    const { objectArray, objectArrayKey, endLine } = parseObjects({
      lines: containersLines,
      field: containersField,
      currentLine: 0,
    });
    expect(objectArrayKey).toEqual(containersField.name);
    expect(endLine).toEqual(29);
    expect(objectArray).toEqual([
      {
        name: "etcd",
        containerId:
          "containerd://8ea8cbace2fe6d12a262ada3459fcd87afda3ac02c8e5e06ffac9798a3dc557e",
        image: "pachyderm/etcd:v3.5.1",
        imageId:
          "docker.io/pachyderm/etcd@sha256:345facf01470d33a7f70018c8f7e7de3d29a59f3913c5ce7d27f7487cedf19ce",
        ports: "2379/TCP, 2380/TCP",
        hostPorts: "0/TCP, 0/TCP",
        command: ["/bin/sh", "-c"],
        args: [
          "/usr/local/bin/etcd  --listen-client-urls=http://0.0.0.0:2379  --advertise-client-urls=http://0.0.0.0:2379  --data-dir=/var/data/etcd  --auto-compaction-retention=1  --max-txn-ops=10000  --max-request-bytes=52428800  --quota-backend-bytes=8589934592  --listen-peer-urls=http://0.0.0.0:2380  --initial-cluster-token=pach-cluster  --initial-advertise-peer-urls=http://${ETCD_NAME}.etcd-headless.${NAMESPACE}.svc.cluster.local:2380  --initial-cluster=etcd-0=http://etcd-0.etcd-headless.${NAMESPACE}.svc.cluster.local:2380",
        ],
        state: ["Running", "Started:      Wed, 05 Oct 2022 17:08:35 +0000"],
        lastState: [
          "Terminated",
          "Reason:       Error",
          "Exit Code:    2",
          "Started:      Wed, 05 Oct 2022 17:04:17 +0000",
          "Finished:     Wed, 05 Oct 2022 17:08:19 +0000",
        ],
        ready: "True",
        restartCount: "10",
        liveness:
          "http-get http://:client-port/health delay=10s timeout=1s period=5s #success=1 #failure=3",
        readiness:
          "http-get http://:client-port/health delay=10s timeout=1s period=5s #success=1 #failure=3",
        environment: [
          "ETCD_NAME:  etcd-0 (v1:metadata.name)",
          "NAMESPACE:  default (v1:metadata.namespace)",
        ],
        mounts: [
          "/var/data/etcd from etcd-storage (rw)",
          "/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-m9tl8 (ro)",
        ],
      },
    ]);
  });
});
