import { polyfill as polyfillEncoding } from "react-native-polyfill-globals/src/encoding";
import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream";
import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { Amplify } from "aws-amplify";
import config from "@/constants/aws-config";

loadDevMessages();
loadErrorMessages();

polyfillReadableStream();
polyfillEncoding();
polyfillFetch();

Amplify.configure(config)

export { }