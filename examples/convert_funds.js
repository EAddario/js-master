/**
 * This is JavaScript implementation of the
 * {@link https://www.currencycloud.com/developers/cookbooks/ Currency Cloud API v2.0 Cookbook} example.
 * Additional documentation for each API endpoint can be found at {@link https://www.currencycloud.com/developers/overview}.
 * If you have any queries or you require support, please contact our Support team at {@link support@currencycloud.com}.
 */

'use strict';

let currencyCloud = require('../lib/currency-cloud');

let convertFunds = {
  getQuote: {
    buyCurrency: "EUR",
    sellCurrency: "GBP",
    amount: 10000,
    fixedSide: "buy"
  },
  conversion: {
    buyCurrency: "EUR",
    sellCurrency: "GBP",
    amount: 10000,
    fixedSide: "buy",
    reason: "Top up Euros balance",
    termAgreement: true
  }
};

/**
 * Convert funds from one currency to another
 *  A conversion is a process whereby money held in one currency is traded for money in another currency. Currencycloud can
 * convert money into currencies of all the world’s major economies.
 *
 * In this cookbook, you will:
 *
 * 1. Get a quote for trading Pound Sterling (GBP) for Euros (EUR).
 * 2. Top up your Euros balance by trading some Pound Sterling.
 */

/**
 * 1. Authenticate using valid credentials.
 * If you do not have a valid Login ID and API Key, you can get one by registering at
 * {@link https://www.currencycloud.com/developers/register-for-an-api-key/}
 */

let login = () => {
  return currencyCloud.authentication.login({
    environment: 'demo',
    loginId: 'development@currencycloud.com',
    apiKey: 'deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef'
  });
};

/**
 * 2. Get a detailed quote
 * Check how much it will cost to buy 10,000 Euros using funds from your Pound Sterling balance, by making a call to the
 * Get Detailed Rates endpoint
 */

let getQuote = () => {
  return currencyCloud.rates.get(convertFunds.getQuote)
    .then(function (res) {
      console.log('getQuote: ' + JSON.stringify(res, null, 2) + '\n');
    });
};

/**
 * On success, the response payload will contain details of Currencycloud’s quotation to make the conversion.
 */

/**
 * If you’re happy with the quote, you may create the conversion by calling the Create Conversion endpoint.
 */

var createConversion = () => {
  return currencyCloud.conversions.create(convertFunds.conversion)
    .then(function (res) {
      console.log('createConversion: ' + JSON.stringify(res, null, 2) + '\n');
    });
};

/**
 * On success, the payload of the response message will contain full details of the conversion as recorded against your
 * Currencycloud account.
 *
 * This conversion will settle automatically on the settlement_date as long as there are sufficient funds in the account’s
 * GBP balance to cover the client_sell_amount. Please use your Cash Manager to top up your GBP balance if necessary.
 */

/**
 * 4. Logout
 * It is good security practice to retire authentication tokens when they are no longer needed, rather than let them
 * expire. Send a request to the Logout endpoint to terminate an authentication token immediately.
 */

let logout = () => {
  return currencyCloud.authentication.logout()
    .then(() => {
      console.log('logout\n');
    });
};

login()
  .then(getQuote)
  .then(createConversion)
  .then(logout)
  .catch((err) => {
    if (err instanceof currencyCloud.APIerror) {
      console.log(err.toYAML());
    }
    else {
      console.log(err);
    }
  });
