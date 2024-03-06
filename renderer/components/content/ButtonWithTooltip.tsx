import { ActionIcon, Tooltip } from "@mantine/core";
import type { ActionIconProps } from "@mantine/core";

type ButtonWithTooltipProps = {
  actionIconProps?: ActionIconProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
  label: string;
};

/**
 *
 * Renders a button with a tooltip.
 *
 * @component
 *
 * @returns {JSX.Element}
 *
 */
const ButtonWithTooltip = ({
  actionIconProps,
  children,
  label,
}: ButtonWithTooltipProps): JSX.Element => {
  return (
    <Tooltip label={label} maw={300} multiline withArrow>
      <ActionIcon {...actionIconProps}>{children}</ActionIcon>
    </Tooltip>
  );
};

export default ButtonWithTooltip;
