import { encode } from './base-64.utils';
import { timeSpan } from './timespan.util';

/**
 *
 * @param {function} signer - The signer function, must return Promise<string>
 * @param {any} body - Body to add to the sign
 */
export const eth_sign = async (signer, expires_in = '1d', body = {}) => {
  const expires_in_date = timeSpan(expires_in);

  validateInput(body);

  const data = {
    'MegaCiclon-Version': 1,
    'Expire-Date': expires_in_date,
    ...body,
  };

  const msg = buildMessage(data);

  if (typeof signer === 'function') {
    var signature = await signer(msg);
    console.log(signature);
  } else {
    throw new Error(
      '"signer" argument should be a function that returns a signature eg: "msg => web3.eth.personal.sign(msg, <YOUR_ADDRESS>)"'
    );
  }

  if (typeof signature !== 'string') {
    throw new Error(
      '"signer" argument should be a function that returns a signature string (Promise<string>)'
    );
  }

  const token = encode(
    JSON.stringify({
      signature,
      body: msg,
    })
  );

  return token;
};

const validateInput = (body) => {
  for (const key in body) {
    const field = body[key];

    if (key === 'Expire-Date') {
      throw new Error('Please do not rewrite "Expire-Date" field');
    }

    if (key === 'Web3-Token-Version') {
      throw new Error('Please do not rewrite "Web3-Token-Version" field');
    }

    if (typeof field !== 'string') {
      throw new Error('Body can only contain string values');
    }
  }
};

const buildMessage = (data) => {
  const message = [];
  for (const key in data) {
    message.push(`${key}: ${data[key]}`);
  }
  return message.join('\n');
};
