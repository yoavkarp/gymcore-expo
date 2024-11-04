// import { polyfill as polyfillEncoding } from "react-native-polyfill-globals/src/encoding";
// import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream";
// import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch";

// import 'react-native-url-polyfill/auto';  // Polyfill for URL and fetch
// import 'react-native-get-random-values';  // Polyfill for generating random values
// import 'react-native-polyfill-globals/auto';  // For missing globals

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { Amplify } from "aws-amplify";
import config from "@/constants/aws-config";
import AWS from 'aws-sdk';


loadDevMessages();
loadErrorMessages();

// polyfillReadableStream();
// polyfillEncoding();
// polyfillFetch();

Amplify.configure(config)

export { }