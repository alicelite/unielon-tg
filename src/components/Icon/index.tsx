import React, { CSSProperties } from 'react';
import { ColorTypes, colors } from '../../ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';
import dogeIcon from "@/assets/images/wallet-logo.png";
import successIcon from "@/assets/images/success.svg";
import { BiTransfer } from "react-icons/bi";
import { FaQrcode } from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";
import { IoIosCopy } from "react-icons/io";
import { PiEyeSlashLight } from "react-icons/pi";
import { AiOutlineEye } from "react-icons/ai";

export const svgRegistry = {
  doge: dogeIcon,
  success: successIcon,
  delete: '/images/icons/delete.svg'
};

const iconImgList: Array<IconTypes> = ['success', 'delete', 'doge'];

export type IconTypes = keyof typeof svgRegistry | 'send' | 'receive' | 'history' | 'copy' | 'eye' | 'eye-slash';

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

const iconComponents: { [key in IconTypes]?: React.ComponentType<{ color?: string }> } = {
  send: BiTransfer,
  receive: FaQrcode,
  history: AiOutlineHistory,
  copy: IoIosCopy,
  eye: AiOutlineEye,
  "eye-slash": PiEyeSlashLight
};

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
            fontSize: size || fontSizes.icon,
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

  const IconComponent = iconComponents[icon as IconTypes];
  if (IconComponent) {
    return (
      <div onClick={onClick}>
        <IconComponent color={color ? colors[color] : 'white'} />
      </div>
    )
  }

  const iconPath = svgRegistry[icon as keyof typeof svgRegistry];
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