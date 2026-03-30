import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            //#region Why use optional chaining (?.) here?            
            // If loggedIn exists → access .firstName
            // If loggedIn is null or undefined → return undefined instead of throwing an error

            // This is used where loggedIn might be null (e.g. user is not authenticated yet, or data is still loading from an API).
           //#endregion
            subtext="This is a subtitle"
          />

          <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.40}, {currentBalance: 114.30}]}      
      />
    </section>
  );
};

export default Home;
