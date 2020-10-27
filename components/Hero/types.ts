import type { BoxProps } from '@chakra-ui/core';
import type { ReactNode } from 'react';
import type { Document } from '@contentful/rich-text-types';

export interface IHero extends BoxProps {
  title: string;
  subtitle?: string;
  body: Document | null;
}
