import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";

const App = () => {
  const user = useUser();
  return (
    <div>
      {user?.isSignedIn ? (
        <div className="img">
          <UserButton  />
        </div>
      ) : (
        <SignInButton>
          <button className="btn">Login</button>
        </SignInButton>
      )}
    </div>
  );
};

export default App;
