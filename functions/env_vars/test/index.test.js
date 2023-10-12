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

import assert from "assert";
import {getFunction} from "@google-cloud/functions-framework/testing";

describe("envVar", () => {
  before(async () => {
    // load the module that defines sample function
    await import("../index.js");
    process.env['FOO'] = 'bar';
  });

  it("returns the value for FOO variable", () => {
    // get the function using the name it was registered with
    const envVar = getFunction("envVar");
    const req = {
      body: {},
    };
    // a Response stub that captures the sent response
    let result;
    const res = {
      send: (x) => {
        result = x;
      },
    };
    // invoke the function
    envVar(req, res);
    assert.equal(result, "bar");
  });
});