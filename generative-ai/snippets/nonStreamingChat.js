// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START aiplatform_gemini_multiturn_chat_nonstreaming]
const {VertexAI} = require('@google-cloud/vertexai');

/**
 * TODO(developer): Update these variables before running the sample.
 */
async function createNonStreamingChat(
  projectId = 'PROJECT_ID',
  location = 'us-central1',
  model = 'gemini-1.0-pro'
) {
  // Initialize Vertex with your Cloud project and location
  const vertexAI = new VertexAI({project: projectId, location: location});

  // Instantiate the model
  const generativeModel = vertexAI.getGenerativeModel({
    model: model,
  });

  const chat = generativeModel.startChat({});

  const chatInput1 = 'Hello';
  console.log(`User: ${chatInput1}`);

  const result1 = await chat.sendMessage(chatInput1);
  const response1 = result1.response;
  const text1 = response1.candidates[0].content.parts[0].text;
  console.log('Chat bot: ', text1);

  const chatInput2 = 'Can you tell me a scientific fun fact?';
  console.log(`User: ${chatInput2}`);
  const result2 = await chat.sendMessage(chatInput2);
  const response2 = await result2.response;
  const text2 = response2.candidates[0].content.parts[0].text;
  console.log('Chat bot: ', text2);

  const chatInput3 = 'How can I learn more about that?';
  console.log(`User: ${chatInput3}`);
  const result3 = await chat.sendMessage(chatInput3);
  const response3 = await result3.response;
  const text3 = response3.candidates[0].content.parts[0].text;
  console.log('Chat bot: ', text3);
}
// [END aiplatform_gemini_multiturn_chat_nonstreaming]

createNonStreamingChat(...process.argv.slice(2)).catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
