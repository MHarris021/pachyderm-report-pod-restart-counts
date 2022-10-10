Template Project for Pachyderm using JavaScript
==============================================

This is a template project for Pachyderm using JavaScript. It uses the scripts in the `scripts` directory to create a pipeline that runs a JavaScript program.
These scripts are intended to be used as a starting point for your own projects.

These scripts also create a repo, load the data into the repo, build and push a docker container currently based on `node:18-alpine3.16`.

There is also a script named `updatePipelines.sh` that will update the pipelines with the latest code.

You can run setupTest.sh to execute the scripts in the `scripts` directory.

You may need to run `chmod +x setupTest.sh` to make the script executable.

And you may need to run `chmod +x scripts/*` to make the scripts executable.

Lastly, you can run `./tearDown.sh` to delete the pipeline and repo. It may also be necessary to run `chmod +x tearDown.sh` to make the script executable.

