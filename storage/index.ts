import { MMKV, Mode } from 'react-native-mmkv'

export const storage = new MMKV({
    id: `storage`,
    path: `mmkv`,
    encryptionKey: 'hunter2',
    mode: Mode.MULTI_PROCESS
})