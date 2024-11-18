import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from 'react';
  import { User, userInfoService } from '../services/userInfo';
  
  const Context = createContext<User | undefined | null>(null);
  
  interface CurrentUserProviderProps {
    children: ReactNode;
  }
  
  export function useCurrentUser() {
    const user = useContext(Context);
  
    if (user === null) {
      throw new Error(
        'useCurrentUser should only be used inside CurrentUserProvider'
      );
    }
  
    return user;
  }
  
  export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
    const [user, setUser] = useState<User | undefined>(
      userInfoService.initialUser
    );
  
    useEffect(() => {
      userInfoService.setHandler(setUser);
  
      return () => userInfoService.setHandler(null);
    }, []);
  
    return <Context.Provider value={user}>{children}</Context.Provider>;
  }
  