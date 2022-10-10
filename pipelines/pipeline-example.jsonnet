function(imageTag)
{
    "pipeline" : {
        "name": "[pipelineName]",
    },
    "description": "[pipelineDescription]",
    "input" : {
        "pfs" : {
            "repo" : "data",
            "branch" : "master",
            "glob" : "[globPattern]"
        }
    },
    "transform" : {
        "image": imageTag,
        "cmd" : [ "node", "./main.js", "/pfs/data", "/pfs/out" ],
        "err_cmd" : [ "true" ],

    }
}