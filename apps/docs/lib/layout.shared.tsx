import { type LinkItemType } from 'fumadocs-ui/layouts/docs';
import { AlbumIcon, Heart, LayoutTemplate } from 'lucide-react';
import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { FumadocsIcon } from '@/app/layout.client';
import Logo from '@/public/logo.png';

export const linkItems: LinkItemType[] = [
  {
    icon: <AlbumIcon />,
    text: 'Blog',
    url: '/blog',
    active: 'nested-url',
  },

];

export const logo = (
  <>
    <Image
      alt="Fumadocs"
      src={Logo}
      sizes="100px"
      className="hidden w-22 in-[.uwu]:block"
      aria-label="Fumadocs"
    />

    <FumadocsIcon className="size-5 in-[.uwu]:hidden" />
  </>
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {logo}
          <span className="font-medium in-[.uwu]:hidden in-[header]:text-[15px]">
            Fumadocs
          </span>
        </>
      ),
    },
  };
}
