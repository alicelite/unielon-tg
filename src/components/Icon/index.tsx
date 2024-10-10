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
import { HiCheckCircle } from "react-icons/hi2";
import { FiEdit3 } from "react-icons/fi";
import { SlKey } from "react-icons/sl";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { BiMerge } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { TbTransferVertical } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
export const svgRegistry = {
  doge: dogeIcon,
  success: successIcon
};

const iconImgList: Array<IconTypes> = ['success', 'doge'];

export type IconTypes = keyof typeof svgRegistry | 'send' | 'receive' | 'history' | 'copy' | 'eye' | 'eye-slash' | 'checked' | 'edit' | 'key' | 'delete' | 'close' | 'wallet' | 'grid' | 'settings' | 'merge' | 'discord' | 'twitter' | 'transfer' | 'search' | 'check' | 'user' | 'down'; 

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
  "eye-slash": PiEyeSlashLight,
  checked: HiCheckCircle,
  edit: FiEdit3,
  key: SlKey,
  delete: RiDeleteBin5Line,
  wallet: FaWallet,
  grid: IoGrid,
  settings: IoMdSettings,
  merge: BiMerge,
  discord: FaDiscord,
  twitter: FaTwitter,
  transfer: TbTransferVertical,
  search: IoMdSearch,
  check: FaCheck,
  user: FaUser,
  down: FaAngleDown
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