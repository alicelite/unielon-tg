import React, { CSSProperties, useState } from 'react';

import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

import { Column } from '../Column';
import { Icon, IconTypes } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';

type Presets = keyof typeof $viewPresets;
export interface ButtonProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  subText?: string;
  iconStyle?: CSSProperties;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: CSSProperties;
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: CSSProperties;
  /**
   * An optional style override for the button text.
   */
  textStyle?: CSSProperties;
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: CSSProperties;
  /**
   * One of the different types of button presets.
   */
  preset?: Presets;
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: React.ReactNode;
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: React.ReactNode;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  icon?: IconTypes;
  disabled?: boolean;
  full?: boolean;
}

const $baseViewStyle: CSSProperties = {
  display: 'flex',
  minHeight: 36,
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  // paddingVertical: spacing.small,
  // paddingHorizontal: spacing.small,
  overflow: 'hidden',
  cursor: 'pointer',
  alignSelf: 'stretch',
  paddingLeft: spacing.small,
  paddingRight: spacing.small
};

const $viewPresets = {
  default: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.black_dark
  }) as CSSProperties,

  default_: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.black_gray
  }) as CSSProperties,

  primary: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.yellow,
    height: '40px'
  } as CSSProperties),

  failed: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.failed,
    height: '40px'
  } as CSSProperties),

  success: Object.assign({}, $baseViewStyle, {
    backgroundColor: 'rgb(99, 179, 70)',
    height: '40px'
  } as CSSProperties),
  
  danger: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.red,
    height: '40px'
  } as CSSProperties),

  bar: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.black_dark,
    height: '75px',
    justifyContent: 'space-between',

    paddingTop: spacing.medium,
    paddingBottom: spacing.medium
  } as CSSProperties)
};

const $hoverViewPresets: Record<Presets, CSSProperties> = {
  default: {
    backgroundColor: '#998340'
  },
  default_: {
    backgroundColor: '#383535'
  },
  failed: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  primary: {
    backgroundColor: colors.yellow_dark
  },
  success: {
    backgroundColor: 'rgb(99, 179, 70)'
  },
  danger: {
    backgroundColor: colors.red_dark
  },
  bar: {
    backgroundColor: '#383535'
  }
};

const $baseTextStyle: CSSProperties = {
  // fontSize: 16,
  // lineHeight: 20,
  // fontFamily: typography.primary.medium,
  textAlign: 'center',
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
  color: colors.white,
  paddingLeft: spacing.tiny,
  paddingRight: spacing.tiny
};

const $textPresets: Record<Presets, CSSProperties> = {
  default: $baseTextStyle,
  default_: $baseTextStyle,
  primary: Object.assign({}, $baseTextStyle, { color: colors.black }),
  success: Object.assign({}, $baseTextStyle, { color: colors.white }),
  danger: Object.assign({}, $baseTextStyle, { color: colors.white }),
  bar: Object.assign({}, $baseTextStyle, { textAlign: 'left', fontWeight: 'bold' } as CSSProperties),
  failed: {}
};


const $rightAccessoryStyle: CSSProperties = { marginLeft: spacing.extraSmall, zIndex: 1 };
const $leftAccessoryStyle: CSSProperties = { marginRight: spacing.extraSmall, zIndex: 1 };
const $baseDisabledViewStyle: CSSProperties = { cursor: 'not-allowed', opacity: 0.5 };
export function Button(props: ButtonProps) {
  const {
    text,
    subText,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    onClick,
    icon,
    disabled,
    full,
    iconStyle,
  } = props;

  const preset: Presets = props.preset || 'default' || 'default_';
  const [hover, setHover] = useState(false);
  const $viewStyle = Object.assign(
    {},
    $viewPresets[preset],
    $viewStyleOverride,
    hover && !disabled ? $hoverViewPresets[preset] : {},
    disabled ? $baseDisabledViewStyle : {},
    full ? { flex: 1 } : {}
  );
  const $textStyle = Object.assign({}, $textPresets[preset], $textStyleOverride);

  const $subTextStyle = Object.assign({}, $textPresets[preset], {
    color: colors.white_muted,
    marginTop: 5,
    fontWeight: 'normal'
  } as CSSProperties);
  if (preset === 'bar') {
    return (
      <div
        style={$viewStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={disabled ? undefined : onClick}
      >
        <Row>
          {LeftAccessory && <div style={$leftAccessoryStyle}>{LeftAccessory}</div>}
          {icon && <Icon icon={icon} color={'white'} style={{ marginRight: spacing.tiny, ...iconStyle }} />}
          <Column justifyCenter gap="zero">
            {text && <Text text={text} style={$textStyle} />}
            {subText && <Text text={subText} style={$subTextStyle} />}
          </Column>

          {children}
        </Row>

        {RightAccessory && <div style={$rightAccessoryStyle}>{RightAccessory}</div>}
      </div>
    );
  }

  return (
    <div
      style={$viewStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {LeftAccessory && <div style={$leftAccessoryStyle}>{LeftAccessory}</div>}
      {icon && <Icon icon={icon} style={{ marginRight: spacing.tiny, backgroundColor: $textStyle.color, ...iconStyle }} />}
      {text && <Text style={$textStyle} text={text} preset="regular-bold" />}
      {children}
      {RightAccessory && <div style={$rightAccessoryStyle}>{RightAccessory}</div>}
    </div>
  );
}
