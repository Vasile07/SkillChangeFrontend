import WavyPage from "@/components/WavyPage";
import RegisterForm from "@/components/register/RegisterForm";

const RegisterScreen: React.FC = () => {
    return (
        <WavyPage title={"Register"} content={<RegisterForm />}/>
    )
}

export default RegisterScreen