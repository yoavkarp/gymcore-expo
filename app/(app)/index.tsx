import { Href, Redirect } from "expo-router";

const Index = () => {
    return (
        <Redirect href={"home" as Href} />
    );
}

export default Index