import { useCallback } from 'react';
import { Alert, AlertDescription, AlertIcon, CloseButton, Flex, useToast } from '@chakra-ui/core';

import type { IUseAlert } from './types';

export function useAlert() {
  const toast = useToast();
  const showToast = (opts: IUseAlert) => {
    const {
      status = 'info',
      message = '',
      position = 'bottom-right',
      onClose: customOnClose,
      duration = 5000,
    } = opts;
    return toast({
      description: message,
      status,
      duration,
      isClosable: true,
      onCloseComplete: customOnClose,
      position,
      render: ({ id, onClose }) => (
        <Alert
          my={2}
          mb={4}
          pr={8}
          right={24}
          id={`${id}`}
          width="auto"
          fontSize="sm"
          boxShadow="lg"
          variant="solid"
          status={status}
          textAlign="left"
          borderRadius="md"
          alignItems="start">
          <AlertIcon />
          <Flex flex="1">
            <AlertDescription display="block">{message}</AlertDescription>
          </Flex>
          <CloseButton size="sm" onClick={onClose} position="absolute" right={1} top={1} />
        </Alert>
      ),
    });
  };
  return useCallback(showToast, []);
}