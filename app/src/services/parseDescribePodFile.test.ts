import * as path from "path";
import { parseDescribePodFile } from "./parseDescribePodFile";
import {promises as fsPromises} from "fs";

const testFilePath = path.join(__dirname, "..", "..", "test", "data");
const etcdPodFile = path.join(testFilePath, "etcd-describe.txt");

const etcdPod = {
    "name": "etcd-0",
    "namespace": "default",
    "priority": "0",
    "node": "gke-pach-w1b-pach-w1b-core-0a05ee21-9vpb/10.138.2.194",
    "startTime": "Thu, 29 Sep 2022 23:01:03 +0000",
    "labels": [
        "app=etcd",
        "controller-revision-hash=etcd-974b76847",
        "statefulset.kubernetes.io/pod-name=etcd-0",
        "suite=pachyderm"
    ],
    "annotations": [
        "seccomp.security.alpha.kubernetes.io/pod"
    ],
    "status": "Running",
    "ip": "10.8.2.16",
    "ips": [
        "IP:           10.8.2.16"
    ],
    "controlledBy": "StatefulSet/etcd",
    "containers": [
        {
            "name": "etcd",
            "containerId": "containerd://8ea8cbace2fe6d12a262ada3459fcd87afda3ac02c8e5e06ffac9798a3dc557e",
            "image": "pachyderm/etcd:v3.5.1",
            "imageId": "docker.io/pachyderm/etcd@sha256:345facf01470d33a7f70018c8f7e7de3d29a59f3913c5ce7d27f7487cedf19ce",
            "ports": "2379/TCP, 2380/TCP",
            "hostPorts": "0/TCP, 0/TCP",
            "command": [
                "/bin/sh",
                "-c"
            ],
            "args": [
                "\"/usr/local/bin/etcd\" \"--listen-client-urls=http://0.0.0.0:2379\" \"--advertise-client-urls=http://0.0.0.0:2379\" \"--data-dir=/var/data/etcd\" \"--auto-compaction-retention=1\" \"--max-txn-ops=10000\" \"--max-request-bytes=52428800\" \"--quota-backend-bytes=8589934592\" \"--listen-peer-urls=http://0.0.0.0:2380\" \"--initial-cluster-token=pach-cluster\" \"--initial-advertise-peer-urls=http://${ETCD_NAME}.etcd-headless.${NAMESPACE}.svc.cluster.local:2380\" \"--initial-cluster=etcd-0=http://etcd-0.etcd-headless.${NAMESPACE}.svc.cluster.local:2380,\"",
            ],
            "state": [
                "Running",
                "Started:      Wed, 05 Oct 2022 17:08:35 +0000"],
            "lastState": [
                "Terminated",
                "Reason:       Error",
                "Exit Code:    2",
                "Started:      Wed, 05 Oct 2022 17:04:17 +0000",
                "Finished:     Wed, 05 Oct 2022 17:08:19 +0000"
            ],
            "ready": "True",
            "restartCount": "10",
            "liveness": "http-get http://:client-port/health delay=10s timeout=1s period=5s #success=1 #failure=3",
            "readiness": "http-get http://:client-port/health delay=10s timeout=1s period=5s #success=1 #failure=3",
            "environment": [
                "ETCD_NAME:  etcd-0 (v1:metadata.name)",
                "NAMESPACE:  default (v1:metadata.namespace)"
            ],
            "mounts": [
                "/var/data/etcd from etcd-storage (rw)",
                "/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-m9tl8 (ro)"
            ]
        }
    ],
    "conditions": [
        "Type              Status",
        "Initialized       True",
        "Ready             True",
        "ContainersReady   True",
        "PodScheduled      True"
    ],
    "volumes": [
        {
            "name": "etcd-storage",
            "type": "PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)",
            "claimName": "etcd-storage-etcd-0",
            "readOnly": "false"
        },
        {
            "name": "kube-api-access-m9tl8",
            "type": "Projected (a volume that contains injected data from multiple sources)",
            "tokenExpirationSeconds": "3607",
            "configMapName": "kube-root-ca.crt",
            "configMapOptional": "<nil>",
            "downwardApi": "true"
        }
    ],
    "qoSClass": "BestEffort",
    "nodeSelectors": [
        "<none>"
    ],
    "tolerations": [
        "node.kubernetes.io/not-ready:NoExecute op=Exists for 300s",
        "node.kubernetes.io/unreachable:NoExecute op=Exists for 300s"
    ],
    "events": [
        "<none>"
    ]
}

describe("parseDescribePodFile",  () => {

    // test that parseDescribePodFile returns the correct pod object for a valid describe pod file
    test('parseDescribePodFile returns the correct pod object for a valid describe pod file', async () => {

        expect((await fsPromises.stat(etcdPodFile)).isFile()).toBe(true);
        console.info("etcdPodFile: ", etcdPodFile);
        const {pod} = await parseDescribePodFile(etcdPodFile);
        console.info("pod: ", JSON.stringify(pod));
        expect(pod).toEqual(etcdPod);

    });

});