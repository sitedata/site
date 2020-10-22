import type { InputProps } from '@chakra-ui/core';
import type { State } from '@hookstate/core';
import type { Control } from 'react-hook-form';
import type { IVendorPage, IFormModelTrial, IFormDataTrial } from 'site/types';

export type ILayoutVendor = IVendorPage['pageData'];

export type TVendorForm = State<IFormModelTrial>;

export type IVendorContext = Omit<ILayoutVendor, 'trialForm'> & {
  vendorForm: TVendorForm;
};

export interface ITextField extends InputProps {
  name: string;
  required?: boolean;
}

export interface ITextInput extends Omit<ITextField, 'as' | 'onFocus' | 'name'> {
  ctl: Control;
  id: string;
}

export type TFormSubmitter = (v: string, d: IFormDataTrial) => Promise<TFormResponse>;

export type TFormRef = {
  submit(): void;
};

export interface IForm {}

export type TFormResponse = {
  success: boolean;
  message: string;
};

export type { IFormDataTrial, IFormModelTrial } from 'site/types';
export type { IFormHandlers } from 'site/components';
