import { fontSizes } from '@/ui/theme/font';
import { BaseView, BaseViewProps } from '../BaseView';
import { CSSProperties, useEffect, useState } from 'react';

export interface TextAreaProps extends BaseViewProps {
  text: string;
  placeholder: string;
  height?: string;
  onChange: (newValue: string) => void;
  onBlur?: (newValue: string) => void; 
}

const $textAreaStyle = {
  backgroundColor: 'rgb(42, 38, 38)',
  flexWrap: 'wrap',
  padding: 10,
  userSelect: 'text',
  maxHeight: 584,
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontSize: fontSizes.xs
} as CSSProperties;

export function TextArea(props: TextAreaProps) {
  const { style: $styleOverride, text, placeholder, height, onChange, onBlur, ...rest } = props;
  const [inputText, setInputText] = useState(text);
  const $style = Object.assign({}, $textAreaStyle, $styleOverride);

  const handleInputChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setInputText(value);
    onChange(value);
  };

  useEffect(() => {
    setInputText(text)
  }, [text])
  return (
    <BaseView style={{ ...$style, height: height || '100%' }} {...rest}>
      <textarea
        style={{ width: '100%', height: '100%', border: 'none', resize: 'none', outline: 'none', background: 'rgb(42, 38, 38)', color: '#fff' }}
        value={inputText}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={() => {
          if (inputText === placeholder) {
            setInputText('');
          }
        }}
        onBlur={() => {
          if (inputText === '') {
            setInputText(placeholder);
          } else {
            setInputText(inputText);
          }
        }}
      />
    </BaseView>
  );
}