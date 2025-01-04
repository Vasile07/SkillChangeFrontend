import {Redirect} from "expo-router";

const DefaultPage: React.FC = () => {
    return <Redirect href="/(tabs)/HomePage"/>;
};

export default DefaultPage;
