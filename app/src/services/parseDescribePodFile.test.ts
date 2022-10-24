import * as path from "path";
import {parseDescribePodFile} from "./parseDescribePodFile";
import {promises as fsPromises} from "fs";
import {etcdPod, kubeEventTailPod, pachdPod, pgBouncerPod} from "../../test/fixtures/expectedPodValues";


const testFilePath = path.join(__dirname, "..", "..", "test", "data");
const etcdPodFile = path.join(testFilePath, "etcd-describe.txt");
const pachdPodFile = path.join(testFilePath, "pachd-describe.txt");
const pgBouncerPodFile = path.join(testFilePath, "pg-bouncer-describe.txt");
const kubeEventTailPodFile = path.join(testFilePath, "kube-event-tail-describe.txt");

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

    // test that parseDescribePodFile returns the correct pg-bouncer pod object and pod name for a valid describe pod file
    test('parseDescribePodFile returns the correct pg-bouncer pod object and pod name for a valid describe pod file', async () => {
        expect((await fsPromises.stat(pgBouncerPodFile)).isFile()).toBe(true);
        console.info("pgBouncerPodFile: ", pgBouncerPodFile);
        const {pod, podName} = await parseDescribePodFile(pgBouncerPodFile);
        console.info("pod: ", JSON.stringify(pod));
        expect(podName).toEqual("pg-bouncer-9648d45f5-qngfn");
        expect(pod).toEqual(pgBouncerPod);
    });

    // test that parseDescribePodFile returns the correct kube-event-tail pod object and pod name for a valid describe pod file
    test('parseDescribePodFile returns the correct kube-event-tail pod object and pod name for a valid describe pod file', async () => {
        expect((await fsPromises.stat(kubeEventTailPodFile)).isFile()).toBe(true);
        console.info("kubeEventTailPodFile: ", kubeEventTailPodFile);
        const {pod, podName} = await parseDescribePodFile(kubeEventTailPodFile);
        console.info("pod: ", JSON.stringify(pod));
        expect(podName).toEqual("pachyderm-kube-event-tail-cc8765df8-d2krb");
        expect(pod).toEqual(kubeEventTailPod);
    });
});