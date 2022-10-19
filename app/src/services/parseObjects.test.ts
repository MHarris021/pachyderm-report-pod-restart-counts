import {parseObjects} from "./parseObjects";
import {DescribeFields, DescribeFieldType} from "../constants/types";
import {volumeFields} from "../constants/volumeFields";

const volumeField = {
    name: "volumes",
    field: "Volumes:",
    fieldType: DescribeFieldType.ObjectArray,
    subFields: volumeFields,
}

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
    "    DownwardAPI:             true"
];


describe("parseObjects", () => {

    // The correct volumes and endLine should be returned given the correct lines, field, currentLine, and position
    it("should return the correct volumes and endLine given the correct lines, field, currentLine, and position", () => {
        const {objectArray, objectArrayKey, endLine} = parseObjects({
            lines: volumesLines,
            field: volumeField,
            currentLine: 0
        });
        expect(objectArrayKey).toEqual(volumeField.name);
        expect(endLine).toEqual(11);
        expect(objectArray).toEqual(
            [
                     {  "name": "etcd-storage",
                        "type": "PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)",
                        "claimName": "etcd-storage-etcd-0",
                        "readOnly": "false"
                },
                    { "name": "kube-api-access-m9tl8",
                        "type": "Projected (a volume that contains injected data from multiple sources)",
                        "tokenExpirationSeconds": "3607",
                        "configMapName": "kube-root-ca.crt",
                        "configMapOptional": "<nil>",
                        "downwardApi": "true"
                    }
            ]
        );
    });
});