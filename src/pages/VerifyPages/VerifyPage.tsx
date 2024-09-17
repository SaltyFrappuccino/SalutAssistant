import React from "react";

const VerifyPage: React.FC = () => {
    return (
        <div className="verify-page">
            <h1>Verify Your Account</h1>
            <p>Please enter the verification code sent to your email</p>
            <form>
                <input type="text" placeholder="Verification Code" />
                <button type="submit">Создать заявку</button>
            </form>
        </div>
    );
};

export default VerifyPage;