import React, { useEffect, useState } from 'react';

const ChatBot: React.FC = () => {
    const [showBot, setShowBot] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://project-lex-web-ui-bucket.s3.amazonaws.com/lex-web-ui-loader.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            setTimeout(() => {
                const loader = (window as any).LexWebUiLoader;
                if (loader) {
                    const lexConfig = {
                        botName: 'NavigateSite',
                        botAlias: 'TestBotAlias',
                        region: 'us-east-1',
                        cognitoIdentityPoolId: 'us-east-1:6b594341-11b5-4d51-a765-9b078dd332b7',
                    };
                    try {
                        loader.load(lexConfig);
                    } catch (error) {
                        console.error("Error initializing Lex Web UI: ", error);
                    }
                } else {
                    console.error("LexWebUiLoader is not defined after delay.");
                }
            }, 3000);
        };

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div>
            <button onClick={() => setShowBot(!showBot)}>
                {showBot ? 'Hide Chatbot' : 'Show Chatbot'}
            </button>
            {showBot && <div id="lex-web-ui"></div>}
        </div>
    );
}

export default ChatBot;
