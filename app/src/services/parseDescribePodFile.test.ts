import * as path from "path";
import { parseDescribePodFile } from "./parseDescribePodFile";
import { promises as fsPromises } from "fs";
import {
  cloudSqlAuthProxyPod,
  consolePod,
  etcdPod,
  kubeEventTailPod,
  pachdPod,
  pachdWithRestartsPod,
  pgBouncerPod,
} from "../../test/fixtures/expectedPodValues";

const testFilePath = path.join(__dirname, "..", "..", "test", "data");
const etcdPodFile = path.join(testFilePath, "etcd-describe.txt");
const pachdPodFile = path.join(testFilePath, "pachd-describe.txt");
const pgBouncerPodFile = path.join(testFilePath, "pg-bouncer-describe.txt");
const kubeEventTailPodFile = path.join(
  testFilePath,
  "kube-event-tail-describe.txt"
);
const consolePodFile = path.join(testFilePath, "console-describe.txt");
const cloudSqlAuthProxyPodFile = path.join(
  testFilePath,
  "cloudsql-auth-proxy-describe.txt"
);
const pachdWithRestartsPodFile = path.join(
  testFilePath,
  "pachd-with-restarts-describe.txt"
);

describe("parseDescribePodFile", () => {
  // test that parseDescribePodFile returns the correct etcd pod object and pod name for a valid describe pod file
  test("parseDescribePodFile returns the correct etcd pod object and pod name for a valid describe pod file", async () => {
    expect((await fsPromises.stat(etcdPodFile)).isFile()).toBe(true);
    console.info("etcdPodFile: ", etcdPodFile);
    const { pod, podName } = await parseDescribePodFile(etcdPodFile);
    console.info("pod: ", JSON.stringify(pod));
    expect(podName).toEqual("etcd-0");
    expect(pod).toEqual(etcdPod);
  });

  // test that parseDescribePodFile returns the correct pachd pod object and pod name for a valid describe pod file
  test("parseDescribePodFile returns the correct pachd pod object and pod name for a valid describe pod file", async () => {
    expect((await fsPromises.stat(pachdPodFile)).isFile()).toBe(true);
    console.info("pachdPodFile: ", pachdPodFile);
    const { pod, podName } = await parseDescribePodFile(pachdPodFile);
    console.info("pod: ", JSON.stringify(pod));
    expect(podName).toEqual("pachd-544b56d8d9-bpn76");
    expect(pod).toEqual(pachdPod);
  });

  // test that parseDescribePodFile returns the correct pg-bouncer pod object and pod name for a valid describe pod file
  test("parseDescribePodFile returns the correct pg-bouncer pod object and pod name for a valid describe pod file", async () => {
    expect((await fsPromises.stat(pgBouncerPodFile)).isFile()).toBe(true);
    console.info("pgBouncerPodFile: ", pgBouncerPodFile);
    const { pod, podName } = await parseDescribePodFile(pgBouncerPodFile);
    console.info("pod: ", JSON.stringify(pod));
    expect(podName).toEqual("pg-bouncer-9648d45f5-qngfn");
    expect(pod).toEqual(pgBouncerPod);
  });

  // test that parseDescribePodFile returns the correct kube-event-tail pod object and pod name for a valid describe pod file
  test("parseDescribePodFile returns the correct kube-event-tail pod object and pod name for a valid describe pod file", async () => {
    expect((await fsPromises.stat(kubeEventTailPodFile)).isFile()).toBe(true);
    console.info("kubeEventTailPodFile: ", kubeEventTailPodFile);
    const { pod, podName } = await parseDescribePodFile(kubeEventTailPodFile);
    console.info("pod: ", JSON.stringify(pod));
    expect(podName).toEqual("pachyderm-kube-event-tail-cc8765df8-d2krb");
    expect(pod).toEqual(kubeEventTailPod);
  });

  // test that parseDescribePodFile returns the correct console pod object and pod name for a valid describe pod file
  test("parseDescribePodFile returns the correct console pod object and pod name for a valid describe pod file", async () => {
    expect((await fsPromises.stat(consolePodFile)).isFile()).toBe(true);
    console.info("consolePodFile: ", consolePodFile);
    const { pod, podName } = await parseDescribePodFile(consolePodFile);
    console.info("pod: ", JSON.stringify(pod));
    expect(podName).toEqual("console-5c559856c6-vt4dd");
    expect(pod).toEqual(consolePod);
  });

  // test that parseDescribePodFile returns the correct cloudsql-auth-proxy pod object and pod name for a valid describe pod file
  test("parseDescribePodFile returns the correct cloudsql-auth-proxy pod object and pod name for a valid describe pod file", async () => {
    expect((await fsPromises.stat(cloudSqlAuthProxyPodFile)).isFile()).toBe(
      true
    );
    console.info("cloudSqlAuthProxyPodFile: ", cloudSqlAuthProxyPodFile);
    const { pod, podName } = await parseDescribePodFile(
      cloudSqlAuthProxyPodFile
    );
    console.info("pod: ", JSON.stringify(pod));
    expect(podName).toEqual("cloudsql-auth-proxy-7d94b6dc74-lmqmm");
    expect(pod).toEqual(cloudSqlAuthProxyPod);
  });

  // test that parseDescribePodFile returns the correct pachd pod object and pod name for a valid describe pod file with restarts
  test("parseDescribePodFile returns the correct pachd pod object and pod name for a valid describe pod file with restarts", async () => {
    expect((await fsPromises.stat(pachdWithRestartsPodFile)).isFile()).toBe(
      true
    );
    console.info("pachdWithRestartsPodFile: ", pachdWithRestartsPodFile);
    const { pod, podName } = await parseDescribePodFile(
      pachdWithRestartsPodFile
    );
    console.info("pod: ", JSON.stringify(pod));
    expect(podName).toEqual("pachd-58f5bfbc84-wwqt6");
    expect(pod).toEqual(pachdWithRestartsPod);
  });
});
