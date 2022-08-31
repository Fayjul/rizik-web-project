import React, { useContext, useReducer } from 'react';
import { Store } from '../Store';
import './style.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function BankScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [deposite, setDeposite] = useState('');
  const [withdraw, setWithdraw] = useState('');
  const [bankBalance, setBankBalance] = useState(userInfo.balance);
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const depositeButtonHandler = async (e) => {
    e.preventDefault();
    const amount = parseInt(deposite);
    console.log('Deposite Button Clicke', deposite);
    //userInfo.balance += amount;
    setDeposite('');
    const newBalance = userInfo.balance + amount;
    const userId = userInfo._id;
    setBankBalance(newBalance);

    try {
      const { data } = await axios.put(
        '/api/bank/profile',
        {
          userId,
          amount,
          newBalance,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'UPDATE_REQUEST', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Deposit successfully');
    } catch (err) {
      dispatch({
        type: 'UPDATE_FAIL',
      });
      toast.error(getError(err));
    }
  };
  const withdrawButtonHandler = async (e) => {
    e.preventDefault();
    const amount2 = parseInt(withdraw);
    // console.log('Deposite Button Clicke', deposite);
    userInfo.balance -= amount2;
    setWithdraw('');
  };

  return (
    <div>
      <h1 align="center">
        Wellcome to Out bank <br></br>
        <span>{userInfo.name}</span>
      </h1>
      <br></br>
      <div class="col-md-12" align="center">
        <div class="balance status">
          <h5>Balance</h5>
          <h2>
            $ <span id="currentBalance">{bankBalance}</span>{' '}
          </h2>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-md-6">
          <h3 align="center">Withdraw</h3>
          <Form.Group className="submit-area" controlId="name">
            <Form.Label>Withdraw Amount</Form.Label>
            <Form.Control
              required
              value={withdraw}
              type="text"
              onChange={(e) => setWithdraw(e.target.value)}
            />
            <br></br>
            <Button type="submit" onClick={withdrawButtonHandler}>
              Withdraw
            </Button>
          </Form.Group>
          <br></br>
        </div>
        <div className="col-md-6">
          <h3 align="center">Deposite</h3>
          <Form.Group className="submit-area" controlId="name">
            <Form.Label>Deposite Amount</Form.Label>
            <Form.Control
              required
              type="text"
              value={deposite}
              onChange={(e) => setDeposite(e.target.value)}
            />
            <br></br>
            <Button type="submit" onClick={depositeButtonHandler}>
              Deposite
            </Button>
          </Form.Group>
        </div>
      </div>
    </div>
  );
}
