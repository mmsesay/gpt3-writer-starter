import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";

const Home = () => {
  const [additionalInput, setAdditionalInput] = useState("");
  const [senderName, setSenderName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientCompanyName, setRecipientCompanyName] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSwitchView, setIsSwitchView] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const callGenerateEndpoint = async () => {
    if (
      recipientName === "" ||
      recipientCompanyName === "" ||
      jobTitle === "" ||
      senderName === ""
    ) {
      setErrorMessage(
        "Please note that, your name, job title, recipient name and company name are required."
      );
    } else {
      setErrorMessage("");
      setIsGenerating(true);

      console.log("Calling OpenAI...");

      // write a front-end developer job follow-up email to Niko who works at elspace; tell him my name is Maej
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientName,
          recipientCompanyName,
          jobTitle,
          senderName,
          additionalInput,
        }),
      });

      const data = await response.json();
      const { output } = data;
      console.log("OpenAI replied...", output.text);

      setApiOutput(`${output.text}`);
      setIsGenerating(false);
    }
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Don't Delay - Take Advantage Now! MailEase 📧</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Streamline Your Email Reach-Out Process and Reach More People
              Quickly.
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          {!apiOutput && !isSwitchView ? (
            <>
              <p className="instruction-text">
                Fill in the form below and generate
              </p>
              <span className="error-text">{errorMessage && errorMessage}</span>
              {/* inputs */}
              <div className="flex">
                <input
                  type="text"
                  placeholder="What's your name?"
                  className="prompt-box"
                  value={senderName}
                  onChange={(event) => setSenderName(event.target.value)}
                />

                <input
                  type="text"
                  placeholder="What's the job title?"
                  className="prompt-box"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                />
              </div>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Who is the recipient?"
                  className="prompt-box"
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                />

                <input
                  type="text"
                  placeholder="What is the name of recipient's company?"
                  className="prompt-box"
                  value={recipientCompanyName}
                  onChange={(event) =>
                    setRecipientCompanyName(event.target.value)
                  }
                />
              </div>

              <textarea
                placeholder="please type any additional here"
                className="prompt-box"
                value={additionalInput}
                onChange={(event) => setAdditionalInput(event.target.value)}
              />

              <div className="prompt-buttons">
                <a className="button" onClick={callGenerateEndpoint}>
                  <div className="generate">
                    <div className="generate">
                      {isGenerating ? (
                        <span class="loader"></span>
                      ) : (
                        <p>Generate</p>
                      )}
                    </div>
                  </div>
                </a>
                <a
                  className="button compose-btn"
                  onClick={() => setIsSwitchView(true)}
                >
                  <div className="generate">
                    <p>View Recent MailEase</p>
                  </div>
                </a>
              </div>
            </>
          ) : (
            <div className="output flex items-center">
              <div>
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>Output</h3>
                  </div>
                </div>
                <div className="output-content">
                  <p>
                    {apiOutput
                      ? apiOutput
                      : "No mail ease generated yet! Please click on compose new mail ease button and fill in the form"}
                  </p>
                </div>
              </div>
              <a
                className="button compose-btn"
                onClick={() => setIsSwitchView(false)}
              >
                <div className="generate">
                  <p>Compose New MailEase</p>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
