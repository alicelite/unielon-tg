import React, { CSSProperties, useEffect, useState } from 'react';

import { SATS_DOMAIN, UNIELON_DOMAIN } from '@/shared/constant';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

import { Icon } from '../Icon';
import { $textPresets, Text } from '../Text';
import './index.less';
import { Inscription } from '../../shared/types';

export interface InputProps {
  preset?: Presets;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  defaultValue?: string;
  value?: string;
  style?: CSSProperties;
  containerStyle?: CSSProperties;
  addressInputData?: { address: string; domain: string };
  onAddressInputChange?: (params: { address: string; domain: string; inscription?: Inscription }) => void;
  disabled?: boolean;
}

type Presets = keyof typeof $inputPresets;
const $inputPresets = {
  password: {},
  amount: {},
  address: {},
  text: {}
};

const $baseContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#2a2626',
  paddingLeft: 15.2,
  paddingRight: 15.2,
  paddingTop: 11,
  paddingBottom: 11,
  borderRadius: 5,
  minHeight: '36.5px',
  alignSelf: 'stretch'
};

const $baseInputStyle: CSSProperties = Object.assign({}, $textPresets.regular, {
  display: 'flex',
  flex: 1,
  borderWidth: 0,
  outlineWidth: 0,
  backgroundColor: 'rgba(0,0,0,0)',
  alignSelf: 'stretch'
});

const DOGECOIN_NETWORK = {
  messagePrefix: '\x19Dogecoin Signed Message:\n',
  bech32: 'D',
  bip32: {
    public: 0x02facafd,
    private: 0x02fac398
  },
  pubKeyHash: 0x1e,
  scriptHash: 0x16,
  wif: 0x9e
};
function PasswordInput(props: InputProps) {
  const { placeholder, style: $inputStyleOverride, ...rest } = props;
  const [type, setType] = useState<'password' | 'text'>('password');
  return (
    <div style={$baseContainerStyle}>
      <input
        placeholder={placeholder || 'Password'}
        type={type}
        style={Object.assign({}, $baseInputStyle, $inputStyleOverride)}
        {...rest}
      />
      {type === 'password' && (
        <Icon icon="eye-slash" style={{ marginLeft: spacing.tiny }} onClick={() => setType('text')} color="textDim" />
      )}
      {type === 'text' && <Icon icon="eye" style={{ marginLeft: spacing.tiny }} onClick={() => setType('password')} />}
    </div>
  );
}

function AmountInput(props: InputProps) {
  const { placeholder, disabled, style: $inputStyleOverride, ...rest } = props;
  const $style = Object.assign({}, $baseInputStyle, $inputStyleOverride, disabled ? { color: colors.textDim } : {});
  return (
    <div style={$baseContainerStyle}>
      <input placeholder={placeholder || 'Amount'} type={'number'} style={$style} disabled={disabled} {...rest} />
    </div>
  );
}

export const AddressInput = (props: InputProps) => {
  const { placeholder, onAddressInputChange, addressInputData, style: $inputStyleOverride, ...rest } = props;

  if (!addressInputData || !onAddressInputChange) {
    return <div />;
  }
  const [validAddress, setValidAddress] = useState(addressInputData.address);
  const [parseAddress, setParseAddress] = useState(addressInputData.domain ? addressInputData.address : '');
  const [parseError, setParseError] = useState('');
  const [formatError, setFormatError] = useState('');

  const [inputVal, setInputVal] = useState(addressInputData.domain || addressInputData.address);

  const [inscription] = useState<Inscription>();

  useEffect(() => {
    onAddressInputChange({
      address: validAddress,
      domain: parseAddress ? inputVal : '',
      inscription
    });
  }, [validAddress]);

  const handleInputAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAddress = e.target.value;
    setInputVal(inputAddress);

    if (parseError) {
      setParseError('');
    }
    if (parseAddress) {
      setParseAddress('');
    }
    if (formatError) {
      setFormatError('');
    }

    if (validAddress) {
      setValidAddress('');
    }

    const teststr = inputAddress.toLowerCase();
    if (teststr.endsWith(SATS_DOMAIN) || teststr.endsWith(UNIELON_DOMAIN)) {
     console.log(teststr, 'teststr===')
    } else {
      try {
        const bitcoin = require('bitcoinjs-lib')
        const isValid = bitcoin.address.toOutputScript(inputAddress, DOGECOIN_NETWORK)
        if (!isValid) {
          setFormatError('Recipient address is invalid')
          return;
        }
        setValidAddress(inputAddress)
      } catch(err) {
        setFormatError('Recipient address is invalid')
        console.log(err)
      }
    }
  };

  return (
    <div style={{ alignSelf: 'stretch' }}>
      <div style={Object.assign({}, $baseContainerStyle, { flexDirection: 'column', minHeight: '50px' })}>
        <input
          placeholder={'Address, name.elon'}
          type={'text'}
          style={Object.assign({}, $baseInputStyle, $inputStyleOverride)}
          onChange={async (e) => {
            handleInputAddress(e);
          }}
          defaultValue={inputVal}
          {...rest}
        />
      </div>

      {parseError && <Text text={parseError} preset="regular" color="error" />}
      <Text text={formatError} preset="regular" color="error" />
    </div>
  );
};

function TextInput(props: InputProps) {
  const { placeholder, containerStyle, style: $inputStyleOverride, disabled, autoFocus, ...rest } = props;
  return (
    <div style={Object.assign({}, $baseContainerStyle, containerStyle)}>
      <input
        placeholder={placeholder}
        type={'text'}
        disabled={disabled}
        autoFocus={autoFocus}
        style={Object.assign({}, $baseInputStyle, $inputStyleOverride, disabled ? { color: colors.textDim } : {})}
        {...rest}
      />
    </div>
  );
}

export function Input(props: InputProps) {
  const { preset } = props;

  if (preset === 'password') {
    return <PasswordInput {...props} />;
  } else if (preset === 'amount') {
    return <AmountInput {...props} />;
  } else if (preset === 'address') {
    return <AddressInput {...props} />;
  } else {
    return <TextInput {...props} />;
  }
}
