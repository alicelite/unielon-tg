import React, { CSSProperties } from 'react';

import { ColorTypes, colors } from '../../ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';
import eyeSlashIcon from "@/assets/images/eye-slash.svg"
import eyeIcon from "@/assets/images/eye.svg"
import copyIcon from "@/assets/images/copy-solid.svg"
import qrcodeIcon from "@/assets/images/qrcode.svg" 
import sendIcon from "@/assets/images/send.svg" 
import historyIcon from "@/assets/images/history.svg" 
import dogeIcon from "@/assets/images/wallet-logo.png"
import successIcon from "@/assets/images/success.svg"

export const svgRegistry = {
  history: historyIcon,
  merge: './images/icons/bx-merge.svg',
  pending: './images/icons/transfer-pending.svg',
  refresh: './images/icons/refresh.svg',
  search: './images/icons/search.svg',
  send: sendIcon,
  swap: './images/icons/swap-fill.svg',
  receive: qrcodeIcon,
  trade: './images/icons/trade1.svg',
  add: './images/icons/addition.svg',
  'right-arrow': './images/icons/arrow-up-right.svg',
  right: './images/icons/arrow-right.svg',
  left: './images/icons/arrow-left.svg',
  down: './images/icons/down.svg',

  discord: './images/icons/discord.svg',
  twitter: './images/icons/twitter.svg',
  // github: './images/icons/github.svg',

  doge: dogeIcon,
  qrcode: './images/icons/qrcode.svg',

  user: '/images/icons/user-solid.svg',
  wallet: '/images/icons/wallet-solid.svg',
  settings: './images/icons/gear-solid.svg',
  grid: './images/icons/grid-solid.svg',

  delete: '/images/icons/delete.svg',
  success: successIcon, 
  check: '/images/icons/check.svg',
  eye: eyeIcon,
  'eye-slash': eyeSlashIcon,
  copy: copyIcon,
  transfer: './images/icons/transfer.svg',
  close: './images/icons/xmark.svg',

  'circle-check': '/images/icons/circle-check.svg',
  pencil: '/images/icons/pencil.svg',
  'circle-info': '/images/icons/circle-info.svg',
  'circle-question': '/images/icons/circle-question.svg'
};

const iconImgList: Array<IconTypes> = ['success', 'delete', 'doge'];

export type IconTypes = keyof typeof svgRegistry;
interface IconProps {
  /**
   * The name of the icon
   */
  icon?: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: ColorTypes;

  /**
   * An optional size for the icon..
   */
  size?: number | string;

  /**
   * Style overrides for the icon image
   */
  style?: CSSProperties;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: CSSProperties;

  /**
   * An optional function to be called when the icon is clicked
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    onClick,
    children
  } = props;
  if (!icon) {
    return (
      <div
        onClick={onClick}
        style={Object.assign(
          {},
          {
            color: color ? colors[color] : '#FFF',
            fontSizes: size || fontSizes.icon,
            display: 'flex'
          } as CSSProperties,
          $containerStyleOverride,
          $imageStyleOverride || {},
          onClick ? { cursor: 'pointer' } : {}
        )}
      >
        {children}
      </div>
    );
  }
  const iconPath = svgRegistry[icon as IconTypes];
  console.log('iconPath----', iconPath)
  if (iconImgList.includes(icon)) {
    return (
      <img
        src={iconPath}
        alt=""
        style={Object.assign({}, $containerStyleOverride, {
          width: size || fontSizes.icon,
          height: size || fontSizes.icon
        })}
      />
    );
  }
  if (iconPath) {
    return (
      <div style={$containerStyleOverride}>
        <div
          onClick={onClick}
          style={Object.assign(
            {},
            {
              color: color ? colors[color] : '#FFF',
              width: size || fontSizes.icon,
              height: size || fontSizes.icon,
              backgroundColor: color ? colors[color] : '#FFF',
              maskImage: `url(${iconPath})`,
              maskSize: 'cover',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${iconPath})`,
              WebkitMaskSize: 'cover',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center'
            },
            $imageStyleOverride || {},
            onClick ? { cursor: 'pointer' } : {}
          )}
        />
      </div>
    );
  } else {
    return <div />;
  }
}
