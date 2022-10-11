function(imageTag)
{
    "pipeline" : {
        "name": "report-pod-restarts",
        "version": "1.0.0"
    },
    "description": "Pipeline performs an analysis of pod restarts for a Pachyderm cluster by analyzing the describe.txt file for each pod from a debug dump.",
    "input" : {
        "pfs" : {
            "repo" : "data",
            "branch" : "master",
            "glob" : "/**/describe.txt"
        }
    },
    "transform" : {
        "image": imageTag,
        "cmd" : [ "node", "./main.ts", "/pfs/data", "/pfs/out" ],
        "err_cmd" : [ "true" ],

    }
}