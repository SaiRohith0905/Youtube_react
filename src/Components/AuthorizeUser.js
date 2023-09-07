import React from "react";

const AuthorizeUser = () => {
  const clientId =
    "190912028867-sgu0icqt9981uhrjg04viudd8vjq6sml.apps.googleusercontent.com";
  const redirectURL = "http://localhost:3000";
  const youtubeScopes = "https://www.googleapis.com/auth/youtube";
  //   const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  //   const params = {
  //     client_id: clientId,
  //     redirect_uri: "http://localhost:3000",
  //     response_type: "token",
  //     scope: "https://www.googleapis.com/auth/youtube",
  //     include_granted_scopes: "true",
  //     state: "pass-through value",
  //   };

  //   const handleSubmit = () => {
  //     const form = document.createElement("form");
  //     form.method = "GET";
  //     form.action = oauth2Endpoint;

  //     for (const param in params) {
  //       const input = document.createElement("input");
  //       input.type = "hidden";
  //       input.name = param;
  //       input.value = params[param];
  //       form.appendChild(input);
  //     }

  //     document.body.appendChild(form);
  //     form.submit();
  //   };
  const handleSubmit = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${youtubeScopes}&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${redirectURL}&client_id=${clientId}`;
    const data = window.open(url, "_self");
  };

  return (
    <>
      <div>
        <button
          className="border border-solid border-gray-200 pl-3 pr-3 pt-1 pb-1 cursor-pointer rounded-l-full rounded-r-full hover:bg-blue-200 text-blue-500"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
    </>
  );
};

export default AuthorizeUser;

//ya29.a0AfB_byBlX8IbRqGqiyDfDRF61PUDGYmfQ6wcIrGN52NuW9vOwvhVBphaXJET1s9UfX6Ar6eLDNTvZ3V5ANoOxG71gkrX-Fa5FSsSHGbAL0aSRkKCdlxmQR1Y03VXuL-B_nez3AEiEbDaJt13yVFFBDSXI9SnU0w-BylYLgaCgYKAaoSAQ8SFQHsvYls6ZyEOtZ8uQ7f-GN1esZhZQ0173
