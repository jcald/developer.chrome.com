/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');
const path = require('path');

const namespacesCachePath = path.join(__dirname, 'namespaces-source.json');

/**
 * @return {Promise<{[name: string]: any}>}
 */
module.exports = async () => {
  if (process.env.ELEVENTY_IGNORE_EXTENSIONS) {
    return {};
  }

  let namespaces = [];
  try {
    namespaces = JSON.parse(fs.readFileSync(namespacesCachePath, 'utf-8'));
  } catch (e) {
    console.warn('Namespaces data not available, try running `TODO`...');
  }

  return namespaces.map(api => {
    const lastPart = path.basename(api.name);
    return {
      name: lastPart,
      permalink: `en/docs/tools/reference/${lastPart}/`,
      reflection: api,
    };
  });
};
