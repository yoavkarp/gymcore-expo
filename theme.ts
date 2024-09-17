import { Typography, Colors, Spacings } from 'react-native-ui-lib';

Colors.loadColors({
    error: Colors.red50,
});

Typography.loadTypographies({
    h1: { fontSize: 58, fontWeight: '300', lineHeight: 80 },
    h2: { fontSize: 46, fontWeight: '300', lineHeight: 64 },
});

Spacings.loadSpacings({
    page: 4
});
