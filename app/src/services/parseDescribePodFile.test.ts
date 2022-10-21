import * as path from "path";
import {parseDescribePodFile} from "./parseDescribePodFile";
import {promises as fsPromises} from "fs";

const testFilePath = path.join(__dirname, "..", "..", "test", "data");
const etcdPodFile = path.join(testFilePath, "etcd-describe.txt");
const pachdPodFile = path.join(testFilePath, "pachd-describe.txt");

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
        "seccomp.security.alpha.kubernetes.io/pod: runtime/default"
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

const pachdPod = {
    "name": "pachd-544b56d8d9-bpn76",
    "namespace": "default",
    "priority": "0",
    "node": "gke-pach-w1b-pach-w1b-core-0a05ee21-9vpb/10.138.2.194",
    "startTime": "Thu, 29 Sep 2022 22:48:54 +0000",
    "labels": [
        "app=pachd",
        "pod-template-hash=544b56d8d9",
        "suite=pachyderm"
    ],
    "annotations": [
        "checksum/helm-values: 2b7b40f69d095fa65c45e6fbf6a60bbfaee6dcc9e6d338b78533930b2d893e36",
        "checksum/storage-secret: 69c520495c7cdb67647c6f847d79296a26f138b297328a5c93636298e79b859f",
        "seccomp.security.alpha.kubernetes.io/pod: runtime/default"
    ],
    "status": "Running",
    "ip": "10.8.2.3",
    "ips": [
        "IP:           10.8.2.3"
    ],
    "controlledBy": "ReplicaSet/pachd-544b56d8d9",
    "containers": [
        {
            "name": "pachd",
            "containerId": "containerd://7830583cb369e89962b1a07a1081155a2b863c44d215d249b231ff678c98ed06",
            "image": "pachyderm/pachd:2.3.4",
            "imageId": "docker.io/pachyderm/pachd@sha256:903959bd83a77a346063be5ce9cc1ebb894b554a69f8872916c4397c495edf15",
            "ports": "1600/TCP, 1650/TCP, 1653/TCP, 1657/TCP, 1658/TCP, 1656/TCP",
            "hostPorts": "0/TCP, 0/TCP, 0/TCP, 0/TCP, 0/TCP, 0/TCP",
            "command": [
                "/pachd"
            ],
            "args": [
                "--mode",
                "$(MODE)"
            ],
            "state": [
                "Running",
                "Started:      Thu, 29 Sep 2022 22:49:09 +0000"
            ],
            "ready": "True",
            "restartCount": "0",
            "requests": [
                "memory:   16G"
            ],
            "liveness": "exec [/pachd --readiness] delay=0s timeout=30s period=10s #success=1 #failure=10",
            "readiness": "exec [/pachd --readiness] delay=0s timeout=1s period=10s #success=1 #failure=3",
            "startup": "exec [/pachd --readiness] delay=0s timeout=30s period=10s #success=1 #failure=10",
            "environmentVariablesFrom": [
                "pachyderm-storage-secret        Secret     Optional: false",
                "pachyderm-deployment-id-secret  Secret     Optional: false",
                "pachd-config                    ConfigMap  Optional: true"
            ],
            "environment": [
                "POSTGRES_HOST:                       cloudsql-auth-proxy.default.svc.cluster.local.",
                "POSTGRES_PORT:                       5432",
                "POSTGRES_USER:                       postgres",
                "POSTGRES_DATABASE:                   pachyderm",
                "POSTGRES_PASSWORD:                   <set to the key 'postgresql-password' in secret 'postgres'>  Optional: false",
                "PG_BOUNCER_HOST:                     pg-bouncer",
                "PG_BOUNCER_PORT:                     5432",
                "LOKI_LOGGING:                        true",
                "LOKI_SERVICE_HOST_VAR:               PACHYDERM_LOKI_SERVICE_HOST",
                "LOKI_SERVICE_PORT_VAR:               PACHYDERM_LOKI_SERVICE_PORT",
                "PACH_ROOT:                           /pach",
                "ETCD_PREFIX:",
                "STORAGE_BACKEND:                     GOOGLE",
                "WORKER_IMAGE:                        pachyderm/worker:2.3.4",
                "WORKER_SIDECAR_IMAGE:                pachyderm/pachd:2.3.4",
                "WORKER_IMAGE_PULL_POLICY:            IfNotPresent",
                "WORKER_SERVICE_ACCOUNT:              pachyderm-worker",
                "METRICS:                             true",
                "LOG_FORMAT:                          json",
                "LOG_LEVEL:                           info",
                "PACH_NAMESPACE:                      default (v1:metadata.namespace)",
                "REQUIRE_CRITICAL_SERVERS_ONLY:       false",
                "PACHD_POD_NAME:                      pachd-544b56d8d9-bpn76 (v1:metadata.name)",
                "PPS_WORKER_GRPC_PORT:                1080",
                "STORAGE_UPLOAD_CONCURRENCY_LIMIT:    100",
                "STORAGE_PUT_FILE_CONCURRENCY_LIMIT:  100",
                "CONSOLE_OAUTH_ID:                    console",
                "CONSOLE_OAUTH_SECRET:                <set to the key 'OAUTH_CLIENT_SECRET' in secret 'pachyderm-console-secret'>  Optional: false",
                "ENABLE_WORKER_SECURITY_CONTEXTS:     true",
                "ENABLE_PREFLIGHT_CHECKS:             true",
                "UNPAUSED_MODE:                       full"],
            "mounts": [
                "/pach from pach-disk (rw)",
                "/pachyderm-storage-secret from pachyderm-storage-secret (rw)",
                "/tmp from tmp (rw)",
                "/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-lg7xr (ro)"
            ],
        }
    ],
    "conditions":
        [
            "Type              Status",
            "Initialized       True",
            "Ready             True",
            "ContainersReady   True",
            "PodScheduled      True"
        ],
    "volumes":
        [
            {
                "name": "tmp",
                "type": "EmptyDir (a temporary directory that shares a pod's lifetime)",
                "medium": "",
                "sizeLimit": "<unset>"
            },
            {
                "name": "pach-disk",
                "type": "EmptyDir (a temporary directory that shares a pod's lifetime)",
                "medium": "",
                "sizeLimit": "<unset>"
            },
            {
                "name": "pachyderm-storage-secret",
                "type": "Secret (a volume populated by a Secret)",
                "secretName": "pachyderm-storage-secret",
                "optional": "false"
            },
            {
                "name": "kube-api-access-lg7xr",
                "type": "Projected (a volume that contains injected data from multiple sources)",
                "tokenExpirationSeconds": "3607",
                "configMapName": "kube-root-ca.crt",
                "configMapOptional": "<nil>",
                "downwardApi": "true"
            }
        ],
    "qoSClass":"Burstable",
    "nodeSelectors":
    [
        "cloud.google.com/gke-nodepool=pach-w1b-core"
    ],
    "tolerations":
        [
            "node.kubernetes.io/not-ready:NoExecute op=Exists for 300s",
            "node.kubernetes.io/unreachable:NoExecute op=Exists for 300s"
        ],
    "events":
        ["<none>"]
}

describe("parseDescribePodFile", () => {

    // test that parseDescribePodFile returns the correct etcd pod object and pod name for a valid describe pod file
    test('parseDescribePodFile returns the correct etcd pod object and pod name for a valid describe pod file', async () => {

        expect((await fsPromises.stat(etcdPodFile)).isFile()).toBe(true);
        console.info("etcdPodFile: ", etcdPodFile);
        const {pod, podName} = await parseDescribePodFile(etcdPodFile);
        console.info("pod: ", JSON.stringify(pod));
        expect(podName).toEqual("etcd-0");
        expect(pod).toEqual(etcdPod);
    });

    // test that parseDescribePodFile returns the correct pachd pod object and pod name for a valid describe pod file
    test('parseDescribePodFile returns the correct pachd pod object and pod name for a valid describe pod file', async () => {

            expect((await fsPromises.stat(pachdPodFile)).isFile()).toBe(true);
            console.info("pachdPodFile: ", pachdPodFile);
            const {pod, podName} = await parseDescribePodFile(pachdPodFile);
            console.info("pod: ", JSON.stringify(pod));
            expect(podName).toEqual("pachd-544b56d8d9-bpn76");
            expect(pod).toEqual(pachdPod);
    });
});