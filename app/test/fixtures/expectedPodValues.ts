import {Pod} from "../../src/models/types";

export const etcdPod = {
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
export const pachdPod = {
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
    "qoSClass": "Burstable",
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

export const pgBouncerPod = {
    "name": "pg-bouncer-9648d45f5-qngfn",
    "namespace": "default",
    "labels": [
        "app=pg-bouncer",
        "pod-template-hash=9648d45f5",
        "suite=pachyderm"
    ],
    "annotations": [
        "seccomp.security.alpha.kubernetes.io/pod: runtime/default"
    ],
    "status": "Running",
    "priority": "0",
    "ip": "10.8.2.21",
    "node": "gke-pach-w1b-pach-w1b-core-0a05ee21-9vpb/10.138.2.194",
    "startTime": "Tue, 04 Oct 2022 00:23:43 +0000",
    "controlledBy": "ReplicaSet/pg-bouncer-9648d45f5",
    "ips": [
        "IP:           10.8.2.21",
    ],
    "containers": [
        {
            "name": "pg-bouncer",
            "image": "pachyderm/pgbouncer:1.16.1-debian-10-r82",
            "containerId": "containerd://a338167cb748c20b350c8d512fd10d5c286c1f6ce562f70f19b9a686187f409f",
            "imageId": "docker.io/pachyderm/pgbouncer@sha256:5a27d258703625fe8cf29a820757707c3368e9cd1c003e77d7694bf6d874be14",
            "port": "5432/TCP",
            "hostPort": "0/TCP",
            "state": [
                "Running",
                "Started:      Tue, 04 Oct 2022 00:23:44 +0000",
            ],
            "ready": "True",
            "restartCount": "0",
            "requests": [
                "cpu:      1",
                "memory:   2G"
            ],
            "liveness": "exec [/bin/sh -c PGPASSWORD=$POSTGRESQL_PASSWORD psql -U $POSTGRESQL_USERNAME -h 127.0.0.1 -p $PGBOUNCER_PORT -d $POSTGRESQL_DATABASE --tuples-only --command=\"SELECT 1;\" | grep -q \"1\"] delay=0s timeout=1s period=30s #success=1 #failure=5",
            "readiness": "tcp-socket :5432 delay=0s timeout=1s period=10s #success=1 #failure=3",
            "environment": [
                "POSTGRESQL_USERNAME:                  postgres",
                "POSTGRESQL_DATABASE:                  pachyderm",
                "PGBOUNCER_SET_USER:                   True",
                "POSTGRESQL_HOST:                      cloudsql-auth-proxy.default.svc.cluster.local.",
                "PGBOUNCER_PORT:                       5432",
                "POSTGRESQL_PORT:                      5432",
                "PGBOUNCER_DATABASE:                   *",
                "PGBOUNCER_MAX_CLIENT_CONN:            10000",
                "PGBOUNCER_DEFAULT_POOL_SIZE:          500",
                "PGBOUNCER_POOL_MODE:                  transaction",
                "PGBOUNCER_IDLE_TRANSACTION_TIMEOUT:   300",
                "PGBOUNCER_IGNORE_STARTUP_PARAMETERS:  extra_float_digits",
                "PGBOUNCER_SERVER_TLS_SSLMODE:         disable",
                "PGBOUNCER_UNIX_SOCKET_DIR:",
                "POSTGRESQL_PASSWORD:                  <set to the key 'postgresql-password' in secret 'postgres'>  Optional: false"
            ],
            "mounts": [
                "/opt/bitnami/pgbouncer/conf/ from config (rw)",
                "/opt/bitnami/pgbouncer/logs/ from logs (rw)",
                "/opt/bitnami/pgbouncer/tmp/ from pgtmp (rw)",
                "/tmp from tmp (rw)",
                "/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-5tgbg (ro)"
            ],
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
            "name": "pgtmp",
            "type": "EmptyDir (a temporary directory that shares a pod's lifetime)",
            "medium": "",
            "sizeLimit": "<unset>"
        },
        {
            "name": "tmp",
            "type": "EmptyDir (a temporary directory that shares a pod's lifetime)",
            "medium": "",
            "sizeLimit": "<unset>"
        },
        {
            "name": "config",
            "type": "EmptyDir (a temporary directory that shares a pod's lifetime)",
            "medium": "",
            "sizeLimit": "<unset>"
        },
        {
            "name": "logs",
            "type": "EmptyDir (a temporary directory that shares a pod's lifetime)",
            "medium": "",
            "sizeLimit": "<unset>"
        },
        {
            "name": "kube-api-access-5tgbg",
            "type": "Projected (a volume that contains injected data from multiple sources)",
            "tokenExpirationSeconds": "3607",
            "configMapName": "kube-root-ca.crt",
            "configMapOptional": "<nil>",
            "downwardApi": "true",
        }
    ],
    "qoSClass": "Burstable",
    "nodeSelectors": [
        "cloud.google.com/gke-nodepool=pach-w1b-core"
    ],
    "tolerations": [
        "node.kubernetes.io/not-ready:NoExecute op=Exists for 300s",
        "node.kubernetes.io/unreachable:NoExecute op=Exists for 300s"
    ],
    "events": [
        "<none>"
    ]
}

export const kubeEventTailPod = {
    "name": "pachyderm-kube-event-tail-cc8765df8-d2krb",
    "namespace": "default",
    "priority": "0",
    "node": "gke-pach-w1b-pach-w1b-core-0a05ee21-9vpb/10.138.2.194",
    "startTime": "Thu, 29 Sep 2022 23:00:45 +0000",
    "labels": [
        "app=pachyderm-kube-event-tail",
        "pod-template-hash=cc8765df8",
        "suite=pachyderm"
    ],
    "annotations": [
        "seccomp.security.alpha.kubernetes.io/pod: runtime/default",
    ],
    "status": "Running",
    "ip": "10.8.2.7",
    "ips": [
        "IP:           10.8.2.7"
    ],
    "controlledBy": "ReplicaSet/pachyderm-kube-event-tail-cc8765df8",
    "containers": [
        {
            "name": "kube-event-tail",
            "containerId": "containerd://2ef863929da3bb33a36e870adb5c057c5bdb24dfcb32cbb2292edff8f884630a",
            "image": "pachyderm/kube-event-tail:v0.0.6",
            "imageId": "docker.io/pachyderm/kube-event-tail@sha256:083bebf847757d833066861c65f5e9e869367d9772c74b33c00bcea245e1c49f",
            "port": "8081/TCP",
            "hostPort": "0/TCP",
            "state": ["Running",
                "Started:      Thu, 29 Sep 2022 23:00:51 +0000"
            ],
            "ready": "True",
            "restartCount": "0",
            "limits": [
                "cpu:     1",
                "memory:  100Mi"
            ],
            "requests": [
                "cpu:      100m",
                "memory:   45Mi"
            ],
            "liveness": "http-get http://:debug/healthz delay=0s timeout=1s period=10s #success=1 #failure=3",
            "readiness": "http-get http://:debug/healthz delay=0s timeout=1s period=10s #success=1 #failure=3",
            "environment": [
                "DEBUG_ADDRESS:  0.0.0.0:8081",
                "NAMESPACE:      default"
            ],
            "mounts": [
                "/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-vsnct (ro)"
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
            "name": "kube-api-access-vsnct",
            "type": "Projected (a volume that contains injected data from multiple sources)",
            "tokenExpirationSeconds": "3607",
            "configMapName": "kube-root-ca.crt",
            "configMapOptional": "<nil>",
            "downwardApi": "true",
        }
    ],
    "qoSClass": "Burstable",
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

export const consolePod = {
    "name": "console-5c559856c6-vt4dd",
    "namespace": "default",
    "priority": "0",
    "node": "gke-pach-w1b-pach-w1b-core-0a05ee21-9vpb/10.138.2.194",
    "startTime": "Wed, 05 Oct 2022 07:16:29 +0000",
    "labels": [
        "app=console",
        "pod-template-hash=5c559856c6",
        "suite=pachyderm"
    ],
    "annotations": [
        "checksum/helm-values: 2004251ce2948ece076430fb082ed89dd6a57d921dc3a43793559830e91ed8b1",
        "seccomp.security.alpha.kubernetes.io/pod: runtime/default"
    ],
    "status": "Running",
    "ip": "10.8.2.29",
    "ips": [
        "IP:           10.8.2.29"
    ],
    "controlledBy": "ReplicaSet/console-5c559856c6",
    "containers": [
        {
            "name": "console",
            "containerId": "containerd://60e9cc1c8e3bfd724d904361ab989fedb0f92fa3cb9a93ada10c47de5d0f5d89",
            "image": "pachyderm/haberdashery:2.3.4-1",
            "imageId": "docker.io/pachyderm/haberdashery@sha256:78f8d4283dc4a431db3e59c4ea4b225e5305dfb3bb20b8a960ee49950a294c38",
            "port": "4000/TCP",
            "hostPort": "0/TCP",
            "state": ["Running",
                "Started:      Wed, 05 Oct 2022 07:16:30 +0000"
            ],
            "ready": "True",
            "restartCount": "0",
            "liveness": "http-get http://:console-http/ delay=0s timeout=1s period=10s #success=1 #failure=3",
            "readiness": "http-get http://:console-http/ delay=0s timeout=1s period=10s #success=1 #failure=3",
            "environment": [
                "REACT_APP_RUNTIME_SUBSCRIPTIONS_PREFIX:  :4000/graphql",
                "ISSUER_URI:                              http://pachd:30658",
                "REACT_APP_RUNTIME_ISSUER_URI:            http://localhost:30658",
                "REACT_APP_RUNTIME_DISABLE_TELEMETRY:     false",
                "OAUTH_REDIRECT_URI:                      http://localhost:4000/oauth/callback/?inline=true",
                "OAUTH_CLIENT_ID:                         console",
                "GRAPHQL_PORT:                            4000",
                "OAUTH_PACHD_CLIENT_ID:                   pachd",
                "PACHD_ADDRESS:                           pachd-peer.default.svc.cluster.local:30653",
                "OAUTH_CLIENT_SECRET:                     <set to the key 'OAUTH_CLIENT_SECRET' in secret 'pachyderm-console-secret'>  Optional: false",
                "UPGRADE_NO_OP:                           hegOJnaOUwNBYVtqntXefXGOoPTLYebG"
            ],
            "mounts": [
                "/home/ from home (rw)",
                "/tmp/ from tmp (rw)",
                "/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-sxmnl (ro)"
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
            "name": "tmp",
            "type": "EmptyDir (a temporary directory that shares a pod's lifetime)",
            "medium": "",
            "sizeLimit": "<unset>"
        },
        {
            "name": "home",
            "type": "EmptyDir (a temporary directory that shares a pod's lifetime)",
            "medium": "",
            "sizeLimit": "<unset>"
        },
        {
            "name": "kube-api-access-sxmnl",
            "type": "Projected (a volume that contains injected data from multiple sources)",
            "tokenExpirationSeconds": "3607",
            "configMapName": "kube-root-ca.crt",
            "configMapOptional": "<nil>",
            "downwardApi": "true",
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

export const cloudSqlAuthProxyPod = {
        "name": "cloudsql-auth-proxy-7d94b6dc74-lmqmm",
        "namespace": "default",
        "priority": "0",
        "node": "gke-pach-w1b-pach-w1b-core-0a05ee21-9vpb/10.138.2.194",
        "startTime": "Wed, 05 Oct 2022 06:24:37 +0000",
        "labels": [
            "app=cloudsql-auth-proxy",
            "pod-template-hash=7d94b6dc74",
            "suite=pachyderm"
        ],
        "annotations": [
            "seccomp.security.alpha.kubernetes.io/pod: runtime/default"
        ],
        "status": "Running",
        "ip": "10.8.2.24",
        "ips": [
            "IP:           10.8.2.24"
        ],
        "controlledBy": "ReplicaSet/cloudsql-auth-proxy-7d94b6dc74",
        "containers": [
            {
                "name": "cloud-sql-proxy",
                "containerId":"containerd://81d9b60ba9707890e468c4b3b4122f5509ff969b3470a7a76dd99dfd22e0ad75",
                "image": "gcr.io/cloudsql-docker/gce-proxy:1.23.0",
                "imageId":"gcr.io/cloudsql-docker/gce-proxy@sha256:c360979cfcd7cd4e0d0bca6331a8e52a502d6b5e930a3c0987829d6393660cbf",
                "port": "5432/TCP",
                "hostPort": "0/TCP",
                "command": [
                    "/cloud_sql_proxy",
                    "-instances=helm-162401:us-west1:helm-pachyderm=tcp:0.0.0.0:5432",
                    ],
                "state": ["Running",
                    "Started:      Wed, 05 Oct 2022 06:24:39 +0000"
                ],
                "ready": "True",
                "restartCount": "0",
                "requests": [
                    "cpu:        500m",
                    "memory:     500M",
                ],
                "environment": [
                    "<none>"
                ],
                "mounts": [
                    "/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-8smvl (ro)"
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
                "name": "kube-api-access-8smvl",
                "type": "Projected (a volume that contains injected data from multiple sources)",
                "tokenExpirationSeconds": "3607",
                "configMapName": "kube-root-ca.crt",
                "configMapOptional": "<nil>",
                "downwardApi": "true",
            }
        ],
        "qoSClass": "Burstable",
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
