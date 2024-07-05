import React, { useEffect } from 'react';
import { CognitoUserPool, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

interface UserPoolData {
    UserPoolId: string;
    ClientId: string;
}

const userPoolData: UserPoolData = {
    UserPoolId: 'us-east-1_sPsqSDdCM',
    ClientId: '3qjfivb084iiqc22uo0685ptqg'
};

const userPool = new CognitoUserPool(userPoolData);

const ChatbotLoader: React.FC = () => {
    useEffect(() => {
        // localStorage.clear();
        // localStorage.setItem(`CognitoIdentityServiceProvider.${userPoolData.ClientId}.${"savan"}.idToken`, "eyJraWQiOiJSeGh2U0dvNkZtd3l5UDNMdEhUc1wvbm51YUViT3pkRWpvSG13eE15cmJUST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3NDc4YjQyOC02MDcxLTcwMDMtMTg3Zi1kMGJkMzdjZDJlMWYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfc1BzcVNEZENNIiwiY29nbml0bzp1c2VybmFtZSI6InNhdmFuIiwib3JpZ2luX2p0aSI6IjM3NjAzYmZjLWFiODctNDlhMi05YWRhLTY4NmJlYjA4NTdhZSIsImF1ZCI6IjNxamZpdmIwODRpaXFjMjJ1bzA2ODVwdHFnIiwiZXZlbnRfaWQiOiJlMDY5ZWQwZC0xOTA2LTRiZGQtYTNkMy1mZWNhOTdmYzNlNjMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxOTQyMTcxMCwiZXhwIjoxNzE5NDI1MzEwLCJpYXQiOjE3MTk0MjE3MTAsImp0aSI6Ijk1NjY2ODE3LTRiN2UtNGM3NC04MzE1LTJjMDkxMWVkMTlkZiIsImVtYWlsIjoic2F2YW5wYXRlbDAwNzBAZ21haWwuY29tIn0.FN2y9j-DFFB8-SPql2LcqG1a9YShrHML_UcR5nZe9n2xdsuNVd74aZpPTjoi565STWa68ycTjJFrOV7UbSI_wbUyq31GZX7eKXzOeh7zC6tlNKG4WXqnncRh7iBcTFy8fnBg3VWQXrzTj6Ed-eeiNBD9h1hF23LzoCoqwemUTq4q5ZUmuAXxZpQVUDTznG2e8W1uTN-kV-YwbsIDlCQqJF1dwGg0sgH-OnQOB4ncoDCp0b2SL4GxdqAJOeHmeV6A6Cff47N3MY41NFMGJw8bqDe2jttsKpoVddZLrBf2jMT0K11nyznDByt7stBbLuYae9dOokWnd7X5MMYCll3VKQ");
        // localStorage.setItem(`CognitoIdentityServiceProvider.${userPoolData.ClientId}.${"savan"}.accessToken`, "eyJraWQiOiJUdWRzVmZGcnNJbWNtZ3BCejR2VXJcL2lLVGRtUDRiMDVUdVJQSzRVaW83cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3NDc4YjQyOC02MDcxLTcwMDMtMTg3Zi1kMGJkMzdjZDJlMWYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9zUHNxU0RkQ00iLCJjbGllbnRfaWQiOiIzcWpmaXZiMDg0aWlxYzIydW8wNjg1cHRxZyIsIm9yaWdpbl9qdGkiOiIzNzYwM2JmYy1hYjg3LTQ5YTItOWFkYS02ODZiZWIwODU3YWUiLCJldmVudF9pZCI6ImUwNjllZDBkLTE5MDYtNGJkZC1hM2QzLWZlY2E5N2ZjM2U2MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MTk0MjE3MTAsImV4cCI6MTcxOTQyNTMxMCwiaWF0IjoxNzE5NDIxNzEwLCJqdGkiOiI0YTkxY2E4OC1lYTE2LTRlMjgtYmJkZC0yODVhNzVhODdlNTYiLCJ1c2VybmFtZSI6InNhdmFuIn0.HHglfXHWu95oV0Lg-lR5Yr41G7j1b257xD-R9ES5yAJHHzIu1IV7ipkVnWO6NjK9Uw7aaNG9ZxQEMsUH-24ksOaTos-nB29C09W3NWKpGlTOhdG33WS1M2hnygXJ6T_5narkn2nXrhgqukjZN1eZHl8oHHmxCbauFnZ9NDbJnl-ysxlmb3gz3W4QC_JXmHdockidC-Z4ZupQmGnce-wsdFL9lAFH14g3rNh8ISuNTrPT5OZjUSdA4jUIu0pTPS-Dn15JoNDeix_fc-Di307Gpz76FhakxYfrB2kpl5uHct_XrPcWfZWX96gFQ_OFOzFrUg5ltR_-NYll3ufxwYDvPg");
        // localStorage.setItem(`CognitoIdentityServiceProvider.${userPoolData.ClientId}.${"savan"}.refreshToken`, "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.ZXWMV6WfeFJ5NZ4fTUOSrIUXWPPXDhZNu4Sl1Wng223Lb8wx0JCpxRW0NojqjKIKhBhS-B0mBG0k16R02rEVOT_KDEhyxkl6oo7udqIQfyePX0eo4S5fL51_hzbn0D49T3z_5C_7e2_wxtSpLtk4MjY_LkdcWBwLTjkN6e4wsv0lZgP3iQAy0sZ3X6UJRGnc7PatGF9dfkBhI_lwDcqkLJ8Vk7HVLYpKCWFimsOWKAS_LLmew02uQ-mIQlAwpm8So9jKn4qGVdJDDliVDKrFhwDaAHHP_FILeb8ALK6Kr-XPQryGjILjDjRTe9GORmaWia3dZL8jvoNpVf-ftNnc7A.KQ96yN4tmVjUTEAv.Z7Qe3Li5eGjYzGcbontHkAzX-TdtsBW9v3nM8moV3_s5hcJjqTgEJ0A738MiXxNT4ecIRPf071kf7pyG4ib49uVS0j5qIs9NyynBlh7l_dAoWtESUjR4yisdwwto6RUYrppbSBkv7YrSHGXfEAEhuJWUhVYhkoT_wLRWB6Racm0nELuXZBPrTvXR_oo6ASwZB_by2Yzo44llRjdn9gg4ynlNTGyhnNedM2mhk7HVjKvma0g5lUJNwqG6SGyHkqu1vj-ddiNXAArszOv723zQ1Vmm2bJB6oHIkWowjt8HZwNTXnvV-GchWjsd-NfIljrdTjGoRRuBcyV3OApKS5a05ZmLMV8um3ptnWz-ObsYC9Rhe66vnfDPKtP6PgqNBJU1ycs_efZoP_L_hvtjNLBs5fDTiyQyK9NDwL5Xevyjvthgvq3zz44SbP1R2rQZWYeUwrbY6WD5kYA3IG6XjwObwK9V3eVmjBlCJdeeDhOPcu4ORW0ozlYXGYzHYxRAhk-EkeB5W4AhV7jlChehetEvZZXDYOUJIro1xhstSJ5G8vAYk88IkqWVWQ1BJMUG7P0S__TsO-wDuT4NE37hwwHQgkcA7ocW566vZpmVJVzsHcepJHag_HMgcmyo27-KeMRHsK6qh_WqxkxPZAY3t6X_OPYMulBOAsgqPe_AluVzi0B6h45H2h0Do3hjQ1iqCM6QuPxkunjnptx4qiUTO_hjCmdfbVWhqIEmSXGOrfyDXY-lT8yYTm4qUrBUa8428Ydb73cYeW7pxe9o1s5mCHrmWWWufXhXAsEhl3mrLuoFhzPG_kfS81Gxuo4xeVJ9rjUaCop1N-SYXeUwSJtYmzmu0k0uoWYPQPkeuRs1gvKdgOIEGRPJOyvYZBA2jVjKAV2FrhVynw5m19yxycnj0qcMVO1VUA_j5-Sw2wQmv0Q0uozqnx2gpdaj-hh0UAhBp7oBnCkFaHIVDj1ZmWe15GpxTjO2FfdRRgxrTJpNZsc1xmqoo6PBSIHvnwsGtpCP8bn5U5nOvG5nEGuBf2LdJi1qr_FhYxraFszfvB7dhrVxGkMl0fbZT5ptLotgBAquBr7vj12-Pk2cjJS6t8cSzyhKw9qxwzWoecr9EwjxXeAoEVDLIt7d38dDoXudJ5eJM23jJx--lkGI9ILMxFgnlnk8YxI5_Z6RN44_fL6wk2mtslL_LrfRAhIUY9RkqLjKrvpwTYV7rInBwNro6ndg_uvhrFrudPvReoBRzhQlhPt8nXddOU4gJqdUkh2lOdTk-6Hmb8M.dMqqB0tr_2D3mA4M4o4BcA");
        // localStorage.setItem(`CognitoIdentityServiceProvider.${userPoolData.ClientId}.LastAuthUser`, "savan");

        const currentUser: CognitoUser | null = userPool.getCurrentUser();
        console.log(currentUser);

        if (currentUser) {
            currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
                console.log(session);
                if (err) {
                    console.error('Session error:', err);
                    localStorage.setItem('isAuthenticated', 'false');
                } else if (session && session.isValid()) {
                    localStorage.setItem('isAuthenticated', 'true');
                } else {
                    localStorage.setItem('isAuthenticated', 'false');
                }
            });
        } else {
            localStorage.setItem('isAuthenticated', 'false');
        }
    }, []);

    return null;
};

export default ChatbotLoader;
