import WavyPage from "@/components/WavyPage";
import ForgotPasswordCodeVerificationForm from "@/components/forgotPassword/ForgotPasswordCodeVerificationForm";

const ForgotPasswordCodeCompletionScreen: React.FC = () => {
    return (
        <WavyPage title={"Forgot Password"} content={<ForgotPasswordCodeVerificationForm/>}/>
    )
}

export default ForgotPasswordCodeCompletionScreen;