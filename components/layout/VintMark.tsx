import Image from 'next/image';

/**
 * The VINT logo mark.
 *
 * The supplied artwork already includes its own cream circle, so this renders
 * the image directly rather than drawing a badge around it.
 *
 * NOTE: the source file is only 48x48. It is sharp at the navbar's size on a
 * standard display but softens on high-DPI screens. Drop a larger export in at
 * public/images/brand/vint-logo.png (256px or more, same square shape) and
 * everything using this component sharpens up with no code change.
 */
export default function VintMark({ size = 42 }: { size?: number }) {
  return (
    <Image
      src="/images/brand/vint-logo.png"
      alt=""
      width={size}
      height={size}
      className="size-full object-cover"
      priority
    />
  );
}
