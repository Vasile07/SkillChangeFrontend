import WavyPage from "@/components/WavyPage";
import ForgotPasswordNewPasswordForm from "@/components/forgotPassword/ForgotPasswordNewPasswordForm";

const ForgotPasswordNewPasswordScreen: React.FC = () => {
    return (
        <WavyPage title={"Forgot Password"} content={<ForgotPasswordNewPasswordForm/>}/>
    )
}

export default ForgotPasswordNewPasswordScreen;