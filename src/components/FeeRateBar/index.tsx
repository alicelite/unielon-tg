import { CSSProperties, useEffect, useState } from 'react';
import { colors } from '@/ui/theme/colors';
import { amountToSaothis, satoshisToAmount } from '@/ui/utils';

import { Column } from '../Column';
import { Input } from '../Input';
import { Row } from '../Row';
import { Text } from '../Text';
import { useTools } from '../ActionComponent';
import { getFeeSummary } from '../../shared/cardinals';

enum FeeRateType {
  SLOW,
  AVG,
  CUSTOM
}

export function FeeRateBar({ onChange, isMint, isPage, type, onDefaultValueChanged }: { onChange: (val: number) => void, isMint?: boolean, isPage?: boolean, type?: string, onDefaultValueChanged?: (val: number) => void }) {
  const [feeOptions, setFeeOptions] = useState<{ title: string; feeRate: number }[]>([]);
  const [formatError, setFormatError] = useState('')
  useEffect(() => {
    getFeeSummary().then(async (v: any) => {
      const options = [
        {
          title: 'Slow',
          feeRate: 5000000
        },
        {
          title: 'Normal',
          feeRate: v?.medium_fee_per_kb || 100000000
        },
        { title: 'Custom', feeRate: 0 }
      ]
      setFeeOptions([...options])
      onDefaultValueChanged && onDefaultValueChanged(v?.medium_fee_per_kb);
    }).catch(() =>{
      let options = [
        {
          title: 'Slow',
          feeRate: 10000000
        }
      ]
      if(isPage || isMint) {
        options = [
          {
            title: 'Normal',
            feeRate: 100000000
          }
        ]
      }
      if(type === 'Ai-NFT') {
        options = [
          {
            title: 'Normal',
            feeRate: 200000000
          }
        ]
      }
      onDefaultValueChanged && onDefaultValueChanged(options[0].feeRate);
      setFeeOptionIndex(FeeRateType.SLOW)
      setFeeOptions([...options]);
    });
  }, []);

  const [feeOptionIndex, setFeeOptionIndex] = useState(FeeRateType.AVG);
  const [feeRateInputVal, setFeeRateInputVal] = useState('');
  const tools = useTools();
  useEffect(() => {
    const defaultOption = feeOptions[1];
    const defaultVal = defaultOption ? defaultOption.feeRate : 0;
    let val = defaultVal;
    if (feeOptionIndex === FeeRateType.CUSTOM && !isMint) {
      val = parseInt(feeRateInputVal) || 0;
    } else if (feeOptions.length > 0) {
      val = feeOptions[feeOptionIndex]?.feeRate;
    }
    onChange(val);
  }, [feeOptions, feeOptionIndex, feeRateInputVal]);
  const adjustFeeRateInput = (inputVal: any) => {
    const val = parseInt(inputVal);
    if (!val) {
      setFeeRateInputVal('');
      return;
    }
    const inputAmount = amountToSaothis(val)
    setFeeRateInputVal(inputAmount.toString());
  };
  return (
    <Column>
      <Row justifyCenter>
        {feeOptions.map((v, index) => {
          const shouldRenderSlowOption = (v.title !== 'Slow' || !isPage)
          const selected = index === feeOptionIndex;
          return shouldRenderSlowOption && (
            <div
              key={v.title}
              onClick={() => {
                setFeeOptionIndex(index);
                setFeeRateInputVal('')
              }}
              style={Object.assign(
                {},
                {
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  height: 75,
                  width: 85,
                  textAlign: 'center',
                  padding: 4,
                  borderRadius: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer'
                } as CSSProperties,
                selected ? { backgroundColor: colors.primary } : {}
              )}
            >
              <Text text={v.title} textCenter style={{ color: selected ? colors.black : colors.white }} />
              {(v.title !== 'Custom') && (
                <Text
                  text={`${satoshisToAmount(v.feeRate)} DOGE`}
                  size="xxs"
                  textCenter
                  style={{ color: selected ? colors.black : colors.white }}
                />
              )}
            </div>
          );
        })}
      </Row>
      {
        feeOptionIndex === FeeRateType.CUSTOM &&
        <Input
          preset="amount"
          placeholder={'DOGE'}
          defaultValue={feeRateInputVal}
          onChange={async (e) => {
            adjustFeeRateInput(e.target.value);
            if(+e.target.value < +satoshisToAmount(feeOptions[1]?.feeRate)) {
              tools.toastError(`The minimum cannot be less than ${satoshisToAmount(feeOptions[1]?.feeRate)}`);
            }
          }}
          onBlur={(e) => {
            const val = e.target.value
            const inputAmount = amountToSaothis(val)
            setFeeRateInputVal(inputAmount.toString())
            const normalRate = feeOptions[1]?.feeRate || 100000000
            if(+inputAmount < 10000000 && !isPage) {
              setFormatError('The minimum cannot be less than 0.1')
            } else if (isPage && +inputAmount < normalRate) {
              setFormatError(`The minimum cannot be less than ${satoshisToAmount(normalRate)}`)
            }
            else {
              setFormatError('')
            }
          }}
          autoFocus={true}
        />
      }
      {
        (feeOptionIndex === FeeRateType.CUSTOM) && <Text text={formatError} preset="regular" color="error" />
      }
    </Column>
  );
}
