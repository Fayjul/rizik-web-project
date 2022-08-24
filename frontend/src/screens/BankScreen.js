import React, { useContext } from 'react';
import { Store } from '../Store';

export default function BankScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  return (
    <div>
      <p>This is form bank</p>
      <p>Name: {userInfo.name}</p>
      <p>Your Balance: {userInfo.balance}</p>
    </div>
  );
}
