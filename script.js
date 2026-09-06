// ============================================================
// SJT NEXUS - API KEY MANAGEMENT
// ============================================================

const links = {
    google: {
        name: "Google Gemini API Key",
        url: "https://aistudio.google.com/app/apikey",
        prefix: "AIzaSy"
    }
};


// ------------------------------------------------------------
// Update API provider information
// ------------------------------------------------------------

function updateGenerationLink() {

    const providerElement =
        document.getElementById("api-provider");

    const linkElement =
        document.getElementById("keygen-link");

    const inputElement =
        document.getElementById("api-key-input");

    if (!providerElement || !linkElement || !inputElement) {
        return;
    }

    const provider = providerElement.value;
    const providerInfo = links[provider];

    linkElement.href = providerInfo.url;

    linkElement.innerText =
        `🔑 Get your ${providerInfo.name} ↗`;

    inputElement.placeholder =
        `${providerInfo.prefix}...`;
}


// ------------------------------------------------------------
// Save API key in browser localStorage
// ------------------------------------------------------------

function saveKey() {

    const provider =
        document.getElementById("api-provider").value;

    const keyInput =
        document.getElementById("api-key-input");

    const statusBox =
        document.getElementById("status-box");

    const keyValue =
        keyInput.value.trim();


    if (!keyValue) {

        showStatus(
            statusBox,
            "Please enter your Gemini API key.",
            "error"
        );

        return;
    }


    // Basic Gemini key format check
    if (!keyValue.startsWith("AIzaSy")) {

        showStatus(
            statusBox,
            "The key does not appear to be a Google Gemini API key. Please check the key and try again.",
            "error"
        );

        return;
    }


    localStorage.setItem(
        `user_key_${provider}`,
        keyValue
    );


    // Do not display the complete API key
    showStatus(
        statusBox,
        "Your Gemini API key has been saved in this browser.",
        "success"
    );
}


// ------------------------------------------------------------
// Remove saved API key
// ------------------------------------------------------------

function clearKey() {

    const provider =
        document.getElementById("api-provider").value;

    const keyInput =
        document.getElementById("api-key-input");

    const statusBox =
        document.getElementById("status-box");


    localStorage.removeItem(
        `user_key_${provider}`
    );


    keyInput.value = "";


    showStatus(
        statusBox,
        "Your saved API key has been removed from this browser.",
        "neutral"
    );
}


// ------------------------------------------------------------
// Display status messages
// ------------------------------------------------------------

function showStatus(
    statusBox,
    message,
    type
) {

    if (!statusBox) {
        return;
    }


    statusBox.style.display = "block";

    statusBox.innerText = message;


    if (type === "success") {

        statusBox.style.backgroundColor = "#d1fae5";
        statusBox.style.color = "#065f46";

    } else if (type === "error") {

        statusBox.style.backgroundColor = "#fee2e2";
        statusBox.style.color = "#991b1b";

    } else {

        statusBox.style.backgroundColor = "#f1f5f9";
        statusBox.style.color = "#334155";
    }
}


// ------------------------------------------------------------
// Connection test
// ------------------------------------------------------------

function simulateApiCall() {

    const provider =
        document.getElementById("api-provider").value;

    const savedKey =
        localStorage.getItem(
            `user_key_${provider}`
        );

    const outputBox =
        document.getElementById("api-output");

    const promptElement =
        document.getElementById("test-prompt");


    const prompt =
        promptElement.value.trim();


    outputBox.style.display = "block";


    if (!savedKey) {

        outputBox.style.borderColor = "#991b1b";

        outputBox.innerText =
            "⚠️ No Gemini API key was found in this browser.\n\n" +
            "Please save your key before testing the connection.";

        return;
    }


    /*
     * IMPORTANT:
     *
     * This is currently only a local configuration test.
     * It does NOT send your API key to Gemini.
     *
     * The actual SJT Nexus Gemini request will be connected
     * to the Flask/Render application separately.
     */


    const keyPreview =
        savedKey.substring(0, 6) + "...";


    outputBox.style.borderColor =
        "var(--primary)";


    outputBox.innerText =
        "✓ Gemini API key found.\n\n" +
        `Key: ${keyPreview}\n` +
        `Test message: ${prompt || "Hello from SJT Nexus!"}\n\n` +
        "The browser has the key available.\n" +
        "Actual Gemini processing will be handled by the SJT Nexus application.";
}


// ------------------------------------------------------------
// Load saved key when page opens
// ------------------------------------------------------------

window.addEventListener(
    "DOMContentLoaded",
    function () {

        updateGenerationLink();


        const provider =
            document.getElementById("api-provider").value;


        const savedKey =
            localStorage.getItem(
                `user_key_${provider}`
            );


        if (savedKey) {

            document.getElementById(
                "api-key-input"
            ).value = savedKey;

            const statusBox =
                document.getElementById("status-box");


            showStatus(
                statusBox,
                "A Gemini API key is already saved in this browser.",
                "neutral"
            );
        }

    }
);
