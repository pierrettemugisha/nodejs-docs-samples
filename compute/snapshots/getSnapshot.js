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

function main(projectId, snapshotName) {
  // [START compute_snapshot_get]
  // TODO(developer): Uncomment and replace these variables before running the sample.
  // Project ID or project number of the Cloud project you want to use.
  // const projectId = 'YOUR_PROJECT_ID';

  // Name of the snapshot to look up.
  // const snapshotName = 'YOUR_SNAPSHOT_NAME';

  const compute = require('@google-cloud/compute');

  // Get information about a snapshot.
  async function getSnapshot() {
    const snapshotsClient = new compute.SnapshotsClient();
    const [snapshot] = await snapshotsClient.get({
      project: projectId,
      snapshot: snapshotName,
    });
    console.log(`Retrieved the snapshot: ${snapshot.name}`);
  }

  getSnapshot();
  // [END compute_snapshot_get]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));