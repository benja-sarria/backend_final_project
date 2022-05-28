import { createContext, useEffect, useState } from "react";
import { UserModel } from "../../models/UserModel";

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<UserModel>();

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
