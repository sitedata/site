import type { BoxProps } from '@chakra-ui/react';
import type { IGetStartedEntry } from 'site/types';

type TGetStartedCombined = IGetStartedEntry & BoxProps;
export interface IGetStarted extends TGetStartedCombined {}