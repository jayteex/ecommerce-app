import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrency } from './currencyFilterSlice';
import { currenciesData } from '../listing/mockData';

export const CurrencyFilter = ({ currencyFilter }) => {
  const dispatch = useDispatch();

  const onClickHandler = (currency) => {
    dispatch(setCurrency(currency));
  };

  return (
    <div id="currency-filters-container">
      <h3>Choose a currency</h3>
      {currenciesData.map(createCurrencyButton)}
    </div>
  );

  function createCurrencyButton(currency) {
    return (
      <button
        className={`currency-button ${currencyFilter === currency && 'selected'}`}
        key={currency}
        onClick={() => onClickHandler(currency)}
      >
        {currency}
      </button>
    );
  }
};
