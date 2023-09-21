// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function main(projectId, filter) {
  // [START compute_snapshot_delete_by_filter]
  // TODO(developer): Uncomment and replace these variables before running the sample.
  // Project ID or project number of the Cloud project you want to use.
  // const projectId = 'YOUR_PROJECT_ID';

  // Filter to be applied when looking for snapshots for deletion. Learn more about filters here:
  // https://cloud.google.com/java/docs/reference/google-cloud-compute/latest/com.google.cloud.compute.v1.ListSnapshotsRequest
  // const filter = 'FILTER';

  const compute = require('@google-cloud/compute');
  const operationsClient = new compute.GlobalOperationsClient();

  // Deletes all snapshots in project that meet the filter criteria.
  async function deleteSnapshotsByFilter() {
    const snapshotsClient = new compute.SnapshotsClient();
    const [snapshots] = snapshotsClient.list({
      project: projectId,
      filter: filter,
    });

    // Iterate through the resultant snapshots and delete them.
    for (const snapshot of snapshots) {
      const [response] = await snapshotsClient.delete({
        project: projectId,
        snapshot: snapshot.name,
      });
      await waitForOperation(response.latestResponse);
    }
    console.log('Snapshots deleted by filter.');
  }

  // Waits for the specified operation to complete.
  async function waitForOperation(operation) {
    // Wait for the create disk operation to complete.
    while (operation.status !== 'DONE') {
      [operation] = await operationsClient.wait({
        operation: operation.name,
        project: projectId,
      });
    }
  }

  deleteSnapshotsByFilter();
  // [END compute_snapshot_delete_by_filter]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
