import { createContext } from "react";

// context for accountID so that it can be accessed anywhere in the app
// by using the useContext hook
// eg.
//
// import { AccountID } from "../components/accountID";
// const { accountID } = useContext(AccountID);
// console.log(accountID) = 0
//
// set in LoginScreen using the setUserID function
// eg. setUserID(123);

const AccountID = createContext({
    userID: -1,
    setUserID: () => {},
});

export default AccountID;
