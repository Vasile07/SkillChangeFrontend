import WavyPage from "@/components/WavyPage";
import ForgotPasswordEmailCompletionForm from "@/components/forgotPassword/ForgotPasswordEmailCompletionForm";
import React from "react";

const ForgotPasswordEmailCompletionScreen: React.FC = () => {
    return (
        <WavyPage title={"Forgot Password"} content={<ForgotPasswordEmailCompletionForm/>}/>
    )
}

export default ForgotPasswordEmailCompletionScreen;